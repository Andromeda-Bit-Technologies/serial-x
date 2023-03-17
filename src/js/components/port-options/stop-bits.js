import { PortOption } from './port-option';


export class StopBits extends PortOption {
	constructor() {
		super();
	}

	get stopBitsOptions() {
		return [1, 1.5, 2];
	}

	render() {
		let label = document.createElement('label');
		label.textContent = 'Stop Bits';

		let select = document.createElement('select');
		for (let stopBit of this.stopBitsOptions) {
			let option = document.createElement('option');
			option.textContent = stopBit;

			select.appendChild(option);
		}

		this.appendChild(label);
		this.appendChild(select);
	}
}

window.customElements.define('stop-bits', StopBits);