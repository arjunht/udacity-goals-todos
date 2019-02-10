import API from 'goals-todos-api'

export const RECEIVE_DATA = 'RECEIVE_DATA';

function receiveData (todos, goals) {
	return {
		type: RECEIVE_DATA,
		todos,
		goals
	}
}

export function handleInitialData () {
	return (dispatch) => {
		return Promise.all([
			API.fetchGoals(),
			API.fetchTodos()
		]).then(([goals, todos]) => {
			/*
				We need to tell our redux store about this data
				We could loop over all of our goals and all of our actions
				but then we would be dispatching a lot of actions
				so a brand new action
			*/
			dispatch(receiveData(todos, goals));
			
			//console.log('Goals:', goals);
			//console.log('Todos:', todos);
		});
		
		/* My solution:
		API.fetchGoals()
			.then((goals) => console.log('Goals:',goals));
		
		API.fetchTodos()
			.then((todos) => console.log('Todos:', todos));
		*/
	}
}