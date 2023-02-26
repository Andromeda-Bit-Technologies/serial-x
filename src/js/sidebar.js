// <x-sidebar open="true"></x-sidebar>
class XSidebar extends HTMLElement {
	constructor() {
		super();
		this.setAttribute('id', 'x-sidebar');
	}

	toggle() {
		if (this.getAttribute('open') === 'true') {
			this.setAttribute('open', 'false');
			return false;
		} else {
			this.setAttribute('open', 'true');
			return true;
		}
	}
}

class XSidebarToggle extends HTMLElement {
	constructor() {
		super();
		this.style.display = 'block';
		this.onclick = function() {
			let sidebar = document.getElementById('x-sidebar');
			if (sidebar.toggle() === false) {
				this.classList.add('active');
			} else {
				this.classList.remove('active');
			}
		}
	}
}

window.customElements.define('x-sidebar', XSidebar);
window.customElements.define('x-sidebar-toggle', XSidebarToggle);
