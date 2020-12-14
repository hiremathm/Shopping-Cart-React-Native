import React from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import {Text, View, StyleSheet, Button, Platform} from 'react-native'
import {createStackNavigator} from 'react-navigation-stack'

const CategoryScreen = () => {
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

export default CategoryScreen;