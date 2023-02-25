class ThemeSwitch extends HTMLElement {
	/*
		Custom elements based theme switcher

		# How to

			## Define theme in your CSS:
			.theme-blue-yellow {
				--primary-color: #33cccc;
				--secondary-color: #cccc33;
				--background-color: #051414;
			}
			
			more themes here...

			## Add this custom element to your HTML

			<theme-switch themes="dark-theme light-theme" storage-key="your-key-name">
				<!-- this could be checkbox or something else -->
            	<button onclick="this.parentNode.dispatch()">Switch Theme</button>
          	</theme-switch>
	*/
	constructor() {
		super();
		this.style.display = 'inline-block';
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

	switch(by) {
		let themeName = document.querySelector(':root').className;
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

window.customElements.define('theme-switch', ThemeSwitch);
