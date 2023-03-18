import { PortOption } from './port-option';



export class ParityType extends PortOption {
	constructor() {
		super();
	}

	get parityOptions() {
		return ['odd', 'even', 'none'];
	}

	render() {
		let label = document.createElement('label');
		label.setAttribute('for', `${this.ownerPort}-parity-select`);
		label.textContent = 'Parity';

		let selectParity = document.createElement('select');
		selectParity.setAttribute('id', `${this.ownerPort}-parity-select`);
		selectParity.setAttribute('name', `${this.ownerPort}-parity-select`);

		for (let parity of this.parityOptions) {
			let option = document.createElement('option');
			option.textContent = parity;
			if (parity === 'none') {
				option.setAttribute('selected', true);
			}
			selectParity.appendChild(option);
		}

		this.appendChild(label);
		this.appendChild(selectParity);
	}
}

window.customElements.define('parity-type', ParityType);