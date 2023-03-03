class ThemeSwitch extends HTMLElement {
	constructor() {
		super();
		this.id = 'theme-switch';
		this.style.display = 'inline';
		this.themes = this.getAttribute('themes').split(' ');
		this.changeThemeEvent = new Event('theme-change');
		let savedThemeName = localStorage.getItem(this.getAttribute('storage-key'));
		if (savedThemeName !== undefined) {
			document.querySelector(':root').className = savedThemeName;
		} else {
			this.switch(1);
		}
		this.addEventListener('theme-change', function onThemeChange() {
			this.switch(1);
		});
	}
	
	dispatch() {
		this.dispatchEvent(this.changeThemeEvent);
	}

	currentTheme() {
		return document.querySelector(':root').className;
	}

	themeList() {
		return this.themes;
	}

	asTextContent() {
		return `${document.querySelector(':root').className.
			replace('-', ' ').replace('theme', '').replace('-', '')
		}`;
	}

	switch(by) {
		let themeName = this.currentTheme();
		let index = this.themes.indexOf(themeName) || 0;
		let length = this.themes.length;

		index += by || 1;
		if (index >= length) {
			index = 0;
		}
		if (index <  0) {
			index = 0;
		}

		document.querySelector(':root').className = this.themes[index];
		localStorage.setItem(this.getAttribute('storage-key'), this.themes[index]);
	}
}

export class ThemeSwitchController extends HTMLButtonElement {
	constructor() {
		super();
		this.onclick = function() {
			document.getElementById(this.getAttribute('target')).switch(1);
			this.textContent = document.getElementById(this.getAttribute('target'))
				.asTextContent();
		}
	}
	
	connectedCallback() {
		this.textContent = document.getElementById(this.getAttribute('target'))
			.asTextContent();;
	}
}

window.customElements.define('theme-switch', ThemeSwitch);
window.customElements.define('theme-switch-ctrl', ThemeSwitchController, {extends: 'button'});
