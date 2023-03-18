import { PortOption } from './port-option';



export class SoftwareSupportedFlowControl extends PortOption {
	constructor() {
		super();
	}

	render() {
		let onOff = document.createElement('on-off');
		onOff.setAttribute('label', 'Software Flow Control');
		onOff.setAttribute('on', true);
		onOff.style.width = '100%';
		this.appendChild(onOff);
	}
}

window.customElements.define('software-supported-flow-control', SoftwareSupportedFlowControl);