const { invoke } = window.__TAURI__.tauri;


export function scanner() {
	let intervalID;

	return function() {
		clearInterval(intervalID);
		intervalID = setInterval(() => {
			invoke('scan_ports').then((data) => {
				let event = new CustomEvent('port-scan-done', { bubbles: true, detail: data });
				this.dispatchEvent(event);
			});
		}, Number(this.getAttribute('scan-interval')) || 3000);
	}
}

export class PortScanner extends HTMLElement {
	constructor() {
		super();
		this.style.display = 'none';
		this.id = 'port-scanner';
		this.intervalID = undefined;
		this.startScan.bind(this);
	}

	startScan() {
		this.intervalID = setInterval(() => {
			invoke('scan_ports').then((data) => {
				let event = new CustomEvent('port-scan-done', { bubbles: true, detail: data });
				this.dispatchEvent(event);
			});
		}, Number(this.getAttribute('scan-interval')) || 3000);
	}

	connectedCallback() {
		this.startScan();
	}

	static get observedAttributes() {
		return ['scan-interval',]
	}

	attributeChangedCallback(name, oldValue, newValue) {
		console.log(this.intervalID);
		console.log(clearInterval(this.intervalID));
		this.startScan();
	}
}

window.customElements.define('port-scanner', PortScanner);
