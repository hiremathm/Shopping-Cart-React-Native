import React from 'react'
import {View, Text, StyleSheet, ScrollView, Button, Image} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'

// actions
import {addToCart, ADD_TO_CART} from '../../store/actions/cartAction'
// import * as cartItems from '../../store/actions/cartAction'


import Colors from '../../constants/Colors'
const ProductDetailsScreen = props => {
	const dispatch = useDispatch()

	const itemId = props.navigation.getParam('productId')

	const allProducts = useSelector(state => state.products.availableProducts)

	const product = allProducts.find(product => product.id === itemId)

	return (
		<ScrollView>
			<Image source = {{uri: product.imageUrl}} style = {styles.image}/>
			<View style = {styles.actions}>
				<Button color = {Colors.primary} title = "Add to Cart" onPress = {() => {dispatch(addToCart(product))}}/>
			</View>
			<Text style = {styles.price}>${product.price.toFixed(2)}</Text>
			<Text style = {styles.description}>{product.description}</Text>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	price: {
		textAlign: 'center',
		fontSize: 20,
		marginHorizontal: 20,
		marginVertical: 20,
		color: '#888'
	},
	description: {
		fontSize: 18,
		textAlign: 'center',
		marginHorizontal: 20,
		// fontFamily: 'nunito-bold'
	},
	image: {
		width: '100%',
		height: 300,
		// fontFamily: 'nunito-bold'
	},
	actions: {
		marginVertical: 10,
		alignItems: 'center'
	}	
})

ProductDetailsScreen.navigationOptions = (navigationData) => {
	const title = navigationData.navigation.getParam('productTitle')
	return {
		headerTitle: title
	}
}

export default ProductDetailsScreen;