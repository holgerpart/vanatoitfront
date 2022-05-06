<template>
<div>
  <div>
    <h3>
      Poe id: {{ shopId }}
      <br>
      Pood: {{ shopName }}
    </h3>
  </div>
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
        <th scope="col">Valik</th>
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
        <td><button v-on:click="selectFoodId(shopFood.id)" >Muuda kogust</button></td>

      </tr>
      </tbody>
    </table>
  </div>
  <div>
    <button v-on:click="navigateToStockInput">Sisesta uus kaubarida
    </button>
    <button v-on:click="navigateToOrders">Vaata tellimusi</button>
    <input v-if="displayUpdate" type="text" placeholder="Uus kogus" v-model="newQuantity">
    <button v-if="displayUpdate" v-on:click="confirmUpdate">Kinnita</button>
<!--    <div v-if="shopFoodSelection">-->
<!--      <button v-on:click="navigateToShopFoodUpdate">Muuda kaubarida</button>-->
<!--    </div>-->
  </div>
</div>
</template>

<script>
export default {
  name: "StockView",
  data: function () {
    return {
    shopFoods: {},
      shopId: sessionStorage.getItem('shopId'),
      userId: sessionStorage.getItem('userId'),
      shopName: sessionStorage.getItem('shopName'),
      shopFoodId: null,
      shopFoodSelection: false,
      newQuantity: null,
      displayUpdate: false


    }
  },
  methods: {
    selectFoodId: function (id) {
      this.shopFoodId = id
      // this.shopFoodSelection = true
      sessionStorage.setItem('shopFoodId', this.shopFoodId)

        this.displayUpdate = true;

    },

    getStock: function () {
        this.$http.get("/stock/all", {
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
    navigateToStockInput: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('shopName', this.shopName)
      this.$router.push({name: 'StockInputRoute'})
    },
    navigateToStockUpdate: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('shopName', this.shopName)
      sessionStorage.setItem('shopFoodId', this.shopFoodId)
      this.$router.push({name: 'StockUpdateRoute'})
    },
    navigateToOrders: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('shopName', this.shopName)
      this.$router.push({name: 'ordersRoute'})
    },
    confirmUpdate: function () {
      let stockRequest = {
        foodId: this.shopFoodId,
        quantity: this.newQuantity
      }
      // if using alternative then remove "this." from someDtoObject
      this.$http.post("/stock/stock", stockRequest
      ).then(response => {
        console.log(response.data)
        this.getStockById()
        this.displayUpdate = false
      }).catch(error => {
        console.log(error)
      })
    },
    getStockById: function () {
        this.$http.get("/stock/shopid", {
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