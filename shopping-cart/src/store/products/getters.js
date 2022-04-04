export default {
    products (state) {
      return state.products
    },
    productInStock () {
      return (product) => {
        return product.inventory > 0
      }
    }
  }
