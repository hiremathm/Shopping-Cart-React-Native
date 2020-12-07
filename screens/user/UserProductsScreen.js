import React,{useState, useCallback, useEffect} from 'react'
import {FlatList, Platform, Button, TouchableOpacity, Alert, View, Text, StyleSheet, ActivityIndicator} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {Ionicons} from '@expo/vector-icons'

import {useSelector, useDispatch} from 'react-redux'

import ProductItem from '../../components/ProductItem'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'

import {removeProduct, fetchProducts} from '../../store/actions/productAction'

const UserProductScreen = (props) => {
	const [isLoading, setIsLoading] = useState(false)
	const [errorText, setErrorText] = useState()

	const dispatch = useDispatch()
	const userProducts = useSelector(state => state.products.userProducts)
	const selectItemHandler = (id, title) => {
    	props.navigation.navigate('productDetails',{productId: id, productTitle: title})
  	}

  	const EditProductHandler = (id, title) => {
  		props.navigation.navigate('EditProduct', {productId: id, productTitle: title})
  	}


	const deleteHandler = (id) => {
		Alert.alert('Are you sure?', 'Do you really want to delete it?',[{text: 'No', style: 'default'},{text: 'Yes', style: 'destructive', onPress: () => {dispatch(removeProduct(id))}}])
	}

	const loadProducts = useCallback( async () => {
		setErrorText(null)
		setIsLoading(true)
		try{
			await dispatch(fetchProducts())
		}catch(error){
			setErrorText(error.message)
		}
		setIsLoading(false)
	},[dispatch, setIsLoading, setErrorText])

	useEffect(() => {
		const willFocusSub = props.navigation.addListener('willFocus', loadProducts)

		return () => {
			willFocusSub.remove()
		}
	})

	useEffect(() => {
		loadProducts()
	},[dispatch, loadProducts])

	if(!isLoading && userProducts.length === 0){
		return (
			<View style = {styles.screen}>
				<Text style = {styles.textMessage}>
					Sorry, No Products found.
				</Text>
			</View>
		)
	}else if(errorText){
		return (
			<View style = {styles.screen}>
				<Text style = {styles.textMessage}>
					{errorText}
				</Text>
			</View>
		)		
	}

	if(isLoading){
    	return (
        	<View style = {styles.screen}>
          		<ActivityIndicator size = "large" color = {Colors.primary}/>
        	</View>
      	)
  	}

	return (
		<FlatList data = {userProducts} keyExtractor = {item => item.id} renderItem = {itemData => 
			<ProductItem item = {itemData.item} onSelect = {() => selectItemHandler(itemData.item.id, itemData.item.title)}>
				<TouchableOpacity onPress = {() => EditProductHandler(itemData.item.id,itemData.item.title)}>	
					<Ionicons color = 'green' name = {Platform.OS === 'android' ? 'md-create' : 'ios-create'} size = {35}/>
				</TouchableOpacity>
				<TouchableOpacity onPress = {() => deleteHandler(itemData.item.id)}>	
					<Ionicons color = 'red' name = {Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} size = {35}/>
				</TouchableOpacity>
			</ProductItem>
			}
		/>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	textMessage: {
		fontFamily: 'nunito-bold',
		fontSize: 30
	}
})

UserProductScreen.navigationOptions = (navData) => {
	return {
		headerTitle: 'Your Products',
		headerLeft: () => <HeaderButtons HeaderButtonComponent = {HeaderButton}>
			<Item name = "AdminProducts" iconName = {Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress = {() => {navData.navigation.openDrawer()}}/>
		</HeaderButtons>,
		headerRight: () => <HeaderButtons HeaderButtonComponent = {HeaderButton}>
			<Item name = "AdminProducts" iconName = {Platform.OS === 'android' ? 'md-create' : 'ios-create'} onPress = {() => {navData.navigation.navigate('EditProduct')}}/>
		</HeaderButtons>
	}
}

export default UserProductScreen;