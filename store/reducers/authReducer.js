import {SIGNIN, SIGNUP, AUTHENTICATION, LOGOUT} from '../actions/auth'

const initialState = {
	token: null,
	userId: null
}

export default (state = initialState, action) => {
	// console.log("authreducer", action)
	switch(action.type){
		case SIGNIN: 
			return {
				token: action.token,
				userId: action.userId
			}
		case SIGNUP: 
			return {
				token: action.token,
				userId: action.userId
			}
		case AUTHENTICATION: 
			return {
				token: action.token,
				userId: action.userId
			}
		case LOGOUT: 
			return initialState
		default: 
		return state;
	}
}