import { PortOption } from './port-option';



export class InitialLineState extends PortOption {
	constructor() {
		super();
	}

	render() {
		let label = document.createElement('label');
		label.textContent = 'Initial Line States';

		let dtr = document.createElement('on-off');
		dtr.setAttribute('on', true);
		dtr.setAttribute('label', 'DTR');
		dtr.setAttribute('port', this.ownerPort);
		dtr.setAttribute('id', `${this.ownerPort}-initial-line-state-dtr`);
		
		let rts = document.createElement('on-off');
		rts.setAttribute('on', true);
		rts.setAttribute('label', 'RTS');
		rts.setAttribute('port', this.ownerPort);
		rts.setAttribute('id', `${this.ownerPort}-initial-line-state-rts`);

		this.appendChild(label);
		this.appendChild(dtr);
		this.appendChild(rts);
	}
}

window.customElements.define('initial-line-state', InitialLineState);