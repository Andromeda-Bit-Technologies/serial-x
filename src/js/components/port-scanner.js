const { invoke } = window.__TAURI__.tauri;



export class PortScanner extends HTMLElement {
	constructor() {
		super();
		this.style.display = 'none';
		this.id = 'port-scanner';
	}

	startScan() {
		return setInterval(() => {
			invoke('scan_ports').then((data) => {
				let event = new CustomEvent('port-scan-done', { bubbles: true, detail: data });
				this.dispatchEvent(event);
			});
		}, Number(this.getAttribute('scan-interval')) || 3000);
	}

	static get observedAttributes() {
		return ['scan-interval',]
	}

	attributeChangedCallback(name, oldValue, newValue) {
		clearInterval(this.intervalID-1);
		clearInterval(this.intervalID);
		this.intervalID = this.startScan();
	}
}

window.customElements.define('port-scanner', PortScanner);
