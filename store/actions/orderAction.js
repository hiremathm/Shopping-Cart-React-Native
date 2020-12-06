export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'
import Order from '../../models/Order'

export const fetchOrders = () => {
  return async dispatch => {
   try {
      const response = await fetch("https://shoppingapplicationreactnative-default-rtdb.firebaseio.com/orders/u1.json")
 
      if(!response.ok){
        throw new Error("Something went wrong!")
      }else{
        const responseData = await response.json()
        let loadedOrders = []

        console.log("ORDER RESPONSE", responseData)

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

	return async dispatch => {
		const response = await fetch("https://shoppingapplicationreactnative-default-rtdb.firebaseio.com/orders/u1.json",{
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
	}

}