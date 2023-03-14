class RollPageContainer extends HTMLElement{
	constructor() {
		super();
		this.currentPageIndex = 0;
		this.allow = this.getAttribute('allow');

		window.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
		window.addEventListener('keydown', this.handleKey.bind(this)); //  ,{ passive: false }
	}

	numberOfPages() {
		return this.getElementsByTagName('roll-page').length;
	}

	goTo(name) {
		let pages = Array.from(document.getElementsByTagName('roll-page'));
		let page = pages.find(page => name === page.getAttribute('name'));
		let index = pages.indexOf(page);
		this.currentPageIndex = index;
		this.switchPage();
	}

	switchPage() {
		if (this.allow == 'down') {
			if (this.currentPageIndex < 0 || this.currentPageIndex > this.numberOfPages()) {
				this.currentPageIndex = 0;
			}
		}
		if (this.allow == 'up-down') {
			if (this.currentPageIndex >= this.numberOfPages()) {
				this.currentPageIndex = 0;
			}
			if (this.currentPageIndex < 0) {
				this.currentPageIndex = this.numberOfPages() + this.currentPageIndex;
			}
		}
		try {
			this.getElementsByTagName('roll-page')[this.currentPageIndex].scrollIntoView({
				behavior: 'smooth',
				block: 'center',
				inline: 'center',
			});
		} catch(error) {
			console.error(error);
		}
	}

	handleWheel(event) {
		event.preventDefault();
		if (event.deltaY > 0) {
			this.currentPageIndex += 1;
		} else {
			this.currentPageIndex -= 1;
		}

		this.switchPage(this.currentPageIndex);
	}

	handleKey(event) {
		if (event.keyCode == 33) {
			this.currentPageIndex -= 1
		}
		if (event.keyCode == 34) {
			this.currentPageIndex += 1;
		}
		if (event.keyCode == 35) {
			this.currentPageIndex += 1;
		}
		if (event.keyCode == 36) {
			this.currentPageIndex -= 1;
		}

		this.switchPage(this.currentPageIndex);

	}

	handleTouch() {
		// if (touchendY < touchstartY) {
		// 	pageNumber -= 1;
		
		// }

		// if (touchendY < touchstartY) {
		// 	pageNumber += 1;
		// }

		// if (pageNumber < 0) {
		// 	pageNumber = 0;
		// }

		// switchPage(pageNumber);
	}
}


class RollPage extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.style.display = 'block';
		this.style.width = '100vw';
		this.style.height = '100vh';
	}
}


window.customElements.define('roll-container', RollPageContainer);
window.customElements.define('roll-page', RollPage);
