import shop from '@/api/shop.js'

export default {
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
      return new Promise((resolve) => {
        shop.buyProducts(state.cart, 
          () => {
            commit('emptyCart')
            commit('setCheckoutStatus', 'success')
            resolve()
          },
          () => {
            commit('setCheckoutStatus', 'fail')
          }
        )
      })
    }
  }
