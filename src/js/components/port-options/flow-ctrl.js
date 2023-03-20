import { PortOption } from './port-option';



export class FlowCTRL extends PortOption {
	constructor() {
		super();
	}

	_createCheckbox(label, option, state) {
		let checkbox = document.createElement('on-off');
		checkbox.setAttribute('label', label);
		checkbox.setAttribute('id', `${this.ownerPort}-${option}`);
		checkbox.setAttribute('on', state);
		checkbox.setAttribute('port', this.ownerPort);
		return checkbox;
	}

	onClick(cts, dtr, xon) {
		return (event) => {
			let targetName = event.target.getAttribute('label');
			let state = event.target.getAttribute('on');

			if (targetName === 'XON') {
				if (state === 'true') {
					xon.on();
				} else {
					cts.off();
					dtr.off();
					xon.off();
				}
			}
			if (targetName === 'CTS') {
				if (state === 'true') {
					cts.on();
				} else {
					xon.off();
					cts.off();
				}
			}
			if (targetName === 'DTR') {
				if (state === 'false') {
					dtr.off();
					xon.off();
				} else {
					dtr.on();
				}
			}
			
		}
	}

	render() {
		let label = document.createElement('label');
		label.textContent = 'Flow Control';

		let CTSCheckbox = this._createCheckbox('CTS', 'cts', 'true');
		let DTRCheckbox = this._createCheckbox('DTR', 'dtr', 'true');
		let XONCheckbox = this._createCheckbox('XON', 'xon', 'false');

		CTSCheckbox.addEventListener('click', this.onClick(CTSCheckbox, DTRCheckbox, XONCheckbox));
		DTRCheckbox.addEventListener('click', this.onClick(CTSCheckbox, DTRCheckbox, XONCheckbox));
		XONCheckbox.addEventListener('click', this.onClick(CTSCheckbox, DTRCheckbox, XONCheckbox));

		this.appendChild(label);
		this.appendChild(CTSCheckbox);
		this.appendChild(DTRCheckbox);
		this.appendChild(XONCheckbox);
	}
}

window.customElements.define('flow-ctrl', FlowCTRL);