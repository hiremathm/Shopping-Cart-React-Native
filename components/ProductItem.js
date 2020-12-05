import React from 'react';
import { FlatList, Text, StyleSheet, View, Image, TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native';

const ProductItem = (props) => {
	let TouchableComponent = (Platform.OS === 'android' && Platform.Version >= 21) ? TouchableNativeFeedback : TouchableOpacity
	return (
		<View style = {styles.product}>
			<View style = {styles.touchable}>
				<TouchableComponent onPress = {props.onSelect} useForground>
					<View>
						<View style = {styles.imageContainer}>
							<Image source = {{uri: props.item.imageUrl}} style = {styles.image}/>
						</View>
						<View style = {styles.details}>
							<Text style = {styles.title}>
								{props.item.title}
							</Text>

							<Text style = {styles.price}>
								${props.item.price.toFixed(2)}
							</Text>
						</View>

						<View style = {styles.actions}>
							{props.children}
						</View>
					</View>
				</TouchableComponent>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	product: {
		shadowColor: 'black',
		shadowOpacity: 0.26,
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 8,
		elevation: 5,
		borderRadius: 10,
		backgroundColor: 'white',
		height: 300,
		margin: 10,
	},
	touchable:{
		overflow: 'hidden',
		padding: 10
	}
	,
	actions : {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '25%',
		paddingHorizontal: 20
	},
	imageContainer: {
		width: '100%',
		height: '60%',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		overflow: 'hidden'
	},
	image: {
		height: '100%',
		width: '100%'
	},
	title: {
		fontSize: 18,
		marginVertical: 4,
		margin: 10,
		fontFamily: 'nunito-bold'
	},
	price: {
		fontSize: 14,
		color: '#888',
		marginVertical: 4,
		fontFamily: 'nunito-bold'
	},
	details: {
		alignItems: 'center',
		height: '15%',
		padding: 10
	}
})

export default ProductItem;