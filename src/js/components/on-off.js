export class OnOff extends HTMLElement {
	constructor() {
		super();
		this.checkbox = undefined;
	}

	connectedCallback() {
		this.style.textAlign = 'center';
		this.style.minWidth = '64px';
		this.style.minHeight = '32px';
		this.render();
	}

	off() {
		this.checkbox.checked = false;
		this.setAttribute('on', 'false');
	}

	on() {
		this.checkbox.checked = true;
		this.setAttribute('on', 'true');
	}

	changeState(onOff) {
		return (event) => {
			if (event.target.getAttribute('on') === 'false') {
				onOff.on();
			} else {
				onOff.off();
			}
		}
	}

	addClickHandler() {
		this.addEventListener('click', this.changeState(this));
	}
	
	removeClickHandler() {
		this.removeEventListener('click');
	}

	render() {
		this.textContent = this.getAttribute('label');
		this.checkbox = document.createElement('input');
		this.checkbox.setAttribute('type', 'checkbox');
		this.checkbox.style.display = 'none';
		this.checkbox.style.width = '0px';
		if (this.getAttribute('disable-click') === 'true') {
			this.removeClickHandler();
		} else {
			this.addClickHandler();
		}
		this.appendChild(this.checkbox);
	}
}

window.customElements.define('on-off', OnOff);