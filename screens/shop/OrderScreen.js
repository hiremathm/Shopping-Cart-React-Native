import React from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {View, Text, StyleSheet, FlatList} from 'react-native'

import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/OrderItem'

import {useSelector} from 'react-redux'

const OrderScreen  = (props) => {
	const orders = useSelector(state => state.orders.orders)
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
	}
})

export default OrderScreen;