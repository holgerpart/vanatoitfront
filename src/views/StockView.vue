<template>
<div>
  <div class="row">
    <div class="side">
      Poe id: {{ shopId }}
      <br>
      Pood: {{ shopName }}

    </div>
  </div>
  <div>
    <h3>

    </h3>
  </div>

  <div class="main">
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
        <th scope="row" >{{ shopFood.id }}</th>
        <td>{{ shopFood.foodName }}</td>
        <td>{{ shopFood.quantity }}</td>
        <td>{{ shopFood.unitName }}</td>
        <td>{{ shopFood.dateTime }}</td>
          <td>{{ shopFood.comments }}</td>
        <td><button v-if= "displayUpdate === false" v-on:click="selectFoodId(shopFood.id)" >Muuda kogust</button>
          <input v-if="displayUpdate" type="text" placeholder="Uus kogus" v-model="newQuantity">
          <button v-if="displayUpdate" v-on:click="confirmUpdate">Kinnita</button>
        </td>

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
      sessionStorage.setItem('shopFoodId', this.shopFoodId)
        this.displayUpdate = true;
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
.row {
  display: flex;
  flex-wrap: wrap;
}
.side {
  flex: 30%;
  background-color: beige;
  padding: 20px;
}

.main {
  flex: 70%;
  background-color: white;
  padding: 20px;
}

.navbar {
  display: flex;
  background-color: grey;
}
table, th, td {
  /*border: 1px solid black;*/
  border-collapse: collapse;
  /*background-color: beige;*/
  /*border-radius: 10px;*/
  border-bottom-style: ridge;
  padding: 15px;
  /*border-spacing: 30px;*/
}
tr:hover {
  background-color: bisque;
}
/*caption {*/
/*  font:;*/
/*}*/
input {
  text-align: center;
}
</style>