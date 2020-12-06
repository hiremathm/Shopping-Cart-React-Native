export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

import Product from '../../models/Product'

export const fetchProducts = () => {

	return async dispatch => {
		// Write any async code in here
		try {
      const response = await fetch("https://shoppingapplicationreactnative-default-rtdb.firebaseio.com/products.json")
 
  
      if(!response.ok){
        throw new Error("Something went wrong!")
      }else{
        const responseData = await response.json()
        let loadedProducts = []

        for(const key in responseData){
          loadedProducts.push(new Product(key, 'u1',responseData[key].title, responseData[key].imageUrl, responseData[key].description, responseData[key].price))
        }

        dispatch({
          type: SET_PRODUCTS,
          products: loadedProducts
        })
      }
    }catch(error){
      throw error
    }
	}
}

export const removeProduct = (productId) => {
	return async dispatch => {
    const response = await fetch(`https://shoppingapplicationreactnative-default-rtdb.firebaseio.com/products/${productId}.json`,{
      method: 'DELETE'
    })

    dispatch({
      type: REMOVE_PRODUCT,
      productId: productId
    })
  }
}

export const addProduct = (product) => {
	return async dispatch => {
		// Write any async code in here
		const response = await fetch("https://shoppingapplicationreactnative-default-rtdb.firebaseio.com/products.json",{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: product.title,
				description: product.description,
				imageUrl: product.imageUrl,
				price: product.price
			}) 
		})

		const responseData = await response.json()

		// console.log("firebase post product response", responseData)
		product['id'] = responseData['name']
		dispatch({
			type: ADD_PRODUCT,
			product: product
		})
	}
}

export const updateProduct = (product) => {
	return async dispatch => {
    try{
      const response = await fetch(`https://shoppingapplicationreactnative-default-rtdb.firebaseio.com/products/${product.id}.json`,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: product.title,
          description: product.description,
          imageUrl: product.imageUrl,
        }) 
      })

      if(!response.ok){
        throw new Error('Please try again!')
      }

      dispatch({
        type: UPDATE_PRODUCT,
        product: product
      })
    }catch(error){
      throw error
    }
  }
}