import React, { useEffect } from 'react'
import {View, Text, StyleSheet, ActivityIndicator, AsyncStorage} from 'react-native'

import {useDispatch} from 'react-redux'

import Colors from '../constants/Colors'

import * as authActions from '../store/actions/auth'

const StartupScreen = (props) => {
	const dispatch = useDispatch()

	useEffect(() => {
		const tryLogin = async () => {
			const userData = await AsyncStorage.getItem('userData')
			console.log("CALLED IN STARTUP SCREEN")
			
			if(!userData){
				props.navigation.navigate('Auth')
				return;
			}
			const parsedUserData = JSON.parse(userData) 
			const {token, userId, expiryDate} = parsedUserData;
			const expirationDate = new Date(expiryDate)
			if(expirationDate <= new Date() || !token || !userId){
				props.navigation.navigate('Auth')
				return;				
			}
			let expiryTime = (expirationDate.getTime() - new Date().getTime()) / 100

			props.navigation.navigate('Shop')
			console.log("EXPIRTY TIME IN STARTUP CREEN",expiryTime)
			dispatch(authActions.authenticate(token, userId, expiryTime))
		}
		tryLogin()
	},[dispatch])

	return (
		<View style = {styles.screen}>
			<Text>
				<ActivityIndicator size = "large" color = {Colors.primary}/>
			</Text>
		</View>
	)	
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default StartupScreen