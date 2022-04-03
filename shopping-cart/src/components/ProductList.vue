<template>
  <div v-for="product in products" :key="product.id">
    <h1>{{ product.title }}</h1>
    <h2>{{ product.price }}</h2>
  </div>
</template>

<script>
import shop from '@/api/shop.js'
export default {
  computed: {
    products () {
      return this.$store.getters.getProducts
    }
  },
  created () {
    shop.getProducts(products => {
      this.$store.commit('setProducts', products)
    })
  }
}
</script>
