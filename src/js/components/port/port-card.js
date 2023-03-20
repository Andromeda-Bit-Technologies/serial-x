import { App } from '../../app';



export class PortCard extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.addEventListener('click', (event) => {
			App.audio.play('interface-click');
			App.portView.goTo(`${port.name}`);
		});
		this.render();
	}

	render() {
		let header = document.createElement('div');
		let body = document.createElement('div');
		// let footer = document.createElement('div');
		let title = document.createElement('h3');
		let type = document.createElement('p');
		let vid = document.createElement('p');
		let pid = document.createElement('p');
		let serialNumber = document.createElement('p');
		let manufacturer = document.createElement('p');
		
		title.textContent = this.getAttribute('port');
		type.textContent = this.getAttribute('type');
		vid.textContent = this.getAttribute('vid');
		pid.textContent = this.getAttribute('pid');
		serialNumber.textContent = this.getAttribute('serial-number');
		manufacturer.textContent = this.getAttribute('manufacturer');

		header.appendChild(title);
		body.appendChild(type);
		body.appendChild(vid);
		body.appendChild(pid);
		body.appendChild(serialNumber);
		body.appendChild(manufacturer);

		this.appendChild(header);
		this.appendChild(body);
	}
}

window.customElements.define('port-card', PortCard);