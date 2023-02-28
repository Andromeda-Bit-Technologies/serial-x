export class XIcon extends SVGElement {
	constructor() {
		super();
		this.src = `../assets/${this.getAttribute('src')}`
	}
}