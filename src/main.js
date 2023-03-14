import { App } from './js/app';



const DEBUG = true;


window.addEventListener('DOMContentLoaded', function() {
	App.init();
	if (DEBUG === true) {
		window.app = App;
	}
});

