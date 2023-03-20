import { App } from '../../app';


export class PortGateway extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	static get observedAttributes() {
		return ['on'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (this.getAttribute('on') === 'true') {
			this.open();
		} else {
			this.close();
		}
	}

	open() {
		// open port
	}
	
	close() {
		// close port
	}

	onClick() {
		App.audio.play('interface-click');
		if (this.getAttribute('on') === 'true') {
			this.setAttribute('on', 'false');
		} else {
			this.setAttribute('on', 'true');
		}
	}

	render() {
		let onOff = document.createElement('on-off');
		onOff.setAttribute('label', `${this.getAttribute('label')} ${this.getAttribute('port')}`);
		onOff.setAttribute('on', this.getAttribute('open'));

		this.addEventListener('click', this.onClick);

		this.appendChild(onOff);
	}
}

window.customElements.define('port-gateway', PortGateway);