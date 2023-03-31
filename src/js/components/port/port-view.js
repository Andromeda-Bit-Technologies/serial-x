import { App } from '../../app';



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
		let portMenu = document.createElement('port-menu');
		portMenu.setAttribute('port', this.portInfo.name);

		let sidePanel = document.createElement('side-panel');
		sidePanel.setAttribute('port', this.portInfo.name);
		let sidePanelToggle = document.createElement('x-toggle');

		sidePanelToggle.setAttribute('target', sidePanel.id());
		sidePanelToggle.setAttribute('closed', 'false');
		sidePanelToggle.textContent = 'Options';
		portMenu.appendChild(sidePanelToggle);

		let portOptions = document.createElement('port-options');
		portOptions.setAttribute('port', this.portInfo.name);

		let baudSelect = document.createElement('baud-rate');
		let dataBitsSelect = document.createElement('data-bits');
		let paritySelect = document.createElement('parity-type');
		let stopBitsSelect = document.createElement('stop-bits');
		let flowCTRL = document.createElement('flow-ctrl');
		let softwareFlow = document.createElement('software-supported-flow-control');
		let initialLineState = document.createElement('initial-line-state');

		let portDataView = document.createElement('port-data-view');

		let portGateway = document.createElement('port-gateway');
		portGateway.setAttribute('port', this.portInfo.name);
		portGateway.setAttribute('label', '');
		portGateway.setAttribute('open', 'false');
		portGateway.addEventListener('change-state', (event) => {
			if (event.detail.on === false) {
				App.port.open(this.getAttribute('port'));
			} else {
				App.port.close(this.getAttribute('port'));
			}
		});

		portOptions.appendChild(baudSelect);
		portOptions.appendChild(dataBitsSelect);
		portOptions.appendChild(paritySelect);
		portOptions.appendChild(stopBitsSelect);
		portOptions.appendChild(flowCTRL);
		portOptions.appendChild(softwareFlow);
		portOptions.appendChild(initialLineState);

		portMenu.appendChild(portGateway);

		sidePanel.appendChild(portOptions);

		this.appendChild(portMenu);
		this.appendChild(portDataView);
		this.appendChild(sidePanel);
	}
}


window.customElements.define('port-view', PortView);