import actions from './actions.js'
import getters from './getters.js'
import mutations from './mutations.js'

const cartModule = {
  actions: actions,
  state () {
    return {
      cart: [],
      checkoutStatus: null
    }
  },
  getters: getters,
  mutations: mutations
}

export default cartModule
