import {PRODUCTS} from '../../data/dummy-data'
import {REMOVE_PRODUCT, ADD_PRODUCT, UPDATE_PRODUCT} from '../actions/productAction'
import Product from '../../models/Product'

const initialState = {
	availableProducts: PRODUCTS,
	userProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
}

export default (state = initialState, action) => {
	const availableProducts = [...state.availableProducts]
	const userProducts = [...state.userProducts]
	switch(action.type){
		case ADD_PRODUCT: 
			const newProduct = new Product(new Date().toString(), 'u1', action.product.title, action.product.imageUrl, action.product.description, action.product.price)	

			const updatedProducts = {
				...state, 
				availableProducts: availableProducts.concat(newProduct),
				userProducts: userProducts.concat(newProduct)
			}
			return updatedProducts
		case UPDATE_PRODUCT: 
			const userProductIndex = userProducts.findIndex(product => product.id === action.product.id)
			const availableProductIndex = availableProducts.findIndex(product => product.id === action.product.id)

			const updatedProduct = new Product(
				action.product.id,
				userProducts[userProductIndex].ownerId,
				action.product.title,
				action.product.imageUrl,
				action.product.description,
				action.product.price
			)
			userProducts[userProductIndex] = updatedProduct
			availableProducts[availableProductIndex] = updatedProduct

			return {
				...state, 
				availableProducts: availableProducts,
				userProducts: userProducts
			}

		case REMOVE_PRODUCT: 
			const updatedProductState = {
				...state,
				availableProducts: availableProducts.filter(product => product.id != action.productId),
				userProducts: userProducts.filter(product => product.id != action.productId)
			}

			return updatedProductState
	}
	return state;
}