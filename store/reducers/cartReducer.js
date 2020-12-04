import CartItem from '../../models/CartItem'

const initialState = {
	items: {},
	totalAmount: 0
}

import {ADD_TO_CART, REMOVE_ITEM} from '../actions/cartAction'


export default (state = initialState, action) => {
	switch(action.type){
		case ADD_TO_CART : 
			const addedProduct = action.product
			const productPrice = addedProduct.price 
			const productTitle = addedProduct.title 

			let updatedOrNewCartItem;

			if(state.items[addedProduct.id]){
				const existingItem = state.items[addedProduct.id]
				updatedOrNewCartItem = new CartItem(
					existingItem.productTitle, existingItem.productPrice, existingItem.quantity + 1, existingItem.sum + existingItem.productPrice
				)
			}else{
				updatedOrNewCartItem = new CartItem(productTitle, productPrice, 1, productPrice)
			}

			let updatedState = {
				...state,
				items: {
					...state.items, [addedProduct.id]: updatedOrNewCartItem
				},
				totalAmount: state.totalAmount + productPrice
			}
			return updatedState 
		case REMOVE_ITEM :
			const productId = action.productId
			const currentItem = state.items[productId]
			const currentQuantity = state.items[productId].quantity
			let updatedCartItems;
			if(currentQuantity > 1){
				const updatedCartItem = new CartItem(currentItem.productTitle, currentItem.productPrice, (currentItem.quantity - 1), (currentItem.sum - currentItem.productPrice))
				updatedCartItems = {
					...state.items, [productId]: updatedCartItem
				}

			}else{
				updatedCartItems = {...state.items}
				delete updatedCartItems[productId]
			}

			return {
				...state,
				items: updatedCartItems,
				totalAmount: state.totalAmount - currentItem.productPrice
			}
		default: 
			return state
	}
}