const productsModule = {
  state () {
    return {
      products: []
    }
  },
  getters: {
    getProducts (state) {
      return state.products
    }
  },
  actions: {
    fetchProducts () {
    }
  },
  mutations: {
    setProducts (state, products) {
      state.products = products
    }
  }
}

export default productsModule
