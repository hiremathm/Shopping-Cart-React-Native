import React,{useState, useEffect, useCallback, useReducer} from 'react' 
import {View, Text, StyleSheet, TextInput, ScrollView, Button,Alert, ActivityIndicator} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'

import {useSelector, useDispatch} from 'react-redux'

import {addProduct, updateProduct} from '../../store/actions/productAction'
import Input from '../../components/UI/Input'

import Colors from '../../constants/Colors'

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

const EditProductScreen = (props) => {

	const [isLoading, setIsLoading] = useState(false)
	const [errorText, setErrorText] = useState()

	const dispatch = useDispatch()

	const productId = props.navigation.getParam('productId')
	
	const product = useSelector(state => state.products.userProducts.find(product => productId === product.id))

	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			title: product ? product.title : "",
			imageUrl: product ? product.imageUrl : "",
			description: product ? product.description : "",
			price: product ? product.price : "",
		},
		inputValidities: {
			title: product ? true : false,
			imageUrl: product ? true : false,
			description: product ? true : false,
			price: product ? true : false
		},
		formIsValid: product ? true : false
	})


	useEffect(() => {
		if(errorText){
			Alert.alert('Opps! Something went wrong',errorText, [{text: 'Okay'}])
		}		
	},[errorText])

	const disabled = (product ? false : true)

	// const [title, setTitle] = useState(product ? product.title : '')
	// const [imageurl, setImageurl] = useState(product ? product.imageUrl : '')
	// const [price, setPrice] = useState(product ? product.price.toString() : '')
	// const [description, setDescription] = useState(product ? product.description : '')

	const onSubmitHandler = useCallback(async () => {

		if(!formState.formIsValid){
			Alert.alert('Wrong Input!','Please check the errors in the form.',[{text: 'Okay'}])
			return;
		}

		const newProduct = {
			title: formState.inputValues.title, 
			imageUrl: formState.inputValues.imageUrl, 
			description: formState.inputValues.description, 
			price: +formState.inputValues.price
		}

		setErrorText(null)
		setIsLoading(true)

		try{
			if(product){
				await dispatch(updateProduct({
					id: productId, 
					title: formState.inputValues.title, 
					imageUrl: formState.inputValues.imageUrl, 
					description: formState.inputValues.description, 
					price: +formState.inputValues.price
				}))
			}else{
				await dispatch(addProduct(newProduct))
			}
		}catch(error){
			setErrorText(error.message)
		}

		setIsLoading(false)
		props.navigation.goBack()

	},[dispatch, productId, formState])

	useEffect(() => {
		props.navigation.setParams({'submit': onSubmitHandler})
	}, [onSubmitHandler])

	const textChangeHandler = useCallback((inputField, inputValue, inputValidity) => {
			// isValid = false
			// if(text.trim().length > 0){
			// 	isValid = true
			// }
	
			dispatchFormState({
				type: FORM_INPUT_UPDATE, 
				value: inputValue, 
				isValid: inputValidity, 
				input: inputField})
		},[dispatchFormState])

	// console.log("product is ", product)

	if(isLoading){
		return (
			<View style = {styles.loadSpinner}>
				<ActivityIndicator size = "large" color = {Colors.primary}/>
			</View>
		)
	}

	return (
		<ScrollView>
			<View style = {styles.form}>
				<Input 
					id = "title"
					label = "Title"
					errorText = "Please enter a valid title!"
					keyboardType="default"
					autoCapitalize="sentences"
					autoCorrect
					returnKeyType="next"
					onInputChange = {textChangeHandler}
					initialValue = {product ? product.title : ''}
					initiallyValidity = {!!product}
					required
				/>

				<Input 
					id = "imageUrl"
					label = "Image Url"
					errorText = "Please enter a valid image url!"
					keyboardType="default"
					autoCapitalize="sentences"
					autoCorrect
					returnKeyType="next"
					onInputChange = {textChangeHandler}
					initialValue = {product ? product.imageUrl : ''}
					initiallyValidity = {!!product}
					required
				/>

				<Input 
					id = "price"
					label = "Price"
					errorText = "Please enter a valid price!"
		            keyboardType="decimal-pad"
					returnKeyType="next" 
					onInputChange = {textChangeHandler}
					initialValue = {product ? product.price.toString() : ''}
					initiallyValidity = {!!product}
					required
					min = {0.1}
					editable = {disabled}
				/>

				<Input 
					id = "description"
					label = "Description"
					errorText = "Please enter a valid description!"
					keyboardType="default"
					autoCapitalize="sentences"
					autoCorrect
					multiline
					numberOfLines = {3}
					onInputChange = {textChangeHandler}
					initialValue = {product ? product.description : ''}
					initiallyValidity = {!!product}
					required
					minLength = {5}
				/>


{/*				<View style = {styles.formControl}>
					<Text style = {styles.label}>Image</Text>
					<TextInput style = {styles.input} value = {formState.inputValues.imageUrl} onChangeText = {textChangeHandler.bind(this, 'imageUrl')}/>
				</View>

				<View style = {styles.formControl}>
					<Text style = {styles.label}>Price</Text>
					<TextInput 
					style = {styles.input} 
					value = {formState.inputValues.price} 
					onChangeText = {textChangeHandler.bind(this, 'price')} 
					editable={disabled}
					keyboardType = "decimal-pad"
				/>
				</View>

				<View style = {styles.formControl}>
					<Text style = {styles.label}>Description</Text>
					<TextInput style = {styles.input} value = {formState.inputValues.description} onChangeText = {textChangeHandler.bind(this, 'description')}/>
				</View>*/}
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	form: {
		margin: 20
	},
	loadSpinner: {
	    flex: 1, 
	    justifyContent: 'center',
	    alignItems: 'center',
	    margin: 20
	},
		noProductFoundText: {
		fontFamily: 'nunito-bold',
		fontSize: 25,
		margin: 10
	},
		addProductText: {
		fontFamily: 'nunito-bold',
		fontSize: 18,
		margin: 10,
		color: '#888'
	}
})

EditProductScreen.navigationOptions = (navData) => {
	const submitFunction = navData.navigation.getParam('submit')
	let title = navData.navigation.getParam('productTitle')
	if(title){
		title = `Edit ${title}`
	}else {
		title = 'Add Product'
	}
	return {
		headerTitle: title,
		headerRight: () => <HeaderButtons HeaderButtonComponent = {HeaderButton}>
			<Item name = "Save" iconName = {Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} onPress = {submitFunction}/>
		</HeaderButtons>
	}
}

export default EditProductScreen;