import React, {useState} from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import Colors from '../constants/Colors'
import CartItem from './CartItem'

const OrderItem = (props) => {
	const [showDetails, setShowDetails] = useState(false)

	return (
		<View style = {styles.orderItem}>
			<View style = {styles.summary}>
				<Text style = {styles.totalAmount}>
					${props.amount.toFixed(2)}
				</Text>
				<Text style = {styles.date}>
					{props.date}
				</Text>
			</View>
			<Button color = {Colors.primary} title = {showDetails? "Hide Details":"Show Details"} onPress = {() => {setShowDetails(prevState => !prevState)}}/>

			{
				showDetails && (<View style = {styles.itemDetails}>{props.items.map((item, index) => <CartItem key = {index} item = {item}/>)}</View>)
			}
		</View>
	)
}

const styles = StyleSheet.create({
	orderItem: {
		shadowColor: 'black',
		shadowOpacity: 0.26,
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 8,
		elevation: 5,
		borderRadius: 10,
		backgroundColor: 'white',
		// height: 300,
		padding: 10,
		margin: 20,
		alignItems: 'center'
	},
	summary: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width:'100%',
		marginBottom: 10
	},
	totalAmount: {
		fontFamily: 'nunito-bold',
		fontSize: 18
	},
	date: {
		fontFamily: 'nunito-regular',
		fontSize: 16,
		color: '#888'
	},
	itemDetails: {
		width: '100%',
		marginTop: 20
	}
})

export default OrderItem;