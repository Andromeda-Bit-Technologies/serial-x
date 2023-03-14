export class PortView extends HTMLElement {
	constructor() {
		super();
	}

	get portInfo() {
		return JSON.parse(this.getAttribute('port-info'));
	}

	connectedCallback() {
		// this.setAttribute('port-view', true);
		this.render();
	}

	static get observedAttributes() {
		return ['port'];
	}

	attributeChangedCallback() {
		let port = this.getAttribute('port');
		Array.from(this.children).map((child) => child.setAttribute('port', port));
		this.render();
	}
	
	render() {
		let portOptions = document.createElement('port-options');
		portOptions.setAttribute('port', this.portInfo.name);
		let baudSelect = document.createElement('baud-rate');
		let dataBits = document.createElement('data-bits');
		this.appendChild(baudSelect);
		this.appendChild(dataBits);
	}
}

window.customElements.define('port-view', PortView);