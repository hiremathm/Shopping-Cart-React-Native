import React from 'react';
import { FlatList, Text, StyleSheet, Button, View, Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import ProductItem from '../../components/ProductItem'
import Colors from '../../constants/Colors'

// Actions
import {addToCart, ADD_TO_CART} from '../../store/actions/cartAction'
// import * as cartItems from '../../store/actions/cartAction'
import HeaderButton from '../../components/UI/HeaderButton'

export default function ProductsScreen(props) {
  const dispatch = useDispatch()

  const products = useSelector(state => state.products.availableProducts)

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('productDetails',{productId: id, productTitle: title})
  }

  return (
   	<View>
   		<FlatList data = {products} keyExtractor = {item => item.id} renderItem = {itemData => 
        <ProductItem onSelect = {() => selectItemHandler(itemData.item.id, itemData.item.title)} item = {itemData.item}> 
          <Button color = {Colors.primary} title = "View Details" onPress = {() => selectItemHandler(itemData.item.id, itemData.item.title)}/>
          <Button color = {Colors.accent} title = "Add to Cart" onPress={() =>{ dispatch(addToCart(itemData.item))}}/>
        </ProductItem>
      }/> 
  	</View>
  );
}

ProductsScreen.navigationOptions = (navData) => {
	return {
  	headerTitle: 'All Products',
    headerLeft: () => <HeaderButtons HeaderButtonComponent = {HeaderButton}>
      <Item title = "Menu" iconName = {Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress = {() => {navData.navigation.openDrawer()}} />
    </HeaderButtons>,
  	headerRight: () => <HeaderButtons HeaderButtonComponent = {HeaderButton}>
    	<Item title = "Cart" iconName = {Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} onPress = {() => {navData.navigation.navigate("cart")}} />
  	</HeaderButtons>
  }
}