#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]


mod serialport;


fn main() {
    log4rs::init_file("log4rs.yaml", Default::default()).unwrap();
    log::info!("Starting application");

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![serialport::list_ports])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
