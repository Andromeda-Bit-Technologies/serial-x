import { PortOption } from './port-option';

export class BaudRate extends PortOption {
	constructor() {
		super();
	}

	get baudRates() {
		return [
			300, 600, 1200, 1800, 2400, 3600, 4800, 7200, 9600, 14400, 19200, 28800, 38400, 57600, 115200, 230400
		];
	}

	handleChange(event) {
		if (event.target.id === 'baud-rate-input') {
			this.value = event.target.value;
		} else {
			let baudRateInput = document.getElementById('baud-rate-input');
			baudRateInput.value = event.target.value;
			this.value = event.target.value;
		}
	}

	handleLabelClick() {
		let baudRateSelect = document.getElementById('baud-rate-select');
		let baudRateInput = document.getElementById('baud-rate-input');
		if (baudRateSelect.classList.contains('is-hidden')) {
			baudRateSelect.classList.remove('is-hidden');

			this.value = baudRateSelect.value;
			
			baudRateInput.classList.add('is-hidden');
		} else {
			baudRateSelect.classList.add('is-hidden');

			baudRateInput.classList.remove('is-hidden');
			this.value = baudRateInput.value;
		}
	}

	render() {
		let label = document.createElement('label');
		label.setAttribute('for', 'baud-rate');
		label.setAttribute('class', 'audio-interface-click');
		label.setAttribute('id', 'baud-rate-label');
		label.textContent = 'Baud Rate';
		label.addEventListener('click', this.handleLabelClick);

		let select = document.createElement('select');
		select.setAttribute('id', 'baud-rate-select');
		select.setAttribute('name', 'baud-rate');
		select.addEventListener('change', this.handleChange);

		for (let rate of this.baudRates) {
			let option = document.createElement('option')
			option.textContent = rate;
			select.appendChild(option);
		}
		let customBaudRateInput = document.createElement('input');
		customBaudRateInput.setAttribute('type', 'number');
		customBaudRateInput.setAttribute('id', 'baud-rate-input');
		customBaudRateInput.setAttribute('name', 'baud-rate');
		customBaudRateInput.classList.add('is-hidden');
		
		this.append(label);
		this.append(select);
		this.appendChild(customBaudRateInput);
	}
}

window.customElements.define('baud-rate', BaudRate);