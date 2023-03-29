import { PortOption } from './port-option';



export class SoftwareSupportedFlowControl extends PortOption {
	constructor() {
		super();
	}

	get value() {
		return document.querySelector(`software-supported-flow-control[port=${this.ownerPort}] on-off`).getAttribute('on');
	}

	render() {
		let onOff = document.createElement('on-off');
		onOff.setAttribute('label', 'Software Flow Control');
		onOff.setAttribute('on', true);
		onOff.setAttribute('option', 'software-flow-ctrl');
		onOff.style.width = '100%';
		this.appendChild(onOff);
	}
}

window.customElements.define('software-supported-flow-control', SoftwareSupportedFlowControl);