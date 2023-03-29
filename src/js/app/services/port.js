


export class PortService {
	constructor(port, portOptions) {
		this.port = port;
		this.portOptions = portOptions || {};
		this.open = false;
		this.event = new CustomEvent('port-service-enabled', {detail: {
			port: port,
			options: portOptions,
		}});
		this.dispatch()
	}

	open() {}
	close() {}
	reopen() {
		this.close();
		this.open(this.portOptions);
	}
	read() {}
	write(data) {}
	updateOptions(options) {
		this.portOptions = {...this.portOptions, ...options};
		if (this.open === true) {
			this.reopen();
		}
	}
}

