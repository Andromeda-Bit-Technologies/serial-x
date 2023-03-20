


export class PortProperty extends HTMLElement {
	// attributes
	// text - text representing property
	// color - color identifier
	constructor() {
		super();
		this.intervalID = undefined;
	}

	connectedCallback() {
		this.render();
	}

	test() {
		if (this.intervalID === undefined) {
			this.intervalID = setInterval(() => {
				this.setAttribute('color', ['green', 'red'][Math.round(Math.random() * 1)]);
			}, Math.round(Math.random() * 50));
		} else {
			clearInterval(this.intervalID)
		}
	}

	render() {
		this.textContent = this.getAttribute('text');
		this.addEventListener('click', this.test);
	}
}

window.customElements.define('port-property', PortProperty);