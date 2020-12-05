import Order from '../../models/Order'

import {ADD_ORDER} from '../actions/orderAction'

const initailState = {
	orders: []	
}

export default (state = initailState, action) => {
	switch(action.type){
		case ADD_ORDER:
			const newOrder = new Order(new Date().toString(), action.items, action.totalAmount, new Date()) 
			
			const updatedOrders = {
				...state,
				orders: state.orders.concat(newOrder)
			}

			return updatedOrders
	}

	return state
}