<template>
<div>
  <nav>
    <router-link to="/food-input">Kaubarea sisestus</router-link> |
    <router-link to="/stock">Laoseis</router-link> |
    <router-link to="/orders">Tellimused</router-link> |
  </nav>
  <div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Poe Id</th>
        <th scope="col">Toidu Id</th>
        <th scope="col">Toit</th>
        <th scope="col">Kogus</th>
        <th scope="col">Ühiku Id</th>
        <th scope="col">Ühik</th>
        <th scope="col">Kuupäev</th>
        <th scope="col">Kehtivus</th>
        <th scope="col">Kommentaarid</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="shopFood in shopFoods">
        <th scope="row">{{ shopFood.id }}</th>
        <td>{{ shopFood.shopId }}</td>
        <td>{{ shopFood.foodId }}</td>
        <td>{{ shopFood.foodName }}</td>
        <td>{{ shopFood.quantity }}</td>
        <td>{{ shopFood.unitId }}</td>
        <td>{{ shopFood.unitName }}</td>
        <td>{{ shopFood.dateTime }}</td>
        <td>{{ shopFood.expirationDate }}</td>
        <td>{{ shopFood.comments }}</td>
        <td><button type="button" class="btn btn-outline-dark" v-on:click="navigateToAccountsInfo(customer.id)">Vaata kontosid</button></td>
        <td><button type="button" class="btn btn-dark" v-on:click="navigateToAccountsInfo(customer.id)">Muuda</button></td>
      </tr>

      </tbody>
    </table>
  </div>
</div>
</template>

<script>
export default {
  name: "StockView",
  data: function () {
    return {
    shopName: '',
    shopFoods: {},
      shopId: sessionStorage.getItem('shopId')
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
      },
    getStockById: function () {
        this.$http.get("/food/shopid", {
          params: {
            shopId: this.shopId
          }
        })
            .then(response => {
              console.log(response.data)
              this.shopFoods = response.data
            }).catch(error => {
          alert(error)
        })
      }
    },
  mounted() {
    this.getStockById()
  }
}
</script>

<style scoped>

</style>