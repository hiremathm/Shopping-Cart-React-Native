import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {AppLoading} from 'expo'
import * as Font from 'expo-font'
// redux
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import productReducer from './store/reducers/productReducer'
import cartReducer from './store/reducers/cartReducer'
import orderReducer from './store/reducers/orderReducer'

// navigations
import ShopNavigator from './navigations/ShopNavigator'


const FetchFonts = () => {
  return Font.loadAsync({
    'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
    'nunito-light': require('./assets/fonts/Nunito-Light.ttf')
  })
}

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer

})

const store = createStore(rootReducer)
console.log("**********************************************************************************************************************************")
// console.log("CURRENT STATE", store.getState().orders)
console.log("**********************************************************************************************************************************")
export default function App() {
  const [fontLoaded, setFontload] = useState(false)

  if(!fontLoaded){
    return (
      <AppLoading startAsync = {FetchFonts} 
        onFinish = {() => {setFontload(true)}}
      />
    )
  }

  return (
    <Provider store = {store}>
      <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
