export class PortOption extends HTMLElement {
	constructor() {
		super();
	}

	get ownerPort() {
		return this.getAttribute('port');
	}

	connectedCallback() {
		this.setAttribute('class', 'port-option');
		this.render();
	}
	
}