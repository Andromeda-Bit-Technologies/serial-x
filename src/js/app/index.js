import { appWindow } from '@tauri-apps/api/window';
const { invoke } = window.__TAURI__.tauri;


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
		play: (sound) => {
			if (App.loadState('interface-audio-enabled') === 'true') {
				if (App.audio.collection[sound].ended) {
					App.audio.collection[sound].play();
				} else {
					try {
						App.audio.collection[sound].load();
					} catch (error) {
						console.error(error);
					}
					App.audio.collection[sound].play();
				}
			}
		},
		init: function() {
			App.audio.elements.map((element) => {
				element.addEventListener('click', function () {
					if (App.loadState('interface-audio-enabled') === 'true') {
						if (App.audio.collection['interface-click'].ended) {
							App.audio.collection['interface-click'].play();
						} else {
							try {
								App.audio.collection['interface-click'].load();
							} catch (error) {
								console.error(error);
							}
							App.audio.collection['interface-click'].play();
						}
					}
				});
			});
		}
	},
	window: {
		alwaysOnTop: (state) => {
			appWindow.setAlwaysOnTop(state);
			App.settings.window.alwaysOnTop.checked = state;
			App.saveState('window-always-on-top', state);

		},
		fullscreen: (state) => {
			appWindow.setFullscreen(state);
			App.settings.window.fullscreen.checked = state;
			App.saveState('window-fullscreen', state);

		},
		init: () => {
			App.window.alwaysOnTop(App.loadState('window-always-on-top') === 'true');
			App.window.fullscreen(App.loadState('window-fullscreen') === 'true');
		},
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
			// setting audio volume
			if (App.loadState('interface-audio-enabled') === 'false') {
				App.settings.audio.enable.checked = false;
			}
			App.settings.audio.volume.value = Number(App.loadState('audio-volume')) || 0.5;
			App.audio.setVolume(App.settings.audio.volume.value);
			App.settings.audio.enable.addEventListener('change', function (event) {
				let interfaceVolume = App.loadState('audio-volume') || 0.5;
				event.target.checked ? App.audio.setVolume(interfaceVolume) : App.audio.setVolume(0);
				App.saveState('interface-audio-enabled', event.target.checked ? true : false);
			});
			App.settings.audio.volume.addEventListener('change', function (event) {
				App.audio.setVolume(Number(event.target.value));
				App.settings.audio.volume.value = event.target.value;
				App.saveState('audio-volume', event.target.value);
			});
			// window settings
			App.settings.window.alwaysOnTop.addEventListener('change', function (event) {
				if (event.target.checked) {
					App.window.alwaysOnTop(true);
				} else {
					App.window.alwaysOnTop(false);
				}
			});
			App.settings.window.fullscreen.addEventListener('change', function (event) {
				if (event.target.checked) {
					App.window.fullscreen(true);
				} else {
					App.window.fullscreen(false);
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
	container: document.getElementById('root'),
	portView: {
		init: () => {
			App.port.scanner.addEventListener('port-scan-done',
			(event) => {
				let ports = JSON.parse(event.detail);
				for (let port of ports) {
					let rollPage = document.createElement('roll-page');
					rollPage.setAttribute('port', port.name);
					
					let portView = document.createElement('port-view');
					portView.setAttribute('port-info', JSON.stringify(port));
					portView.setAttribute('port', port.name);
					
					rollPage.appendChild(portView);
					App.portView.add(rollPage);
				}
				App.portView.clearMissing(ports);
			});
		},
		goTo: (name) => App.container.goTo(name),
		add: (view) => {
			let viewForPort = view.getAttribute('port');
			if (App.portView.list().find((portView) => portView.getAttribute('port') === viewForPort)) {
				return;
			} else {
				App.container.appendChild(view);
			}
		},
		remove: (name) => {
			Array.from(document.getElementsByTagName('roll-page'))
				.find((container) => container.getAttribute('port') === name)
			.remove();
		},
		list: () => {
			return Array.from(document.getElementsByTagName('port-view'));
		},
		clearMissing: (ports) => {
			for (let portView of App.portView.list()) {
				if (!ports.find((port) => port.name === portView.getAttribute('port'))) {
					App.portView.remove(portView.getAttribute('port'));
				}
			}
		}
	},
	port: {
		scanner: document.getElementById('port-scanner'),
		scannerIntervalLabel: document.getElementById('port-scanner-interval-label'),
		scannerIntervalSlider: document.getElementById('port-scanner-interval-slider'),
		getScanInterval: () => App.port.scanner.getAttribute('scan-interval'),
		setScanInterval: (interval) => App.port.scanner.setAttribute('scan-interval', interval),
		open: (name) => {
			let portSettings = App.port.getPortSettings(name);
			invoke('open_port', {name, portSettings}).then(() => console.log('PoRT OpeN'));
		},
		close: (name) => {
			console.log(`CLOSING PORT: ${name}`);
		},
		getPortSettings: (port) => {
			let portOptions = document.querySelector(`port-options[port=${port}]`);
			return {
				baudRate: document.querySelector(`port-options[port=${port}] baud-rate select`).value,
				dataBits: document.querySelector(`port-options[port=${port}] data-bits select`).value,
				parity: document.querySelector(`port-options[port=${port}] parity-type select`).value,
				stopBits: document.querySelector(`port-options[port=${port}] stop-bits select`).value,
				flowCTRL: document.querySelector(`port-options[port=${port}] flow-ctrl`).value,
				softwareFlowCTRL: document.querySelector(`port-options[port=${port}] software-supported-flow-control`).value,
				initialLineState: document.querySelector(`port-options[port=${port}] initial-line-state`).value,
			};
		},
		init: () => {
			App.port.setScanInterval(App.loadState('port-scan-interval'));
			App.port.scannerIntervalSlider.value = App.loadState('port-scan-interval');
		}
	},
	log: (level, message) => {
		invoke('log', { level, message }).then(() => console.log('SAVED TO APP LOG'));
	},
	init: function () {
		App.window.init();
		App.audio.init();
		App.settings.init();
		App.portView.init();
	}
}
