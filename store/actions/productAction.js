export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

import Product from '../../models/Product'

export const fetchProducts = () => {

	return async (dispatch,getState) => {
		// Write any async code in here
    let userId = getState().auth.userId
    let token = getState().auth.token
		try {
      const response = await fetch(`https://shoppingapplicationreactnative-default-rtdb.firebaseio.com/products.json??auth=${token}`)
 
      if(!response.ok){
        throw new Error("Something went wrong!")
      }else{
        const responseData = await response.json()
        let loadedProducts = []

        for(const key in responseData){
          loadedProducts.push(new Product(key, responseData[key].ownerId, responseData[key].title, responseData[key].imageUrl, responseData[key].description, responseData[key].price))
        }

        dispatch({
          type: SET_PRODUCTS,
          products: loadedProducts,
          userProducts: loadedProducts.filter(product => product.ownerId === userId)
        })
      }
    }catch(error){
      throw error
    }
	}
}

export const removeProduct = (productId) => {
	return async (dispatch,getState) => {
    let token = getState().auth.token
    const response = await fetch(`https://shoppingapplicationreactnative-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,{
      method: 'DELETE'
    })

    const responseData = await response.json()
  
    dispatch({
      type: REMOVE_PRODUCT,
      productId: productId
    })
  }
}

export const addProduct = (product) => {
	return async (dispatch,getState) => {
		// Write any async code in here
    let token = getState().auth.token
    const userId = getState().auth.userId

  	const response = await fetch(`https://shoppingapplicationreactnative-default-rtdb.firebaseio.com/products.json?auth=${token}`,{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: product.title,
				description: product.description,
				imageUrl: product.imageUrl,
				price: product.price,
        ownerId: userId
			}) 
		})

		const responseData = await response.json()

		product['id'] = responseData['name']
    product['ownerId'] = userId
		dispatch({
			type: ADD_PRODUCT,
			product: product
		})
	}
}

export const updateProduct = (product) => {
	return async (dispatch,getState) => {
    let token = getState().auth.token
   
    try{
      const response = await fetch(`https://shoppingapplicationreactnative-default-rtdb.firebaseio.com/products/${product.id}.json?auth=${token}`,{
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