import { createStore } from 'vuex'
import productsModule from './products/index.js'

const store = createStore({
  modules: {
    productsMod: productsModule
  }
})

export default store
