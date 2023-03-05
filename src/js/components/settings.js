export class SettingsPanel extends HTMLElement {
	constructor() {
		super();
	}
}

export class SettingCategory extends HTMLElement {
	constructor() {
		super();
	}
}

export class SettingItem extends HTMLElement {
	constructor() {
		super();
	}
}


window.customElements.define('settings-panel', SettingsPanel);
window.customElements.define('settings-category', SettingCategory);
window.customElements.define('settings-item', SettingItem);
