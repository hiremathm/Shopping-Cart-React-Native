class CartItem {
	constructor(productTitle, productPrice, quantity, sum, pushToken) {
		this.productPrice = productPrice
		this.productTitle = productTitle
		this.quantity = quantity
		this.sum = sum
		this.pushToken = pushToken
	}
}

export default CartItem;