export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

export const removeProduct = (productId) => {
	return {
		type: REMOVE_PRODUCT,
		productId: productId
	}
}
export const addProduct = (product) => {
	return {
		type: ADD_PRODUCT,
		product: product
	}
}
export const updateProduct = (product) => {
	return {
		type: UPDATE_PRODUCT,
		product: product
	}
}