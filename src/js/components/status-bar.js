import { fromEvent } from 'rxjs';




export class StatusBar extends HTMLElement {
	constructor() {
		super();
		this.data = null;
	}

	connectedCallback() {
		let ports = fromEvent(document.getElementById('port-scanner'), 'port-scan-done');
		ports.subscribe((event) => {
			let newData = Array.from(JSON.parse(event.detail));
			if (this.data !== newData) {
				this.data = newData;
				this.clear();
				this.render();
			}
		});
	}

	portNameList() {
		return Array.from(this.data.map(item => item.name));
	}

	itemShouldBeCleared(portName) {
		let found = false;
		for (let port of this.data) {
			if (port.name === portName) {
				found = true;
			}
		}
		return found;
	}

	itemExists(port) {
		for (let item of this.childNodes) {
			if (item.getAttribute('port') === port) {
				return true;
			}
		}
		return false;
	}

	clear() {
		Array.from(this.children).filter((item) => {
			let portName = item.getAttribute('port');
			if (portName === null || Array.from(this.data).find(item => item.name === portName) === undefined) {
				return true;
			}
		}).map(item => item.remove());
	}

	render() {
		this.data.map((port) => {
			if (this.itemExists(port.name)) {
				return;
			}
			let txRx = document.createElement('status-bar-item');
			txRx.setAttribute('port', port.name);
			let txPortProperty = document.createElement('port-property');
			txPortProperty.setAttribute('port', port.name);
			txPortProperty.setAttribute('text', 'TX');
			txPortProperty.setAttribute('color', 'green');
			txPortProperty.setAttribute('id', `${port.name}-TX-indicator`);
			let rxPortProperty = document.createElement('port-property');
			rxPortProperty.setAttribute('port', port.name);
			rxPortProperty.setAttribute('text', 'RX');
			rxPortProperty.setAttribute('color', 'red');
			rxPortProperty.setAttribute('id', `${port.name}-RX-indicator`);
			txRx.appendChild(txPortProperty);
			txRx.appendChild(rxPortProperty);
			this.appendChild(txRx);
		});
	}
}

window.customElements.define('status-bar', StatusBar);






