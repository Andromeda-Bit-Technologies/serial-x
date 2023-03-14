export class PortView extends HTMLElement {
	constructor() {
		super();
		this.portData = JSON.parse(this.getAttribute('port-info'));
	}

	connectedCallback() {
		this.portData = JSON.parse(this.getAttribute('port-info'));
		this.render();
	}
	
	render() {
		let baudSelect = document.createElement('baud-rate');
		let dataBits = document.createElement('data-bits');
		this.appendChild(baudSelect);
		this.appendChild(dataBits);
	}
}

window.customElements.define('port-view', PortView);