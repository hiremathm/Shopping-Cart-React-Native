import React from 'react';
import { FlatList, Text, StyleSheet, View, Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import ProductItem from '../../components/ProductItem'


// Actions
import {addToCart, ADD_TO_CART} from '../../store/actions/cartAction'
// import * as cartItems from '../../store/actions/cartAction'
import HeaderButton from '../../components/UI/HeaderButton'

export default function ProductsScreen(props) {
  const dispatch = useDispatch()

  const products = useSelector(state => state.products.availableProducts)


  return (
   	<View>
   		<FlatList data = {products} keyExtractor = {item => item.id} renderItem = {itemData => <ProductItem onViewDeal = {() => props.navigation.navigate('productDetails',{productId: itemData.item.id, productTitle: itemData.item.title})} onAddToCart={() =>{ dispatch(addToCart(itemData.item))}} item = {itemData.item}/>}/>
  	</View>
  );
}

ProductsScreen.navigationOptions = (navData) => {
	return {
	headerTitle: 'All Products',
	headerRight: () => <HeaderButtons HeaderButtonComponent = {HeaderButton}>
  	<Item title = "Cart" iconName = {Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} onPress = {() => {navData.navigation.navigate("cart")}} />
	</HeaderButtons>}
}

