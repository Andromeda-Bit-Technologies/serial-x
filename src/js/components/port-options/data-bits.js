import { PortOption } from './port-option';

export class DataBits extends PortOption {
	constructor() {
		super();
	}
	
	get dataBitsOptions() {
		return [5, 6, 7, 8];
	}

	render() {
		let label = document.createElement('label');
		label.textContent = 'Data Bits';
		label.setAttribute('for', `${this.ownerPort}-data-bits`);
		let selectDataBits = document.createElement('select');
		selectDataBits.setAttribute('name', `${this.ownerPort}-data-bits`);
		for (let dataBit of this.dataBitsOptions) {
			let option = document.createElement('option');
			option.textContent = dataBit;
			if (dataBit === 8) {
				option.setAttribute('selected', true);
			}
			selectDataBits.appendChild(option);
		}

		this.appendChild(label);
		this.appendChild(selectDataBits);
	}
}

window.customElements.define('data-bits', DataBits);