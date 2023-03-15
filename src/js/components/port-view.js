export class PortView extends HTMLElement {
	constructor() {
		super();
	}

	get portInfo() {
		return JSON.parse(this.getAttribute('port-info'));
	}

	connectedCallback() {
		this.render();
	}
	
	render() {
		let portOptions = document.createElement('port-options');
		portOptions.setAttribute('port', this.portInfo.name);

		let baudSelect = document.createElement('baud-rate');
		let dataBits = document.createElement('data-bits');
		let parity = document.createElement('parity-type');

		portOptions.appendChild(baudSelect);
		portOptions.appendChild(dataBits);
		portOptions.appendChild(parity);
		this.appendChild(portOptions);
	}
}

window.customElements.define('port-view', PortView);