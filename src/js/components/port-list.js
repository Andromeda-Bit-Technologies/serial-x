export class PortList extends HTMLElement {
	constructor() {
		super();
		this.id = 'port-list';
		this.style.display = 'flex';
		this.style.flexDirection = 'row';
		this.style.justifyContent = 'space-evenly';
		this.data = undefined;
		document.getElementById('port-scanner').addEventListener('port-scan-done', function(event) {
			document.getElementById('port-list').render(JSON.parse(event.detail));
		});
	}

	render(data) {
		if (data !== this.data) {
			this.data = data;
			for (let port of data) {
				console.log(port);
			}
		}
	}
}
// export class PortListItem extends HTMLElement {
// 	constructor() {
// 		super();
// 	}
// }
// export class PortName extends HTMLElement {
// 	constructor() {
// 		super();
// 	}
// }
// export class PortType extends HTMLElement {
// 	constructor() {
// 		super();
// 	}
// }
// export class PortVID extends HTMLElement {
// 	constructor() {
// 		super();
// 	}
// }
// export class PortPID extends HTMLElement {
// 	constructor() {
// 		super();
// 	}
// }
// export class PortSerialNumber extends HTMLElement {
// 	constructor() {
// 		super();
// 	}
// }
// export class PortProduct extends HTMLElement {
// 	constructor() {
// 		super();
// 	}
// }

// export class PortStatus extends HTMLElement {
// 	constructor() {
// 		super();
// 	}
// }

window.customElements.define('port-list', PortList);
// window.customElements.define('port-list-item', PortListItem);
// window.customElements.define('port-name', PortName);
// window.customElements.define('port-type', PortType);
// window.customElements.define('port-vid', PortVID);
// window.customElements.define('port-pid', PortPID);
// window.customElements.define('port-serial-number', PortSerialNumber);
// window.customElements.define('port-product', PortProduct);
// window.customElements.define('port-status', PortStatus);