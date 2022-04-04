import shop from '../../api/shop.js'

const productsModule = {
  state () {
    return {
      products: [],
      cart: [],
      checkoutStatus: null
    }
  },
  getters: {
    products (state) {
      return state.products
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
    },
    checkoutStatus (state) {
      return state.checkoutStatus
    },
    productInStock () {
      return (product) => {
        return product.inventory > 0
      }
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
    addProductToCart ({ state, getters, commit }, product) {
      if (getters.productInStock(product)) {
        const cartItem = state.cart.find(item => item.id === product.id)
        if (!cartItem) {
          commit('pushProductToCart', product.id)
        } else {
          commit('incrementItemQuantity', cartItem)
        }
        commit('decrementProductInventory', product)
      }
    },
    checkout ({state, commit}) {
      return new Promise((resolve, reject) => {
        shop.buyProducts(state.cart, 
          () => {
            commit('emptyCart')
            commit('setCheckoutStatus', 'success')
            resolve()
          },
          () => {
            commit('setCheckoutStatus', 'fail')
            reject()
          }
        )
      })
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
    },
    setCheckoutStatus (state, status) {
      state.checkoutStatus = status
    },
    emptyCart (state) {
      state.cart = []
    }
  }
}

export default productsModule
