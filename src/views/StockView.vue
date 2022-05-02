<template>
<div>
  <nav>
    <router-link to="/food-input">Kaubarea sisestus</router-link> |
    <router-link to="/stock">Laoseis</router-link> |
    <router-link to="/orders">Tellimused</router-link> |
  </nav>
  <div>

  </div>
</div>
</template>

<script>
export default {
  name: "StockView",
  data: function () {
    return {
    shopName: 'tondi selver',
    shopFoods: ''
    }
  },
  methods: {
    getStock: function () {
        this.$http.get("/food/all", {
          params: {
            shopName: this.shopName
          }
        })
            .then(response => {
              console.log(response.data)
              alert('Success')
              this.shopFoods = response.data
            }).catch(error => {
          alert(error)
        })
      }
    },
  mounted() {
    this.getStock()
  }
}
</script>

<style scoped>

</style>