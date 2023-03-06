const { invoke } = window.__TAURI__.tauri;



export class PortTable extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		if (this.hasAttribute('scan-interval')) {
			setInterval(() => {
				invoke('scan_ports').then((data) => {
					this.innerHTML = '';
					this.buildTable(data);
				});
			}, Number(this.getAttribute('scan-interval')) || 1000);
		} else {
			let scanButton = document.createElement('button');
			scanButton.textContent = 'Scan Ports';
			scanButton.className = 'btn';
			scanButton.onclick = () => {
				this.innerHTML = '';
				invoke('scan_ports').then((data) => this.buildTable(data));
			}
			this.appendChild(scanButton);
		}
	}

	buildTable(data) {
		let ports = JSON.parse(data);

		if (ports.length !== 0) {
			let table = document.createElement('table');
			let tableHeader = document.createElement('thead');

			let th0 = document.createElement('th');
			th0.textContent = 'Name';
			tableHeader.appendChild(th0);
			let th1 = document.createElement('th');
			th1.textContent = 'Type';
			tableHeader.appendChild(th1);
			let th2 = document.createElement('th');
			th2.textContent = 'VID';
			tableHeader.appendChild(th2);
			let th3 = document.createElement('th');
			th3.textContent = 'PID';
			tableHeader.appendChild(th3);
			let th4 = document.createElement('th');
			th4.textContent = 'Serial Number';
			tableHeader.appendChild(th4);
			let th5 = document.createElement('th');
			th5.textContent = 'Product';
			tableHeader.appendChild(th5);

			table.appendChild(tableHeader);

			let tableBody = document.createElement('tbody');
			for (let port of ports) {
				let tableRow = document.createElement('tr');
				tableRow.setAttribute('class', 'port-table-item');
				tableRow.setAttribute('wormhole-to', port.name);

				let name = document.createElement('td');
				name.textContent = port.name;
				let type = document.createElement('td');
				type.textContent = port.type_of;
				let vid = document.createElement('td');
				vid.textContent = port.vid;
				let pid = document.createElement('td');
				pid.textContent = port.pid;
				let serialNumber = document.createElement('td');
				serialNumber.textContent = port.serial_number;
				let product = document.createElement('td');
				product.textContent = port.product;

				tableRow.appendChild(name);
				tableRow.appendChild(type);
				tableRow.appendChild(vid);
				tableRow.appendChild(pid);
				tableRow.appendChild(serialNumber);
				tableRow.appendChild(product);

				tableBody.appendChild(tableRow);
			}

			table.appendChild(tableBody);
			this.appendChild(table);
		} else {
			this.innerHTML = '<h1>No Devices connected</h1>';
		}
	}
}


// export class PortScanner extends HTMLElement {
// 	constructor() {
// 		super();
// 	}

// 	connectedCallback() {
// 		setInterval(() => {
// 			invoke('scan_ports').then((data) => this.ports = data);
// 		}, Number(this.getAttribute('scan-interval')) || 1000);
// 	}
// }


window.customElements.define('port-table', PortTable);