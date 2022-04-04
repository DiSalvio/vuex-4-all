export default {
    cartProducts (state, getters, rootState) {
      return state.cart.map(cartItem => {
        const product = rootState.productsMod.products.find(product => product.id === cartItem.id)
        return {
          ...product,
          quantity: cartItem.quantity
        }
      })
    },
    cartTotal (state, getters) {
      return getters.cartProducts.reduce((total, product) => total = total + product.price * product.quantity, 0)
    },
    checkoutStatus (state) {
      return state.checkoutStatus
    }
  }
