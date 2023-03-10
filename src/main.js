// import { initSoundEffects, initWindowsSettings, loadSettings, initPortScanInterval } from './js/app/init';
import { App } from './js/app/init';
const { invoke } = window.__TAURI__.tauri;

// let greetInputEl;
// let greetMsgEl;

// async function greet() {
//   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
//   greetMsgEl.textContent = await invoke("greet", { name: greetInputEl.value });
// }

// window.addEventListener("DOMContentLoaded", () => {
//   greetInputEl = document.querySelector("#greet-input");
//   greetMsgEl = document.querySelector("#greet-msg");
//   document
//     .querySelector("#greet-button")
//     .addEventListener("click", () => greet());
// });
// function listPorts() {
// 	console.log(invoke('list_ports'));
// }

(function init() {
	// let container = document.getElementById('roll-container');
	// let rollPage = document.createElement('roll-page');
	// rollPage.innerHTML = '<h1>This is dynamic content</h1>';
	// container.appendChild(rollPage);
	// let portList = await invoke('list_ports');
	// console.log(portList);
	window.addEventListener('DOMContentLoaded', function() {
		App.init();
	});
})();
