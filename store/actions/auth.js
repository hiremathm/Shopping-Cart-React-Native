import { AsyncStorage } from 'react-native'

export const SIGNUP = 'SIGNUP'
export const SIGNIN = 'SIGNIN'
export const AUTHENTICATION = 'AUTHENTICATION'
export const LOGOUT = 'LOGOUT'
let timer;
export const authenticate = (token , userId, expiryTime) => {
	console.log("TIMER IN AUTHENTICATION", expiryTime)
	return dispatch => {
		dispatch(setLogoutTimer(expiryTime))
		dispatch({
			type: AUTHENTICATION,
			token: token,
			userId: userId
		})
	} 
}

export const logout = (token, userId) => {
	clearLogoutTimer()
	AsyncStorage.removeItem('userData')
	return {type: LOGOUT}
}

const setLogoutTimer = (expiryTime) => {
	console.log("TIMER IN SET LOGOUT", expiryTime)
	return dispatch => {
		timer = setTimeout(() => {
			dispatch(logout())
		}, expiryTime)
	}
}

const clearLogoutTimer = () => {
	console.log("CLEARING TIME", timer)
	if (timer){
		clearTimeout(timer)
	}
}

export const signup = (email, password) => {
	return async dispatch => {
		const response = await fetch(
	      	'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAYKf9Bsifod7s9S8GFbarUwQJ0t8XzZs4',
	      	{
	        	method: 'POST',
	        	headers: {
	          	'Content-Type': 'application/json'
	        	},
		        body: JSON.stringify({
		          	email: email,
		          	password: password,
		          	returnSecureToken: true
		        })
      		}
    	);

		if(!response.ok){
			const errorResponse = await response.json()
			const errorId = errorResponse.error.message
			 if(errorId === 'EMAIL_EXISTS'){
				throw new Error('The email address is already in use by another account.')
			 }else if(errorId === 'OPERATION_NOT_ALLOWED'){
			 	throw new Error('Password sign-in is disabled for this project')
			 }else if(errorId === 'TOO_MANY_ATTEMPTS_TRY_LATER'){
			 	throw new Error('We have blocked all requests from this device due to unusual activity. Try again later.')
			 }
		}

		const responseData = await response.json()
		// console.log("SIGNUP RESPONSE",responseData)
		// dispatch({
		// 	type: SIGNUP,
		// 	token: responseData.idToken,
		// 	userId: responseData.localId,
		// 	email: email
		// })

		dispatch(authenticate(responseData.idToken, responseData.localId, parseInt(responseData.expiresIn * 10)))

		const expiryDate = new Date(new Date.getTime() + parseInt(responseData.expiresIn) * 10);
		saveData(responseData.idToken, responseData.localId, expiryDate)
	}
}

export const signin = (email, password) => {
	return async dispatch => {
		const response = await fetch(
	      	'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAYKf9Bsifod7s9S8GFbarUwQJ0t8XzZs4',
	      	{
	        	method: 'POST',
	        	headers: {
	          	'Content-Type': 'application/json'
	        	},
		        body: JSON.stringify({
		          	email: email,
		          	password: password,
		          	returnSecureToken: true
		        })
      		}
    	);

		if(!response.ok){
			const errorResponse = await response.json()
			const errorId = errorResponse.error.message
			 if(errorId === 'EMAIL_NOT_FOUND'){
				throw new Error('Invalid Email / Password!')
			 }else if(errorId === 'INVALID_PASSWORD'){
			 	throw new Error('Invalid Email / Password')
			 }else if(errorId === 'USER_DISABLED'){
			 	throw new Error('Your account is Inactive')
			 }
		}

		const responseData = await response.json()

		// console.log("SIGNIN RESPONSE",responseData)
		// dispatch({
		// 	type: SIGNIN,
		// 	token: responseData.idToken,
		// 	userId: responseData.localId,
		// 	email: email
		// })

		dispatch(authenticate(responseData.idToken, responseData.localId, parseInt(responseData.expiresIn) * 10))

		const expiryDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 10);
		saveData(responseData.idToken, responseData.localId, expiryDate)
	}
}

const saveData = (token, userId, expiryDate) => {
	AsyncStorage.setItem('userData', JSON.stringify({token: token, userId: userId, expiryDate: expiryDate}))
}