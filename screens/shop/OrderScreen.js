import React,{useEffect, useState, useCallback} from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {View, Text, StyleSheet, FlatList, ActivityIndicator} from 'react-native'

import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/OrderItem'
import Colors from '../../constants/Colors'
import * as orderActions from '../../store/actions/orderAction'

import {useSelector, useDispatch} from 'react-redux'

const OrderScreen  = (props) => {
	const [isLoading, setIsLoading] = useState(false)
	const orders = useSelector(state => state.orders.orders)
	const dispatch = useDispatch()

	const loadOrders = useCallback(async () => {
		setIsLoading(true)

		try{
			await dispatch(orderActions.fetchOrders())

		}catch(error) {
			console.log("error", errors)
		}
		setIsLoading(false)
	},[dispatch])

	useEffect(() => {
    	const willFocusSub = props.navigation.addListener('willFocus', loadOrders)

    	return () => {
      	willFocusSub.remove()
    	}
  	})

	useEffect(() => {
		loadOrders()

	},[dispatch, loadOrders])


	if(isLoading){
		return (
			<View style = {styles.screen}>
				<ActivityIndicator size = "large" color = {Colors.primary}/>
			</View>
		)
	}

	// if(orders.length === 0){
	// 	return (
	// 		<View style = {styles.screen}>
	// 			<Text style = {styles.textItem}>Sorry, No orders found.</Text>
	// 		</View>
	// 	)
	// }

	return (
		<View>
			<FlatList data = {orders} keyExtractor = {item => item.id} renderItem = {itemData => <OrderItem amount = {itemData.item.totalAmount} date = {itemData.item.readableDate} items = {itemData.item.items} />}/>
		</View>
	)
}

OrderScreen.navigationOptions = (navData) => {
	return {
  	headerTitle: 'Your Orders',
    headerLeft: () => <HeaderButtons HeaderButtonComponent = {HeaderButton}>
      <Item title = "Menu" iconName = {Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress = {() => {navData.navigation.openDrawer()}} />
    </HeaderButtons>
  }
}

const styles = StyleSheet.create({
	screen: {
		flex: 1, 
		justifyContent: 'center',
		alignItems: 'center'
	},
	textItem: {
		fontFamily: 'nunito-bold',
		fontSize: 30
	}
})

export default OrderScreen;