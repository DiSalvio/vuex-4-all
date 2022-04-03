<template>
  <div v-for="product in products" :key="product.id">
    <h1>{{ product.title }}</h1>
    <h2>{{ product.price }}</h2>
  </div>
</template>

<script>
import shop from '@/api/shop.js'
export default {
  data () {
    return {
      products: []
    }
  },
  created () {
    shop.getProducts(products => {
      this.products = products
    })
  }
}
</script>
