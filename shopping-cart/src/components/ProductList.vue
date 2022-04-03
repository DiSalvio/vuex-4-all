<template>
  <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif">
  <div v-else v-for="product in products" :key="product.id">
    <h1>{{ product.title }}</h1>
    <h2>{{ product.price }}</h2>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: true
    }
  },
  computed: {
    products () {
      return this.$store.getters.availableProducts
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
      .then(() => this.loading = false)
  }
}
</script>
