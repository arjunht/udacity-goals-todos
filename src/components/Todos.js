import React from 'react'
import { connect } from 'react-redux'
import List from './List'
import {
	handleSaveTodo,
	handleDeleteTodo,
	handleSaveTodoToggle
} from '../actions/todos'


/*
	This is going to be an uncontrolled component meaning instead of sticking the value of the input field below on our component state, we will add a ref and then stick this ref on this component instance:
	
	ref={(input) => this.input = input}
	
	Whenever you use a ref, the input field will be passed in as the arg.
	Assign this input field to the instance of the component (this)
	
	
	So whenever we want to grab the value of the input field, we can just grab it from the instance.
	
*/

class Todos extends React.Component {
	addItem = (e) => {
		e.preventDefault();
		
		/*
			Second Argument: Callback function - why : 
			Lets say they have the first argument defined as name in handleSaveTodo
			Then you can try and setting that to empty, do you think that would work, no.
			SO we use a callback which when executed, still has access to this.input.value
			Closure?
		*/
		
		this.props.dispatch(handleSaveTodo(
			this.input.value,
			() => this.input.value = ''
		));
		
		/*
		
		Before Thunk:
		
		return API.saveTodo(this.input.value)
			.then((todo) => {
				this.props.store.dispatch(addTodoAction(todo))
				this.input.value = ''
			})
			.catch(() => {
				alert('There was an error adding the item. Try again');
			})
		
		The only reason why we are not doing this is because the saveTodo gives us a todo item just based on the name and the id is generated for us.
		
		My soluton:
		
		const name = this.input.value;
		this.input.value = ''
		
		const todo = {
			id: generateId(),
			name,
			complete: false
		}
		
		this.props.store.dispatch(addTodoAction(todo));
		
		return API.saveTodo(todo)
			.catch(() => {
				this.props.store.dispatch(removeTodoAction(todo.id));
				alert('An error occured. Try again.');
			})
		*/
	}
	
	removeItem = (todo) => {
		/* If we weren't using optimistic updates, would have been written as:
			return API.deleteTodo(todo.id)
				.then(() => {
					this.props.store.dispatch(removeTodoAction(todo.id));
				})
		*/
		
		this.props.dispatch(handleDeleteTodo(todo));
		
		/*
		
		Separating the UI and the data fetching logic
		
		this.props.store.dispatch(removeTodoAction(todo.id));
		
		return API.deleteTodo(todo.id)
			.catch(() => {
				// if thre is an error .catch will run
				this.props.store.dispatch(addTodoAction(todo));
				alert('An error occured. Try again.');
			})
		*/
	}
	
	toggleItem = (id) => {
		this.props.dispatch(handleSaveTodoToggle(id));
	}
	
	render() {
		return (
			<div>
				<h1>Todo List</h1>
				<input
					type='text'
					placeholder='Add Todo'
					ref={(input) => this.input = input}
				/>
				<button onClick={this.addItem}>Add Todo</button>
				<List
					items={this.props.todos}
					remove={this.removeItem}
					toggle={this.toggleItem}
				/>
			</div>
		)
	}
}

/*

Using connect now

class ConnectedTodos extends React.Component {
	render() {
		return (
			<Context.Consumer>
				{(store) => {
					const { todos } = store.getState();
					return <Todos todos={todos} dispatch={store.dispatch} />
				}}
			</Context.Consumer>
		);
	}
}

*/

export default connect((state) => ({
	todos: state.todos
}))(Todos);
