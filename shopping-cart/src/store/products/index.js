import shop from '../../api/shop.js'

const productsModule = {
  state () {
    return {
      products: []
    }
  },
  getters: {
    availableProducts (state) {
      return state.products.filter(product => product.inventory > 0)
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
    }
  },
  mutations: {
    setProducts (state, products) {
      state.products = products
    }
  }
}

export default productsModule
