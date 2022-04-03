import shop from '../../api/shop.js'

const productsModule = {
  state () {
    return {
      products: [],
      cart: []
    }
  },
  getters: {
    availableProducts (state) {
      return state.products.filter(product => product.inventory > 0)
    },
    cartProducts (state) {
      return state.cart.map(cartItem => {
        const product = state.products.find(product => product.id === cartItem.id)
        return {
          ...product,
          quantity: cartItem.quantity
        }
      })
    },
    cartTotal (state, getters) {
      return getters.cartProducts.reduce((total, product) => total = total + product.price * product.quantity, 0)
    }
  },
  actions: {
    fetchProducts ({commit}) {
      return new Promise((resolve) => {
        shop.getProducts(products => {
          commit('setProducts', products)
          resolve()
        })
      })
    },
    addProductToCart (context, product) {
      if (product.inventory > 0) {
        const cartItem = context.state.cart.find(item => item.id === product.id)
        if (!cartItem) {
          context.commit('pushProductToCart', product.id)
        } else {
          context.commit('incrementItemQuantity', cartItem)
        }
        context.commit('decrementProductInventory', product)
      }
    }
  },
  mutations: {
    setProducts (state, products) {
      state.products = products
    },
    pushProductToCart (state, productId) {
      state.cart.push({id: productId, quantity: 1})
    },
    incrementItemQuantity (state, cartItem) {
      cartItem.quantity++
    },
    decrementProductInventory (state, product) {
      product.inventory--
    }
  }
}

export default productsModule
