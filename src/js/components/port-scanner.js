const { invoke } = window.__TAURI__.tauri;



export class PortScanner extends HTMLElement {
	constructor() {
		super();
		this.style.display = 'none';
		this.id = 'port-scanner';
	}

	connectedCallback() {
		setInterval(() => {
			invoke('scan_ports').then((data) => {
				let event = new CustomEvent('port-scan-done', {bubbles: true, detail: data});
				this.dispatchEvent(event);
			});
		}, Number(this.getAttribute('scan-interval')) || 3000);
	}
}

window.customElements.define('port-scanner', PortScanner);
