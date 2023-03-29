import { App } from '../../app';



export class PortOption extends HTMLElement {
	// base class for port option elements
	constructor() {
		super();
	}

	get ownerPort() {
		// port options are children of PortOptions which has port name bind to attr 'port'
		return this.parentNode.getAttribute('port');
	}

	playInterfaceSound() {
		App.audio.play('interface-click');
	}
	
	connectedCallback() {
		this.setAttribute('port', this.ownerPort);
		this.setAttribute('class', 'port-option audio-interface-click');
		for (let child of Array.from(this.children)) {
			child.setAttribute('port', this.ownerPort);
		}
		this.onclick = this.playInterfaceSound;
		this.setup();
		this.render();
	}
	
	setup() {}
	
}