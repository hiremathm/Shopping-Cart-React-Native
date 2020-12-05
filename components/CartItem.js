import React from 'react';
import { FlatList, Text, StyleSheet, View, Image, Button, TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons'

const CartItem = (props) => {
	return (

		<View style = {styles.cartItem}>
			<Text numberOfLines={2} style = {{width: 70, fontFamily: 'nunito-bold', fontSize: 16}}>{props.item.productTitle}</Text>
			<Text numberOfLines={2} style = {styles.mainText}>{props.item.quantity}</Text>
			<Text numberOfLines={2} style = {styles.mainText}>{(Math.round(props.item.productPrice.toFixed(2)) * 100) / 100}</Text>
			<Text numberOfLines={2} style = {styles.mainText}>{props.item.sum.toFixed(2)}</Text>
			{props.deletable && <TouchableOpacity onPress = {props.onRemove}>
							<Ionicons name = {Platform.OS === 'android' ? "md-trash" : "ios-trash"} color = "red" size = {25}/>
						</TouchableOpacity>}
		</View>
	)
}

const styles = StyleSheet.create({
	cartItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	itemData: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	mainText: {
		fontFamily: 'nunito-bold',
		color: '#888',
		fontSize: 16, 
		textAlign: 'center',

	},
	quantity: {
		paddingLeft: 20,
		color: '#888',
		fontFamily: 'nunito-bold',

	},
	deleteButton: {
		marginLeft: 20
	}
})

export default CartItem;