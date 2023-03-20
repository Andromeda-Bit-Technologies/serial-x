export class PortView extends HTMLElement {
	constructor() {
		super();
	}

	get portInfo() {
		return JSON.parse(this.getAttribute('port-info'));
	}

	connectedCallback() {
		this.render();
	}
	
	render() {
		let sidePanel = document.createElement('side-panel');
		sidePanel.setAttribute('port', this.portInfo.name);
		let sidePanelToggle = document.createElement('x-toggle');

		sidePanelToggle.setAttribute('target', sidePanel.id());
		sidePanelToggle.setAttribute('closed', 'false');
		sidePanelToggle.textContent = 'Options';
		this.appendChild(sidePanelToggle);

		let portOptions = document.createElement('port-options');
		portOptions.setAttribute('port', this.portInfo.name);

		let baudSelect = document.createElement('baud-rate');
		let dataBitsSelect = document.createElement('data-bits');
		let paritySelect = document.createElement('parity-type');
		let stopBitsSelect = document.createElement('stop-bits');
		let flowCTRL = document.createElement('flow-ctrl');
		let softwareFlow = document.createElement('software-supported-flow-control');
		let initialLineState = document.createElement('initial-line-state');

		let statusBar = document.createElement('status-bar');
		statusBar.setAttribute('port', this.portInfo.name);

		let txPortProperty = document.createElement('port-property');
		txPortProperty.setAttribute('text', 'TX');
		txPortProperty.setAttribute('color', 'green');
		let rxPortProperty = document.createElement('port-property');
		rxPortProperty.setAttribute('text', 'RX');
		rxPortProperty.setAttribute('color', 'red');
		let portGateway = document.createElement('port-gateway');
		portGateway.setAttribute('label', '');
		portGateway.setAttribute('open', 'false');

		portOptions.appendChild(baudSelect);
		portOptions.appendChild(dataBitsSelect);
		portOptions.appendChild(paritySelect);
		portOptions.appendChild(stopBitsSelect);
		portOptions.appendChild(flowCTRL);
		portOptions.appendChild(softwareFlow);
		portOptions.appendChild(initialLineState);

		
		statusBar.appendChild(txPortProperty);
		statusBar.appendChild(rxPortProperty);
		statusBar.appendChild(portGateway);

		sidePanel.appendChild(portOptions);
		
		this.appendChild(statusBar);
		this.appendChild(sidePanel);
	}
}


window.customElements.define('port-view', PortView);