export class PortGateway extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		let onOff = document.createElement('on-off');
		onOff.setAttribute('label', this.getAttribute('label'));
		onOff.setAttribute('on', this.getAttribute('open'));
	}
}

window.customElements.define('port-gateway', PortGateway);