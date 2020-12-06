import Order from '../../models/Order'

import {ADD_ORDER, SET_ORDERS} from '../actions/orderAction'

const initailState = {
	orders: []	
}

export default (state = initailState, action) => {
	switch(action.type){
		case SET_ORDERS: 
			return {
				...state,
				orders: action.orders
			}

		case ADD_ORDER:
			const newOrder = new Order(action.id, action.items, action.totalAmount, action.date) 
			
			const updatedOrders = {
				...state,
				orders: state.orders.concat(newOrder)
			}

			return updatedOrders
	}

	return state
}