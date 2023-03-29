#[tauri::command]
pub fn log(level: &str, message: String) {
	match level {
		"trace" => log::trace!(target: "app", "{}", message),
		"info" => log::info!(target: "app","{}", message),
		"debug" => log::debug!(target: "app", "{}", message),
		"error" => log::error!(target: "app", "{}", message),
		_ => log::trace!(target: "app", "{}", message),
	}
}