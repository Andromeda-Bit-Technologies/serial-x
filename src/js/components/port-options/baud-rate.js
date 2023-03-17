import { PortOption } from './port-option';



export class BaudRate extends PortOption {
	constructor() {
		super();
	}

	get baudRates() {
		return [
			300, 600, 1200, 1800, 2400, 3600, 4800, 7200, 9600, 14400, 19200, 28800, 38400, 57600, 115200, 230400,
		];
	}

	handleChange(port) {
		return (event) => {
			if (event.target.port === port) {
				this.value = event.target.value;
			} else {
				let baudRateInput = document.getElementById(`${port}-baud-rate-input`);
				baudRateInput.value = event.target.value;
				this.value = event.target.value;
			}
		}
	}

	handleLabelClick(port) {
		return (event) => {
			let baudRateSelect = document.getElementById(`${port}-baud-rate-select`);
			let baudRateInput = document.getElementById(`${port}-baud-rate-input`);
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
	}

	render() {
		let label = document.createElement('label');
		label.setAttribute('for', `${this.ownerPort}-baud-rate-select`);
		label.textContent = 'Baud Rate';
		label.addEventListener('click', this.handleLabelClick(this.ownerPort));

		let select = document.createElement('select');
		select.setAttribute('class', 'audio-interface-click');
		select.setAttribute('name', `${this.ownerPort}-baud-rate-select`);
		select.setAttribute('port', this.ownerPort);
		select.setAttribute('id', `${this.ownerPort}-baud-rate-select`);
		select.addEventListener('change', this.handleChange(this.ownerPort));
		for (let rate of this.baudRates) {
			let option = document.createElement('option')
			option.textContent = rate;
			if (rate === 9600) {
				option.setAttribute('selected', true);
			}
			select.appendChild(option);
		}

		let customBaudRateInput = document.createElement('input');
		customBaudRateInput.setAttribute('type', 'number');
		customBaudRateInput.setAttribute('name', `${this.ownerPort}-baud-rate-input`);
		customBaudRateInput.setAttribute('id', `${this.ownerPort}-baud-rate-input`);
		customBaudRateInput.setAttribute('port', this.ownerPort);
		customBaudRateInput.classList.add('is-hidden');
		
		this.append(label);
		this.append(select);
		this.appendChild(customBaudRateInput);
	}
}

window.customElements.define('baud-rate', BaudRate);