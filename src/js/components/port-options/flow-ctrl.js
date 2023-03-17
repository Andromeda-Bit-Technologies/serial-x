import { PortOption } from './port-option';



export class FlowCTRL extends PortOption {
	constructor() {
		super();
		this.CTSCheckbox = undefined;
		this.DTRCheckbox = undefined;
		this.XONCheckbox = undefined;
	}

	_createCheckbox(option) {
		let checkbox = document.createElement('input');
		checkbox.setAttribute('type', 'checkbox');
		checkbox.setAttribute('id', `${this.ownerPort}-${option}`);
		checkbox.setAttribute('port', this.ownerPort);
		return checkbox;
	}

	_onCTSChange() {
		return (event) => {
			if (event.target.checked === true) {
				this.XONCheckbox.checked = false;
			}
		}
	}
	
	_onDTRChange() {
		return (event) => {
			if (event.target.checked === true) {
				this.XONCheckbox.checked = false;
			}
		}
	}
	
	_onXONChange() {
		return (event) => {
			if (event.target.checked === true) {
				this.CTSCheckbox.checked = false;
				this.DTRCheckbox.checked = false;
			}
		}
	}

	render() {
		let label = document.createElement('label');
		label.textContent = 'Flow';


		let fieldset = document.createElement('fieldset');
		fieldset.setAttribute('class', 'is-row');

		let CTSLabel = document.createElement('label');
		CTSLabel.textContent = 'CTS';
		let DTRLabel = document.createElement('label');
		DTRLabel.textContent = 'DTR';
		let XONLabel = document.createElement('label');
		XONLabel.textContent = 'XON';

		this.CTSCheckbox = this._createCheckbox('CTS');
		this.DTRCheckbox = this._createCheckbox('DTR');
		this.XONCheckbox = this._createCheckbox('XON');
		
		this.appendChild(label);
		fieldset.appendChild(CTSLabel);
		fieldset.appendChild(this.CTSCheckbox);
		fieldset.appendChild(DTRLabel);
		fieldset.appendChild(this.DTRCheckbox);
		fieldset.appendChild(XONLabel);
		fieldset.appendChild(this.XONCheckbox);
		this.appendChild(fieldset);

		
		this.CTSCheckbox.onchange =  this._onCTSChange();
		this.DTRCheckbox.onchange =  this._onDTRChange();
		this.XONCheckbox.onchange = this._onXONChange();
		
	}
}

window.customElements.define('flow-ctrl', FlowCTRL);