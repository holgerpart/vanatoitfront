<template>
  <div>
    <div class="navbar">
      <button @click="navigateToShop">Poe vaade</button>
      <button @click="navigateToUser">Kliendivaade</button>
      <button @click="navigateToStockInput">Kaubarea sisestus</button>
      <button class="active" @click="navigateToStock">Laoseis</button>
      <button @click="navigateToOrders">Tellimused</button>
    </div>

      <div class="shop">
        <h3>
          Pood: {{ shopName }}
        </h3>
      </div>

    <div>
      <h3>

      </h3>
    </div>

    <div v-if="displayUpdate === false">
      <table style="width:100%">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Toit</th>
          <th scope="col">Kogus</th>
          <th scope="col">Ühik</th>
          <th scope="col">Kuupäev</th>
          <th scope="col">Kommentaarid</th>
          <th scope="col">Valik</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="shopFood in shopFoods">
          <th scope="row">{{ shopFood.id }}</th>
          <td>{{ shopFood.foodName }}</td>
          <td>{{ shopFood.quantity }}</td>
          <td>{{ shopFood.unitName }}</td>
          <td>{{ shopFood.dateTime }}</td>
          <td>{{ shopFood.comments }}</td>
          <td>
            <button class="small-button" v-if="displayUpdate === false" v-on:click="selectFoodId(shopFood)">Muuda kogust</button>
          </td>

        </tr>
        </tbody>
      </table>
    </div>
    <div>
      <button class="small-button" v-on:click="navigateToStockInput">Sisesta uus kaubarida
      </button>
      <button class="small-button" v-on:click="navigateToOrders">Vaata tellimusi</button>
      <table v-if="displayUpdate" style="width:100%">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Toit</th>
          <th scope="col">Kogus</th>
          <th scope="col">Ühik</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">{{ shopFoodId }}</th>
          <td>{{ articleName }}</td>
          <td>{{ quantity }}</td>
          <td>{{ unit }}</td>

        </tr>
        </tbody>
      </table>
      <input class="select" v-if="displayUpdate" type="text" placeholder="Uus kogus" v-model="newQuantity">
      <button class="small-button" v-if="displayUpdate" v-on:click="confirmUpdate">Kinnita</button>
      <button class="small-button" v-if="displayUpdate" v-on:click="reverseDisplay">Tühista</button>

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
      displayUpdate: false,
      articleName: '',
      quantity: null,
      unit: ''


    }
  },
  methods: {
    selectFoodId: function (id) {
      this.shopFoodId = id.id
      this.articleName = id.foodName
      this.quantity = id.quantity
      this.unit = id.unit
      sessionStorage.setItem('shopFoodId', this.shopFoodId)
      this.displayUpdate = true;
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
        alert(error.response.data.detail)
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
    },

    navigateToStockInput: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('shopName', this.shopName)
      this.$router.push({name: 'StockInputRoute'})
    },
    navigateToOrders: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('shopName', this.shopName)
      this.$router.push({name: 'ordersRoute'})
    },
    reverseDisplay: function () {
      this.displayUpdate = !this.displayUpdate
    },
    navigateToUser: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('shopName', this.shopName)
      this.$router.push({name: 'userRoute'})
    },
    navigateToStock: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('shopName', this.shopName)
      this.$router.push({name: 'stockRoute'})

    },
    navigateToShop: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('shopName', this.shopName)
      this.$router.push({name: 'shopRoute'})

    },

  },
  mounted() {
    this.getStockById()
  }
}
</script>

<style scoped>

</style>