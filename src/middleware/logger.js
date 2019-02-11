const logger = (store) => (next) => (action) => {
	console.group(action.type);
		console.log('The action: ', action);
		/*
			We are invoking the next function passing it the the action.
			next is going ot be dispatch
			it's as if we are dispatching the action here, which will change the state
		*/
		const result = next(action);
		console.log('The new state: ', store.getState());
	console.groupEnd();
	return result;
}

export default logger