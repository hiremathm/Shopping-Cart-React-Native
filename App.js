import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {AppLoading} from 'expo'
import * as Font from 'expo-font'
// redux
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import ReduxThunk from 'redux-thunk'

// Reducers
import productReducer from './store/reducers/productReducer'
import cartReducer from './store/reducers/cartReducer'
import orderReducer from './store/reducers/orderReducer'
import authReducer from './store/reducers/authReducer'

// Navigations
import NavigationContainer from './navigations/NavigationContainer'

// Notificaitons
import * as Notificaitons from 'expo-notifications'


Notificaitons.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true
    }
  }
})

// Load fonts
const FetchFonts = () => {
  return Font.loadAsync({
    'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
    'nunito-light': require('./assets/fonts/Nunito-Light.ttf')
  })
}

// Combine reducers
const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer,
  auth: authReducer
})

// Create Store
const store = createStore(rootReducer,applyMiddleware(ReduxThunk))


// console.log("**********************************************************************************************************************************")
// console.log("STARTING APPLICATIONS")
// console.log("**********************************************************************************************************************************")
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
      <NavigationContainer />
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
