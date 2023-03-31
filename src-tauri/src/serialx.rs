use std::collections::HashMap;
use std::sync::Mutex;
use serde::{Deserialize, Serialize};
use serialport;
use serde_json;
use tauri::State;


#[derive(Debug, Clone, Deserialize, Serialize)]
pub enum PortType {
	USB,
	PCI,
	Bluetooth,
	Unknown,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct PortInfo {
	pub name: String,
	pub type_of: PortType,
	pub vid: Option<u16>,
	pub pid: Option<u16>,
	pub serial_number: Option<String>,
	pub manufacturer: Option<String>,
	pub product: Option<String>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub enum SoftwareFlowControl {
	ON,
	OFF,
}


#[derive(Debug, Clone, Deserialize, Serialize)]
pub enum InitialLineState {
	DTR_ON,
	DTR_OFF,
	RTS_ON,
	RTS_OFF,
}


#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct PortOptions {
	pub baud_rate: u32,
	pub data_bits: serialport::DataBits,
	pub parity: serialport::Parity,
	pub stop_bits: serialport::StopBits,
	pub flow_control: serialport::FlowControl,
	pub software_flow_control: SoftwareFlowControl,
	pub initial_line_state: InitialLineState,
}


#[tauri::command]
pub fn scan_ports() -> std::string::String {
	let ports = serialport::available_ports();
	match ports {
		Ok(ports) => {
			let mut ports_info_list: Vec<PortInfo> = vec!();

			for port in ports {
				match port.port_type {
					serialport::SerialPortType::UsbPort(info) => {
						ports_info_list.push(PortInfo {
							name: port.port_name,
							type_of: PortType::USB,
							vid: Some(info.vid),
							pid: Some(info.pid),
							serial_number: info.serial_number,
							manufacturer: info.manufacturer,
							product: info.product,
						});
					},
					serialport::SerialPortType::PciPort => {
						ports_info_list.push(PortInfo {
							name: port.port_name,
							type_of: PortType::PCI,
							vid: None,
							pid: None,
							serial_number: None,
							manufacturer: None,
							product: None,
						});
					},
					serialport::SerialPortType::BluetoothPort => {
						ports_info_list.push(PortInfo {
							name: port.port_name,
							type_of: PortType::Bluetooth,
							vid: None,
							pid: None,
							serial_number: None,
							manufacturer: None,
							product: None,
						});
					},
					serialport::SerialPortType::Unknown => {
						ports_info_list.push(PortInfo {
							name: port.port_name,
							type_of: PortType::Unknown,
							vid: None,
							pid: None,
							serial_number: None,
							manufacturer: None,
							product: None,
						});
					},
				};
			}

			match serde_json::to_string(&ports_info_list) {
				Ok(result) => result,
				Err(error) => {
					log::error!("{:?}", error);

					String::from("SERDE_JSON ERROR")
				},
			}

		},
		Err(error) => {
			log::error!("{:?}", error);
			String::from("PORT ERROR")
		},
	}
}

#[derive(Default)]
pub struct PortMap(Mutex<HashMap<String, Box<dyn serialport::SerialPort>>>);



#[tauri::command]
pub fn open_port(name: String, port_options: PortOptions, port_map: State<PortMap>) {
    match serialport::new(&name, port_options.baud_rate).open() {
        Ok(port) => {
			port.set_data_bits(port_options.data_bits);
			port.set_flow_control(port_options.flow_control);
			port.set_parity(port_options.parity);
			port.set_stop_bits(port_options.stop_bits);
            port_map.0.lock().unwrap().insert(name, port);
        }
        Err(error) => {
            log::error!("{} - {}", name, error);
        }
    };
}

#[tauri::command]
pub fn close_port(name: String, port_map: State<PortMap>) {
   unimplemented!();
}