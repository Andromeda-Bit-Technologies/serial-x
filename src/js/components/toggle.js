import { App } from '../app';


class XToggle extends HTMLElement {
	constructor() {
		super();
		
	}

	connectedCallback() {
		this.style.display = 'block';
		this.onclick = function () {
			App.audio.play('interface-click');
			this.toggle();
		}
	}

	toggle() {
		let target = document.getElementById(this.getAttribute('target'));
		if (target.getAttribute('closed') === 'true') {
			target.setAttribute('closed', false);
			this.setAttribute('closed', true);
		} else {
			target.setAttribute('closed', true);
			this.setAttribute('closed', false);
		}
	}
}


window.customElements.define('x-toggle', XToggle);
