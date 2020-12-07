import React,{useState, useEffect, useReducer, useCallback} from 'react'
import {Text, View, Button, StyleSheet, ScrollView, KeyboardAvoidingView, ActivityIndicator, Alert} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient';
import {useDispatch} from 'react-redux'


import Input from '../../components/UI/Input'
import Colors from '../../constants/Colors'
import * as AuthActions from '../../store/actions/auth'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
	if(action.type === FORM_INPUT_UPDATE){
		const updatedValues = {
			...state.inputValues,
			[action.input]: action.value
		}

		const updatedValidities = {
			...state.inputValidities,
			[action.input]: action.isValid
		}

		let formValidity = true;
		for(const key in updatedValidities){
			formValidity = formValidity && updatedValidities[key];			
		}


		let formValue = {
			formIsValid: formValidity,
			inputValues: updatedValues,
			inputValidities: updatedValidities
		}
		return formValue
	}
	return state
}


const AuthScreen  = props => {
	const [isSignup, setIsSignup] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [errorText, setError] = useState()

	const dispatch = useDispatch()

	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			email: '',
			password: ''
		},
		inputValidities: {
			email: false,
			password: false
		},
		formIsValid: false
	})

	useEffect(() => {
		if(errorText){
			Alert.alert('Opps! Something went wrong!', errorText, [{text: 'Okay'}])
		}
	},[errorText])

	const inputChangeHandler = useCallback((inputField, inputValue, inputValidity) => {
		const loginObject = {
			type: FORM_INPUT_UPDATE, 
			value: inputValue, 
			isValid: inputValidity, 
			input: inputField
		}
		dispatchFormState(loginObject)
	},[dispatchFormState])

	const authHandler = async () => {
		let action;
		// console.log("IN AUTH SCREEN EMAIL PASSWORD",formState.inputValues.email, formState.inputValues.password)
		if(isSignup){
			action = AuthActions.signup(formState.inputValues.email, formState.inputValues.password)
		}else{
			action = AuthActions.signin(formState.inputValues.email, formState.inputValues.password)
		}
		setError(null)
		setIsLoading(true)
		try{
			await dispatch(action)
			props.navigation.navigate('Shop')
		}catch(error){
			setError(error.message)
			setIsLoading(false)
		}
	}

	return (
		<KeyboardAvoidingView 
			behavior = "padding"
			// keyboardVerticalOffset = {50}
			style = {styles.screen}
		>

			<LinearGradient colors={['transparent','rgba(0,0,0,0.8)']} style = {styles.gradient}>
				<View style = {{...styles.card, ...styles.authContainer}}>
					<ScrollView>
						<Input 
							id = "email"
							label = "E-Mail"
							keyboardType = "email-address"
							required
							email
							autoCapitalize = "none"
							errorText = "Please enter a valid email address."
							onInputChange = {inputChangeHandler}
							initialValue = ""
						/>

						<Input 
							id = "password"
							label = "Password"
							keyboardType = "default"
							required
							secureTextEntry
							minLength = {5}
							autoCapitalize = "none"
							errorText = "Please enter a valid password."
							onInputChange = {inputChangeHandler}
							initialValue = ""
						/>

						<View style = {styles.buttonContainer}>
							{
								isLoading ? (<ActivityIndicator size = "small" color={Colors.primary}/>) : 
							    (<Button title = {isSignup ? 'SignUp' : 'SignIn'} color = {Colors.accent} onPress={authHandler}/>)
							}
						</View>
						<View style = {styles.buttonContainer}><Button title = {`Switch to ${isSignup ? 'SignIn' : 'SignUp'}`} color = {Colors.primary} onPress={() => {setIsSignup(prevState => !prevState)}}/></View>
					</ScrollView>
				</View>
			</LinearGradient>
		</KeyboardAvoidingView>
	)
}

AuthScreen.navigationOptions = {
	headerTitle: 'Authenticate'
}

const styles = StyleSheet.create({
	screen: {
		flex: 1, 
		justifyContent: 'center',
		alignItems: 'center'
	},
	authContainer: {
		width: '80%',
		maxWidth: 400,
		maxHeight: 400,
		padding: 20
	},
	card: {
		elevation: 5,
		shadowColor: "black",
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 8,
		borderRadius: 10,
		backgroundColor: 'white',
		width: '80%'
	},
	gradient: {
		width: "100%",
		height: "100%",
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonContainer:{
		marginTop: 10
	}
})

export default AuthScreen;