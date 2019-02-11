import {
	RECEIVE_DATA
} from '../actions/shared'

// Reducer in charge of the loading state of our app
export default function loading (state = true, action) {
	switch(action.type) {
		case RECEIVE_DATA :
			return false;
		default :
			return state;
		
	}
}