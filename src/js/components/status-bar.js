export class StatusBar extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		for (let child of this.children) {
			child.setAttribute('port', this.getAttribute('port'));
		}
	}
}

window.customElements.define('status-bar', StatusBar);