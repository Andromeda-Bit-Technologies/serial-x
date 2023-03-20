export class SidePanel extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.setAttribute('id', this.id());
	}

	id() {
		return `${this.getAttribute('port')}-side-panel`;
	}
}


window.customElements.define('side-panel', SidePanel);