export class StatusBarItem extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.id = `${this.getAttribute('port')}-status`;
		if (this.getElementsByClassName('status-bar-item-identifier').length === 0) {
			let ownerLabel = document.createElement('p');
			ownerLabel.textContent = `${this.getAttribute('port')} `;
			ownerLabel.setAttribute('class', 'status-bar-item-identifier')
			this.prepend(ownerLabel);
		}
	}
}

window.customElements.define('status-bar-item', StatusBarItem);