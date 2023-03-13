// object orientated version
class State {
	constructor(initialState, init) {
		this.state = initialState;
		if (typeof init === 'function') {
			init();
		}
	}

	get() {
		return this.state;
	}

	set(newState, before, after) {
		if (typeof before === 'function') {
			before(newState);
		}

		this.state = newState;

		if (typeof after === 'function') {
			after(newState);
		}
	}
}

// functional version
function state(initial) {
	let state = initial;

	function _set(new_state) {
		if (typeof new_state === 'function') {
			state = new_state(state);
		} else {
			state = new_state;
		}
	}

	function _get() {
		if (typeof state === 'function') {
			return state();
		} else {
			return state;
		}
	}

	return [_get, _set];
}

/*
function exampleFunctional() {
	let [x, setX] = state(10);
	console.log(x());
	setX(20);
	console.log(x());

	let [y, setY] = state(() => Math.random() * 100);
	console.log(y());
	setY(() => () => 123.456);
	console.log(y());
}

function exampleObjectOrientated() {
	let x = new State(10);
	console.log(x.get());
	x.set(20);
	console.log(x.get());	
}

function main() {
	exampleFunctional();
	console.log();
	exampleObjectOrientated();
}

main();
*/
