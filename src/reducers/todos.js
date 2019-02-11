import {
	ADD_TODO,
	REMOVE_TODO,
	TOGGLE_TODO
} from '../actions/todos'

export default function todos (state = [], action) {
	switch (action.type) {
		case ADD_TODO :
			return state.concat([action.todo]);
		case REMOVE_TODO :
			return state.filter((todo) => todo.id !== action.id);
		case TOGGLE_TODO :
			/* 
				If the todos reducer function needs to be a pure function, we cannot directly modify the complete property of the todo object in the state
				Wrong: return state.map((todo) => todo.id === action.id ? todo.complete = !todo.complete : todo)
			*/
			return state.map((todo) => todo.id !== action.id ? todo :
				Object.assign({}, todo, { complete : !todo.complete }))
			/*
				Object.assign allows us to create a new object and merge different properties onto that object 
				So we create a new object {}, then merge all of the properties of the todo object, except for complete which is going to be exact opposite of what complete currently is
			*/
		case RECEIVE_DATA :
			// Single action type affecting multiple parts of your store
			return action.todos;
		default :
			return state;
	}	
}