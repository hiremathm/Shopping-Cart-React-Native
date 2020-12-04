export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_ITEM = 'REMOVE_ITEM'

export const addToCart = (product) => {
	return {
		type: ADD_TO_CART,
		product: product
	}
}

export const removeItem = (productId) => {
	return {
		type: REMOVE_ITEM,
		productId: productId
	}
}