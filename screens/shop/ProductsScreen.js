import React, {useState, useEffect, useCallback} from 'react';
import {FlatList, Text, StyleSheet, Button, View, Platform, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import ProductItem from '../../components/ProductItem'
import Colors from '../../constants/Colors'

// Actions
import {addToCart, ADD_TO_CART} from '../../store/actions/cartAction'
import * as productionActions from '../../store/actions/productAction'
import HeaderButton from '../../components/UI/HeaderButton'

export default function ProductsScreen(props) {
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const [errorText, setError] = useState()

  const dispatch = useDispatch()

  const products = useSelector(state => state.products.availableProducts)

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('productDetails',{productId: id, productTitle: title})
  }

  const loadProducts =  useCallback(async () => {
    setError(null)
    setIsRefreshing(true)
    try {
      await dispatch(productionActions.fetchProducts())
    }catch(error){
      setError(error.message)
      console.log("product load error ", error)
    }
    setIsRefreshing(false)
  }, [dispatch, setIsLoading, setError])

  useEffect(() => {
    const willFocusSub = props.navigation.addListener('willFocus', loadProducts)

    return () => {
      willFocusSub.remove()
    }
  })


  useEffect(() => {
    setIsLoading(true)
    loadProducts()
    setIsLoading(false)
  }, [dispatch, loadProducts])

  if(errorText){
    return (
        <View style = {styles.loadSpinner}>
          <Text style = {styles.noProductFoundText}>Opps! Something went wrong.</Text>
          <Button title = "Try again" color = {Colors.primary} onPress = {loadProducts}/>
        </View>
      )
  }

  if(isLoading){
    return (
        <View style = {styles.loadSpinner}>
          <ActivityIndicator size = "large" color = {Colors.primary}/>
        </View>
      )
  }

  if(!isLoading && products.length === 0){
    return (
        <View style = {styles.loadSpinner}>
          <Text style = {styles.noProductFoundText}>No products found.</Text>
          <Text style = {styles.addProductText}>Maybe start adding some!</Text>
        </View>
      )
  }

  return (
   	<View>
   		<FlatList onRefresh = {loadProducts} refreshing = {isRefreshing} data = {products} keyExtractor = {item => item.id} renderItem = {itemData => 
        <ProductItem onSelect = {() => selectItemHandler(itemData.item.id, itemData.item.title)} item = {itemData.item}> 
          <Button color = {Colors.primary} title = "View Details" onPress = {() => selectItemHandler(itemData.item.id, itemData.item.title)}/>
          <Button color = {Colors.accent} title = "Add to Cart" onPress={() =>{ dispatch(addToCart(itemData.item))}}/>
        </ProductItem>
      }/> 
      <View>
        
      </View>
  	</View>
  );
}

const styles = StyleSheet.create({
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