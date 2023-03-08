import { appWindow } from '@tauri-apps/api/window';



function initSoundEffects() {
	// buttons sounds
	let buttonsWithSound = document.getElementsByClassName('sound-interface-click');
	let interfaceClick = document.getElementById('sound-interface-click');
	let interfaceVolume = Number(localStorage.getItem('interface-volume'));
	interfaceClick.volume = interfaceVolume;

	Array.from(buttonsWithSound).map(element => {
		element.addEventListener('click', function () {
			let interfaceVolumeEnabled = localStorage.getItem('interface-volume-enabled');
			if (interfaceVolumeEnabled === 'true') {
				if (interfaceClick.ended) {
					interfaceClick.play();
				} else {
					interfaceClick.load();
					interfaceClick.play();
				}
			}
		});
	});
}

function loadSettings() {
	// set the checkbox to saved value
	if (localStorage.getItem('interface-volume-enabled') === 'false') {
		document.getElementById('enable-sound').checked = false;
	}

	// set the interface volume slider to saved value
	document.getElementById('sound-volume').value = Number(localStorage.getItem('interface-volume'));

	// setting sound volume
	document.getElementById('enable-sound').addEventListener('change', function (event) {
		event.target.checked ? interfaceClick.volume = interfaceVolume : interfaceClick.volume = 0;
		localStorage.setItem('interface-volume-enabled', event.target.checked ? true : false);
	});
	// setting sound volume
	document.getElementById('sound-volume').addEventListener('change', function (event) {
		interfaceClick.volume = Number(event.target.value);
		interfaceVolume = interfaceClick.volume;
		localStorage.setItem('interface-volume', interfaceClick.volume)
	});
}

function initWindowsSettings() {
	// window settings
	document.getElementById('window-always-on-top').addEventListener('change', function (event) {
		if (event.target.checked) {
			appWindow.setAlwaysOnTop(true);
		} else {
			appWindow.setAlwaysOnTop(false);
		}
	});
	document.getElementById('window-fullscreen').addEventListener('change', function (event) {
		if (event.target.checked) {
			appWindow.setFullscreen(true);
		} else {
			appWindow.setFullscreen(false);
		}
	});
}

export function init() {
	initSoundEffects();
	loadSettings();
	initWindowsSettings();
};
