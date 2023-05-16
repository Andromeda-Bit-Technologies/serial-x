#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]


mod serialx;
mod util;


fn main() {
    log4rs::init_file("config/log4rs.yaml", Default::default()).unwrap();
    log::info!("Starting application");
    tauri::Builder::default()
        .manage(serialx::PortMap::default())
        .invoke_handler(tauri::generate_handler![
            serialx::scan_ports,
            serialx::open_port,
            serialx::close_port,
            util::log
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
