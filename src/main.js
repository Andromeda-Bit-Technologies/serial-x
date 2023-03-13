import { App } from './js/app';
const { invoke } = window.__TAURI__.tauri;


(function init() {
	window.addEventListener('DOMContentLoaded', function() {
		App.init();

		window.app = App;
	});
})();
