import getters from './getters.js'
import actions from './actions.js'
import mutations from './mutations.js'

const productsModule = {
  state () {
    return {
      products: []
    }
  },
  getters: getters,
  actions: actions,
  mutations: mutations 
}

export default productsModule
