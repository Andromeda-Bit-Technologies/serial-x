export class PortCards extends HTMLElement {
	constructor() {
		super();
		this.id = 'port-list';
	}

	connectedCallback() {
		document.getElementById('port-scanner').addEventListener('port-scan-done', this.createCards);
	}

	createCards(event) {
		let ports = JSON.parse(event.detail);
		if (ports.length !== 0) {
			for (let port of ports) {
				let portCard = document.createElement('port-card');
				portCard.setAttribute('port', port.name);
				portCard.setAttribute('type', port.type_of);
				portCard.setAttribute('pid', port.pid);
				portCard.setAttribute('vid', port.vid);
				portCard.setAttribute('serial-number', port.serial_number);
				portCard.setAttribute('manufacturer', port.manufacturer);
				portCard.setAttribute('product', port.product);

				this.appendChild(portCard);
			}
		} else {
			document.getElementById('port-list').innerHTML = '<h1>No Devices Connected</h1>';
		}
	}
}

window.customElements.define('port-cards', PortCards);