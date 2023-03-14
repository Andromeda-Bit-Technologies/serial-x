
export class PortOptions extends HTMLElement {
	constructor() {
		super();
	}

	get ownerPort() {
		return this.getAttribute('port');
	}

	connectedCallback() {
		for (let child of Array.from(this.children)) {
			child.setAttribute('port', this.ownerPort);
		}
	}
}

window.customElements.define('port-options', PortOptions);