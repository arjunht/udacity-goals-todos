import { ADD_TODO } from '../actions/todos'
import { ADD_GOAL } from '../actions/goals'

const checker = (store) => (next) => (action) => {
	if(action.type === ADD_TODO &&
		action.todo.name.toLowerCase().includes('bitcoin')) {
		return alert("Bad Todo");
	}
	
	if(action.type === ADD_GOAL &&
		action.goal.name.toLowerCase().includes('bitcoin')) {
		return alert("Bad Goal");
	}
	
	return next(action);
}

/* Below ES6
function checker(store) {
	// next is going to next middleware in line if we have more than one middleware or its going to be dispatch
	return function (next) {
		return function (action) {
			// We have access to store, next and action
			if(action.type === ADD_TODO &&
				action.todo.name.toLowerCase().includes('bitcoin')) {
				return alert("Bad Todo");
			}
			
			if(action.type === ADD_GOAL &&
				action.goal.name.toLowerCase().includes('bitcoin')) {
				return alert("Bad Goal");
			}
			
			return next(action)
		}
	}
}
*/

export default checker