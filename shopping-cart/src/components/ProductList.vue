<template>
  <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif">
  <div v-else v-for="product in products" :key="product.id">
    <h1>{{ product.title }}</h1>
    <h2>{{ currency(product.price) }}</h2>
    <h3>{{ product.inventory }}</h3>
    <button :disabled="!productInStock(product)" @click="addProductToCart(product)">Add to Cart</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      loading: true
    }
  },
  computed: {
    ...mapGetters({
      products: 'products',
      productInStock: 'productInStock'
    })
  },
  created () {
    this.fetchProducts()
      .then(() => this.loading = false)
  },
  methods: {
    ...mapActions({
      fetchProducts: 'fetchProducts',
      addProductToCart: 'addProductToCart'
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
