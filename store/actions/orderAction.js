export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'
import Order from '../../models/Order'

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId
    const token = getState().auth.token

    // console.log("USER ID AND TOKEN ",userId, token)
    
    try {
      const response = await fetch(`https://shoppingapplicationreactnative-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`)
 
      if(!response.ok){
        const responseData = await response.json()
        // console.log("responsedata", responseData)
        throw new Error("Something went wrong!")
      }else{
        const responseData = await response.json()
        let loadedOrders = []

        for(const key in responseData){
          loadedOrders.push(new Order(key,responseData[key].items, responseData[key].totalAmount, new Date(responseData[key].date)))
        }

        dispatch({
          type: SET_ORDERS,
          orders: loadedOrders
        })
      }
    }catch(error){
      throw error
    }
  }
}

export const addOrder = (cartItems, totalAmount) => {
  const date = new Date();

	return async (dispatch, getState) => {
    const token = getState().auth.token
    const userId = getState().auth.userId
    // console.log("USER ID AND TOKEN ",userId, token)
		const response = await fetch(`https://shoppingapplicationreactnative-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				items: cartItems,
				totalAmount: totalAmount,
        date: date.toISOString()
			}) 
		})

		const responseData = await response.json()

		dispatch({
			type: ADD_ORDER,
		  id: responseData.name,
    	items: cartItems, 
      totalAmount: totalAmount,
      date: date
		})

    for(const cartItem in cartItems){
      const pushToken = cartItems[cartItem].pushToken
      const title = cartItems[cartItem].productTitle
      const price = cartItems[cartItem].productPrice
      const date = new Date().toISOString()
      const quantity = cartItems[cartItem].quantity
      const totalAmount = cartItems[cartItem].sum

      const pushResponse = await fetch("https://exp.host/--/api/v2/push/send",{
        method: 'POST',
        headers: {
          'Accept': 'applicaiton/json',
          'Accept-Encoding': 'gzip',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "to": pushToken,
          "title": "Order Notification",
          "body": `Dear User, \n\n  You have got one order.\n\n  Product Title: ${title}\n  Quantity: ${quantity}\n  Product price : $ ${price}\n  Order Date: ${date}\n  Order Amount: $ ${totalAmount}\n\nThank You,\nShopping Team`
        }) 
      })
      const pushResponseData = await pushResponse.json()
      console.log("PUSH RESPONSE", pushResponseData)
    }
	}
}