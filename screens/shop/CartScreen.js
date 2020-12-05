import React from 'react'
import {View, Text, StyleSheet, Button, FlatList, TouchableWithoutFeedback, ImageBackground} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {Ionicons} from '@expo/vector-icons'

import Colors from '../../constants/Colors'
import CartItem from '../../components/CartItem'
import {removeItem} from '../../store/actions/cartAction'
import {addOrder} from '../../store/actions/orderAction'

const CartScreen = (props) => {
	const dispatch = useDispatch()

	const cartItems = useSelector(state => {
		const cartItemsArray = []
		for(const key in state.cart.items){
			cartItemsArray.push({
				productId: key,
				productTitle: state.cart.items[key].productTitle,
				productPrice: state.cart.items[key].productPrice,
				quantity: state.cart.items[key].quantity,
				sum: state.cart.items[key].sum
			})
		}
		return cartItemsArray.sort((a,b) => a.productId > b.productId ? 1 : -1);
	})
	

	const cartTotalAmount = useSelector(state => state.cart.totalAmount)

	let cortBody;
	if(cartItems.length === 0){
		cortBody = <View style = {styles.emptyCart}>
			<Ionicons name = {Platform.OS === 'android' ? "ios-cart-outline" : "ios-cart"} color = {Colors.primary} size = {300}/>

			<Text style = {styles.cartText}>Your Cart is Empty!!!</Text>
			<Text style = {styles.addItem}>Add items to it now.</Text>
			<View style = {styles.orderNow}>
				<TouchableWithoutFeedback onPress = {() => props.navigation.navigate("products")}>
					<Text style = {styles.shopNow}>Shop Now</Text>
				</TouchableWithoutFeedback>
			</View>
		</View>
	}else{
		cortBody = <View>
			<View style = {styles.summary}
			>
				<Text style = {styles.summaryText}>Name</Text>
				<Text style =  {{paddingLeft: 40, ...styles.summaryText}}>Quantity</Text>
				<Text style = {styles.summaryText}>Price</Text>
				<Text style = {styles.summaryText}>Total Price</Text>
				<Text style = {styles.summaryText}>Actions</Text>
			</View>

			<View style = {styles.summary}>
				<FlatList data = {cartItems} keyExtractor = {item => item.productId} renderItem = {itemData => <CartItem  onRemove = {() => dispatch(removeItem(itemData.item.productId))} deletable item = {itemData.item}/>} />
			</View>

			<View style = {styles.summary}>
				<Text style = {styles.summaryText}> 
					Total : <Text style = {styles.amount}>$ {cartTotalAmount.toFixed(2)}</Text>
				</Text>
				<Button color = {Colors.accent} title = "Order Now" disabled = {cartItems.length === 0} onPress = {() => {
					dispatch(addOrder(cartItems, cartTotalAmount))
				}}/>
				
			</View>
		</View>
	}

	return <View style = {styles.screen}>
		{cortBody}
	</View>
}

const styles = StyleSheet.create({
	screen: {
		margin: 20,
	},
	summary: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 10,
		padding: 10,
		shadowColor: 'black',
		shadowOpacity: 0.26,
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 8,
		elevation: 5,
		borderRadius: 10,
		backgroundColor: 'white',
	},
	emptyCart: {
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 5,
		shadowColor: 'black',
		shadowOpacity: 0.26,
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 8,
		borderRadius: 10,
		backgroundColor: 'white',
		height: "100%",
	},
	cartText: {
		fontSize: 30,
		fontFamily: "nunito-bold",
		// color: 'red'
	},
	addItem: {
		fontSize: 18, 
		fontFamily: 'nunito-bold', 
		color: '#888',
		marginTop: 40
	},
	summaryText: {
		fontFamily: 'nunito-bold',
		fontSize: 18
	}, 
	amount: {
		color: Colors.primary
	},
	orderNow: {
		marginTop: 40,
		width: '30%',
		alignItems: 'center',
		backgroundColor: Colors.primary,
		height: 40,
		justifyContent: 'center',
		borderRadius: 10,
	},
	shopNow: {
		fontFamily: 'nunito-bold',
		fontSize: 20,
		color: 'white'
	},
	image: {
		width: 300,
		height: "60%",
     	backgroundColor: 'white',
     	opacity: 1


	}
})

CartScreen.navigationOptions = {
	headerTitle: 'Your Cart'
}

export default CartScreen;