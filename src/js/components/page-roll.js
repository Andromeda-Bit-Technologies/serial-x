class RollPageContainer extends HTMLElement{
	constructor() {
		super();
		this.setAttribute('class', 'roll-page-container');
		this.currentPageIndex = 0;
		this.allow = this.getAttribute('allow');
		this.behavior = this.getAttribute('behavior') || 'smooth';
		this.block = this.getAttribute('block') || 'center';
		this.inline = this.getAttribute('inline') || 'center';

		window.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
		window.addEventListener('keydown', this.handleKey.bind(this)); //  ,{ passive: false }
	}

	numberOfPages() {
		return this.getElementsByTagName('roll-page').length;
	}

	goToPage() {
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
				behavior: this.behavior,
				block: this.block,
				inline: this.inline,
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

		this.goToPage(this.currentPageIndex);
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

		this.goToPage(this.currentPageIndex);

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

		// goToPage(pageNumber);
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


(function init() {
// 	// const RollPageContainer = new RollPageContainer();
// 	window.addEventListener('wheel', RollPageContainer.handleWheel.bind(RollPageContainer), { passive: false });
// 	window.addEventListener('keydown', RollPageContainer.handleKey.bind(RollPageContainer)); //  ,{ passive: false }
// 	// window.addEventListener('touchend', handlers.touchHandler); // , { passive: false }
	window.customElements.define('roll-container', RollPageContainer);
	window.customElements.define('roll-page', RollPage);
})();

