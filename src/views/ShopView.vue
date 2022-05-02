<template>
<div>
  <nav>
    <router-link to="/food-input">Kaubarea sisestus</router-link> |
    <router-link to="/stock">Laoseis</router-link> |
    <router-link to="/orders">Tellimused</router-link> |
  </nav>
  <button v-on:click="navigateToFoodInput">Sisesta uus kaubarida
  </button>
  <br>
  <br>
  <button v-on:click="navigateToStock">Vaata laoseisu</button>
  <br>
  <br>
  <button v-on:click="navigateToOrders">Vaata tellimusi</button>
</div>
</template>

<script>
export default {
  name: "ShopView",
  methods: {
    navigateToFoodInput: function () {
      this.$router.push({name: 'foodInputRoute'})
    },
    navigateToStock: function () {
      this.$router.push({name: 'stockRoute'})
    },
    navigateToOrders: function () {
      this.$router.push({name: 'ordersRoute'})
    },
  }
}
</script>

<style scoped>

</style>