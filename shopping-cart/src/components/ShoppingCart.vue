<template>
  <h1>Shopping Cart</h1>
  <div v-for="product in products" :key="product.id">
    {{ product.title }} - {{ currency(product.price) }} - {{ product.quantity }}
  </div>
  <p v-if="total>0">
    Total: {{ currency(total) }}
  </p>
  <p v-if="checkoutStatus">{{ checkoutStatus }}</p>
  <button v-if="total!=0" @click="checkout">Checkout</button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      products: 'cartProducts',
      total: 'cartTotal',
      checkoutStatus: 'checkoutStatus'
    })
  },
  methods: {
    ...mapActions({
      checkout: 'checkout'
    }),
    currency (value, currency, decimals) {
      const digitsRE = /(\d{3})(?=\d)/g
      value = parseFloat(value)
      if (!isFinite(value) || (!value && value !== 0)) return ''
      currency = currency != null ? currency : '$'
      decimals = decimals != null ? decimals : 2
      var stringified = Math.abs(value).toFixed(decimals)
      var _int = decimals
        ? stringified.slice(0, -1 - decimals)
        : stringified
      var i = _int.length % 3
      var head = i > 0
        ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
        : ''
      var _float = decimals
        ? stringified.slice(-1 - decimals)
        : ''
      var sign = value < 0 ? '-' : ''
      return sign + currency + head +
        _int.slice(i).replace(digitsRE, '$1,') +
        _float
    }
  }
}
</script>
