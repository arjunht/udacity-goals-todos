import React from 'react'
import { connect } from 'react-redux'
import ConnectedTodos from './Todos'
import ConnectedGoals from './Goals'
import { handleInitialData } from '../actions/shared'


class App extends React.Component {
	
	componentDidMount() {
	
		/*
			With Connect, whenever we connect a component, we also pass dispatch as a prop:
			
			const { store } = this.props;
			
			store.dispatch(handleInitialData());
		
		*/
		
		const { dispatch } = this.props;
		
		dispatch(handleInitialData());
		
		
		/*
			Every component instance has a forceUpdate mehtod on it
			Its rarely used because typically it's an anti-pattern
			When invoked, its going to cause a re-render of that specific component
		*/
		
		/*
			With connect, this will be covered
			
			store.subscribe(() => this.forceUpdate());
		*/
	}
	
	render() {
		/*
		Not needed since we are using connect
		
		const { store } = this.props
		const { loading } = store.getState();
		*/
		
		/*
		
		This works for the inital case, but what happens if yu delete all the goals,
		then you will be left with a loading screen
		
			if(todos === undefined || todos.length === 0 ||
				goals === undefined || goals.length === 0) {
			
		*/
		
		if(this.props.loading === true) {
			return <h3>Loading</h3>
		}
		
		return (
			<div>
				<ConnectedTodos />
				<ConnectedGoals />
			</div>
		);
	}
}

/*
	ConnectedApp is rendering the Component and passing any data that the component needs from the store
	
class ConnectedApp extends React.Component {
	render() {
		return (
			<Context.Consumer>
				{(store) => (
					<App store={store} />
				)}
			</Context.Consumer>
		);
	}
}
	
	Why connect is needed: 
		we have class Provider but nothing like that for Context.Consumer
	
	When we invoke connect, its going to return us anew functionw which we can then invoke with the second set of parenthesis
	
	Pass a function into the first set of parenthesis and this function is going to return us an object.
	Store will be passed into the function and any properties that we return on this object will be passed as props to our App component
	
	Looking at our app component, the only prop that we need from store is loading
*/

/*
	Connect actually doesn't pass the store, its the state of the store
	
	const ConnectedApp = connect((store) => ({
*/

export default connect((state) => ({
	loading: state.loading
}))(App);