import React from 'react'
import {Text, View, StyleSheet, Button, Platform} from 'react-native'
import {createStackNavigator} from 'react-navigation-stack'

import Colors from '../../constants/Colors'

const HomeScreen = () => {
	return (
		<View style = {styles.screen}>
		<Button title = "tab button"/>
		</View>
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
export default HomeScreen;