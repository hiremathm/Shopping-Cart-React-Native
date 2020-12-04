import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {Platform} from 'react-native'

// screens
import ProductsScreen from '../screens/shop/ProductsScreen'
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen'
import CartScreen from '../screens/shop/CartScreen'

// constants
import Colors from '../constants/Colors'

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
	defaultNavigationOptions: {
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
})

export default createAppContainer(ProductsStackScreen);