import { appWindow } from '@tauri-apps/api/window';


// export class AppEventTarget extends EventTarget {
// 	constructor() {
// 		super();
// 	}
// }
export const DEFAULTS = {
	'audio-volume': 0.5,
}


export const App = {
	saveState: function(key, value) {
		localStorage.setItem(key, value);
	},
	loadState: function(key) {
		return localStorage.getItem(key);
	},
	audio: {
		collection: {
			'interface-click': document.getElementById('audio-interface-click'),
		},
		elements: Array.from(document.getElementsByClassName('audio-interface-click')),
		enable: function() {
			App.audio.collection['interface-click'].volume = Number(App.loadState('interface-volume'));
			App.saveState('interface-audio-enabled', true);
		},
		disable: function() {
			App.audio.collection['interface-click'].volume = 0;
			App.saveState('interface-audio-enabled', false);
		},
		setVolume: function(volume) {
			App.audio.collection['interface-click'].volume = volume;
			App.saveState('interface-volume', volume);
		},
		getVolume: function() {
			return App.loadState('interface-volume') || DEFAULTS['audio-volume'];
		},
		init: function() {
			App.audio.elements.map((element) => {
				element.addEventListener('click', function () {
					if (App.loadState('interface-audio-enabled') === 'true') {
						if (App.audio.collection['interface-click'].ended) {
							App.audio.collection['interface-click'].play();
						} else {
							App.audio.collection['interface-click'].load();
							App.audio.collection['interface-click'].play();
						}
					}
				});
			});
		}
	},
	settings: {
		audio: {
			enable: document.getElementById('enable-audio'),
			volume: document.getElementById('audio-volume'),
		},
		window: {
			alwaysOnTop: document.getElementById('window-always-on-top'),
			fullscreen: document.getElementById('window-fullscreen'),
		},
		init: function () {
			// set the checkbox to saved value
			if (App.loadState('interface-audio-enabled') === 'false') {
				App.settings.audio.enable.checked = false;
			}
			// set the interface volume slider to saved value
			App.settings.audio.volume.value = Number(App.loadState('audio-volume')) || DEFAULTS['audio-volume'];
			App.audio.setVolume(App.settings.audio.volume.value);

			// setting audio volume
			App.settings.audio.enable.addEventListener('change', function (event) {
				let interfaceVolume = App.loadState('audio-volume') || DEFAULTS['audio-volume'];
				event.target.checked ? App.audio.setVolume(interfaceVolume) : App.audio.setVolume(0);
				App.saveState('interface-audio-enabled', event.target.checked ? true : false);
			});
			// setting audio volume
			App.settings.audio.volume.addEventListener('change', function (event) {
				App.audio.setVolume(Number(event.target.value));
				App.settings.audio.volume.value = event.target.value;
				App.saveState('audio-volume', event.target.value);
			});
			// window settings
			App.settings.window.alwaysOnTop.addEventListener('change', function (event) {
				if (event.target.checked) {
					appWindow.setAlwaysOnTop(true);
				} else {
					appWindow.setAlwaysOnTop(false);
				}
			});
			App.settings.window.fullscreen.addEventListener('change', function (event) {
				if (event.target.checked) {
					appWindow.setFullscreen(true);
				} else {
					appWindow.setFullscreen(false);
				}
			});

			// port scanner
			App.port.scannerIntervalSlider.value = App.loadState('scanner-interval') || 1000;
			App.port.scannerIntervalLabel.textContent = `${App.port.scannerIntervalSlider.value} ms`;

			App.port.scannerIntervalSlider.addEventListener('change', function (event) {
				App.port.setScanInterval(Number(event.target.value));
				App.saveState('scanner-interval', event.target.value);
				App.port.scannerIntervalLabel.textContent = `${event.target.value} ms`;
			});
		}
	},
	container: document.getElementById('roll-container'),
	port: {
		scanner: document.getElementById('port-scanner'),
		scannerIntervalLabel: document.getElementById('port-scanner-interval-label'),
		scannerIntervalSlider: document.getElementById('port-scanner-interval-slider'),
		infoTableItems: () => Array.from(document.getElementsByClassName('port-info')),
		getScanInterval: () => App.port.scanner.getAttribute('scan-interval'),
		setScanInterval: (interval) => App.port.scanner.setAttribute('scan-interval', interval),
	},
	init: function () {
		App.audio.init();
		App.settings.init();
	}
}

// tableRow.onclick = function (event) {
// 	document.getElementById(event.target.getAttribute('ref-to-port')).scrollIntoView();
// }

// App.port.createPortPage(port.name.toLowerCase());