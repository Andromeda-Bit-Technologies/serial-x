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
		if (event.target.id === `${this.ownerPort}-baud-rate-input`) {
			this.value = event.target.value;
		} else {
			let baudRateInput = document.getElementById(`${this.ownerPort}-baud-rate-input`);
			baudRateInput.value = event.target.value;
			this.value = event.target.value;
		}
	}

	handleLabelClick() {
		// use classes, filter by port attr
		let baudRateSelect = Array.from(document.getElementsByClassName('baud-rate-select')).find((select) => {
			return select.getAttribute('port') === this.ownerPort;
		});
		let baudRateInput = Array.from(document.getElementsByClassName('baud-rate-input')).find((input) => {
			input
		});
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
		label.setAttribute('for', `${this.ownerPort}-baud-rate-select`);
		label.setAttribute('class', 'baud-rate-label audio-interface-click');
		label.textContent = 'Baud Rate';
		label.addEventListener('click', this.handleLabelClick);

		let select = document.createElement('select');
		select.setAttribute('class', 'baud-rate-select');
		select.setAttribute('name', `${this.ownerPort}-baud-rate-select`);
		select.addEventListener('change', this.handleChange);
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
		customBaudRateInput.setAttribute('class', 'baud-rate-input');
		customBaudRateInput.setAttribute('name', `${this.getAttribute('port')}-baud-rate-input`);
		customBaudRateInput.classList.add('is-hidden');
		
		this.append(label);
		this.append(select);
		this.appendChild(customBaudRateInput);
	}
}

window.customElements.define('baud-rate', BaudRate);