export const SIGNUP = 'SIGNUP'
export const SIGNIN = 'SIGNIN'

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
		dispatch({
			type: SIGNUP,
			token: responseData.idToken,
			userId: responseData.localId,
			email: email
		})
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
		dispatch({
			type: SIGNIN,
			token: responseData.idToken,
			userId: responseData.localId,
			email: email
		})
	}
}