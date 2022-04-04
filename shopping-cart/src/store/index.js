import { createStore } from 'vuex'
import productsModule from './products/index.js'
import cartModule from './cart/index.js'

const store = createStore({
  modules: {
    productsMod: productsModule,
    cartMod: cartModule
  }
})

export default store
