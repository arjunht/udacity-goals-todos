import { ADD_TODO } from '../actions/todos'
import { ADD_GOAL } from '../actions/goals'

const motivator = (store) => (next) => (action) => {
	if(action.type === ADD_TODO) {
		alert(`Don't forget to ${action.todo.name}!`);
	}

	if(action.type === ADD_GOAL) {
		alert('That\'s a great goal!');
		// alert("That's a great goal!"); - use " and then you don't have to use \
	}

	return next(action)
}

export default motivator