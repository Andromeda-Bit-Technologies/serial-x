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
	On,
	Off,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub enum LineState {
	On,
	Off,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct InitialLineState {
	dtr: LineState,
	rts: LineState,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct PortOptions {
	pub baud_rate: u32,
	pub data_bits: serialport::DataBits,
	pub parity: serialport::Parity,
	pub stop_bits: serialport::StopBits,
	pub flow_control: serialport::FlowControl,
	// pub software_flow_control: SoftwareFlowControl,
	pub initial_line_state: InitialLineState,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct DataPacket {
	port_name: String,
	data: Vec<u8>,
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
					String::from(stringify!(error))
				},
			}

		},
		Err(error) => {
			log::error!("{:?}", error);
			String::from(stringify!(error))
		},
	}
}


#[derive(Default)]
pub struct PortMap(Mutex<HashMap<String, Box<dyn serialport::SerialPort>>>);



#[tauri::command]
pub fn open_port(name: String, port_options: PortOptions, port_map: State<PortMap>) {
    match serialport::new(&name, port_options.baud_rate).open() {
        Ok(mut port) => {
			port.set_baud_rate(port_options.baud_rate).unwrap();
			port.set_data_bits(port_options.data_bits).unwrap();
			port.set_parity(port_options.parity).unwrap();
			port.set_stop_bits(port_options.stop_bits).unwrap();
			match port_options.flow_control {
				serialport::FlowControl::Hardware => {
					port.set_flow_control(serialport::FlowControl::Hardware).unwrap();
				},
				serialport::FlowControl::Software => {
					port.set_flow_control(serialport::FlowControl::Software).unwrap();
				},
				serialport::FlowControl::None => {
					port.set_flow_control(serialport::FlowControl::None).unwrap();
				},
			}
			match port_options.initial_line_state {
				InitialLineState { dtr: LineState::On, rts: LineState::On } => {
					port.write_data_terminal_ready(true).unwrap();
					port.write_request_to_send(true).unwrap();
				},
				InitialLineState { dtr: LineState::Off, rts: LineState::On } => {
					port.write_data_terminal_ready(false).unwrap();
					port.write_request_to_send(true).unwrap();
				},
				InitialLineState { dtr: LineState::Off, rts: LineState::Off } => {
					port.write_data_terminal_ready(false).unwrap();
					port.write_request_to_send(false).unwrap();
				},
				InitialLineState { dtr: LineState::On, rts: LineState::Off } => {
					port.write_data_terminal_ready(true).unwrap();
					port.write_request_to_send(false).unwrap();
				},
			}

			log::trace!("Port {} configured and opened", &name);

            port_map.0.lock().unwrap().insert(name, port);
        }

        Err(error) => {
            log::error!("{} - {}", name, error);
        }

    };
}

#[tauri::command]
pub fn close_port(name: String, port_map: State<PortMap>) {
   match port_map.0.lock().gitunwrap().remove(&name) {
	   Some(_) => log::trace!("Port {} closed", &name),
	   None => log::trace!("Port {} was already closed", &name),
   }
}

#[tauri::command]
pub fn bytes_to_read(port_name: String, port_map: State<PortMap>) -> Result<u32, serialport::Error> {
	match port_map.0.lock().unwrap().get(&port_name) {
		Some(port) => port.bytes_to_read(),
		None => {
			log::trace!("Trying to call bytes_to_read on non existing port {}", &port_name);
			Ok(0u32)
		}
	}
}

#[tauri::command]
pub fn read_port(window: tauri::Window, port_name: String, buffer_size: usize, port_map: State<PortMap>) -> Result<(), std::io::Error> {
	match port_map.0.lock().unwrap().get(&port_name) {
		Some(port) => {
			let mut buffer: Vec<u8> = [u8; buffer_size];
			log::trace!("Reading from port {}", &port_name);
			match port.read(buffer) { 
				Ok(_size) => {
					window.emit("receive-data", DataPacket { port_name: port_name.clone(), data: buffer.to_vec() });
					Ok(())
				},
				Err(error) => {
					log::error!("{}", error);
					Err(error)
				},
			}
		},
		None => {
			log::trace!("Trying to read from non-existing port {}", &port_name);
			Ok(())
		}
	}
}