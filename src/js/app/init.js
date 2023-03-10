import { appWindow } from '@tauri-apps/api/window';


export const App = {
	saveState: function(key, value) {
		localStorage.setItem(key, value);
	},
	loadState: function(key) {
		return localStorage.getItem(key);
	},
	audio: {
		'collection': {
			'interface-click': document.getElementById('audio-interface-click'),
		},
		'elements': Array.from(document.getElementsByClassName('audio-interface-click')),
		enable: function() {
			App.audio['collection']['interface-click'].volume = Number(App.loadState('interface-volume'));
			App.saveState('interface-audio-enabled', true);
		},
		disable: function() {
			App.audio['collection']['interface-click'].volume = 0;
			App.saveState('interface-audio-enabled', false);
		},
		setVolume: function(volume) {
			App.audio['collection']['interface-click'].volume = volume;
			App.saveState('interface-volume', volume);
		},
		getVolume: function() {
			return App.loadState('interface-volume');
		},
		init: function() {
			App.audio.elements.map((element) => {
				element.addEventListener('click', function () {
					if (App.loadState('interface-audio-enabled') === 'true') {
						if (App.audio['collection']['interface-click'].ended) {
							App.audio['collection']['interface-click'].play();
						} else {
							App.audio['collection']['interface-click'].load();
							App.audio['collection']['interface-click'].play();
						}
					}
				});
			});
		}
	},
	'settings': {
		'audio': {
			'enable': document.getElementById('enable-audio'),
			'volume': document.getElementById('audio-volume'),
		},
		'window': {
			'window-always-on-top': document.getElementById('window-always-on-top'),
			'window-fullscreen': document.getElementById('window-fullscreen'),
		},
		'port-scanner': {
			'port-scanner-interval': (() => document.getElementById('port-scanner').getAttribute('scan-interval'))(),
		},
		init: function () {
			// set the checkbox to saved value
			if (App.loadState('interface-audio-enabled') === 'false') {
				App['settings']['audio']['enable'].checked = false;
			}
			// set the interface volume slider to saved value
			App['settings']['audio']['volume'].value = Number(App.loadState('audio-volume')) || 0.5;
			App.audio.collection['interface-click'].volume = App['settings']['audio']['volume'].value;

			// setting audio volume
			App.settings['audio']['enable'].addEventListener('change', function (event) {
				let interfaceClick = App['audio']['collection']['interface-click'];
				let interfaceVolume = App.loadState('audio-volume');
				event.target.checked ? interfaceClick.volume = interfaceVolume : interfaceClick.volume = 0;
				App.saveState('interface-audio-enabled', event.target.checked ? true : false);
			});
			// setting audio volume
			App['settings']['audio']['volume'].addEventListener('change', function (event) {
				App['audio']['collection']['interface-click'].volume = Number(event.target.value);
				App['settings']['audio']['volume'].value = event.target.value;
				App.saveState('audio-volume', event.target.value);
			});
			// window settings
			App['settings']['window']['window-always-on-top'].addEventListener('change', function (event) {
				if (event.target.checked) {
					appWindow.setAlwaysOnTop(true);
				} else {
					appWindow.setAlwaysOnTop(false);
				}
			});
			App['settings']['window']['window-fullscreen'].addEventListener('change', function (event) {
				if (event.target.checked) {
					appWindow.setFullscreen(true);
				} else {
					appWindow.setFullscreen(false);
				}
			});

			App.port['scanner-interval-label'].textContent = `${App.port['scanner-interval-slider'].value} ms`;

			App.port['scanner-interval-slider'].addEventListener('change', function (event) {
				App.port.setScanInterval(Number(event.target.value));
				App.port['scanner-interval-label'].textContent = `${event.target.value} ms`;
			});
		}
	},
	port: {
		'scanner': document.getElementById('port-scanner'),
		'scanner-interval-label': document.getElementById('port-scanner-interval-label'),
		'scanner-interval-slider': document.getElementById('port-scanner-interval-slider'),
		getScanInterval: () => App.port['scanner'].getAttribute('scan-interval'),
		setScanInterval: (interval) => App.port['scanner'].setAttribute('scan-interval', interval),
	},
	init: function () {
		App.audio.init();
		App.settings.init();
	}
}

