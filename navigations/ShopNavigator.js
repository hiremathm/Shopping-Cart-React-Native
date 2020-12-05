import React from 'react'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import {Platform} from 'react-native'
import {Ionicons} from '@expo/vector-icons'

// screens
import ProductsScreen from '../screens/shop/ProductsScreen'
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrderScreen from '../screens/shop/OrderScreen'
import UserProductsScreen from '../screens/user/UserProductsScreen'
import EditProductScreen from '../screens/user/EditProductScreen'
// constants
import Colors from '../constants/Colors'

const defaultNavigationOptions = {
		headerStyle: {
			backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
		},
		headerTitleStyle: {
			fontFamily: 'nunito-bold'
		},
		headerBackTitleStyle: {
			fontFamily: 'nunito-bold'
		},
		headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary 
	}

const ProductsStackScreen = createStackNavigator({
	products: {
		screen: ProductsScreen,
	},
	productDetails: {
		screen: ProductDetailsScreen
	},
	cart: {
		screen: CartScreen
	}
}, {
	navigationOptions: {
		drawerIcon: drawerConfig => <Ionicons name = {Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} size = {30} color = {drawerConfig.tintColor}/>
	},
	defaultNavigationOptions: defaultNavigationOptions
})

const OrderStackScreen = createStackNavigator({
	orders: {
		screen: OrderScreen
	}
}, {
	navigationOptions: {
		drawerIcon: drawerConfig => <Ionicons name = {Platform.OS === 'android' ? 'md-list' : 'ios-list'} size = {30} color = {drawerConfig.tintColor}/>
	},
	defaultNavigationOptions: defaultNavigationOptions
})


const adminStackScreen = createStackNavigator({
	AdminProducts: {
		screen: UserProductsScreen
	},
	EditProduct: {
		screen: EditProductScreen
	}
}, {
	navigationOptions: {
		drawerIcon: drawerConfig => <Ionicons name = {Platform.OS === 'android' ? 'md-create' : 'ios-create'} size = {30} color = {drawerConfig.tintColor}/>
	},
	defaultNavigationOptions: defaultNavigationOptions
})


const ShopNavigator = createDrawerNavigator({
	Products: ProductsStackScreen,
	Orders: OrderStackScreen,
	Admin: adminStackScreen
}, {
	contentOptions: {
		activeTintColor: Colors.primary
	}
})

export default createAppContainer(ShopNavigator);