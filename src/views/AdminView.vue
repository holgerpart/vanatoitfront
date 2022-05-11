<template>
  <div>
    <h1>AdminView</h1>
    <div class ="navbar">
      <div>

        <select v-model="shopId">
          <option value="0" disabled selected>Vali kauplus</option>
          <option v-for="shop in shops" :value="shop.id">{{shop.name}}</option>
        </select>
        <br>
        <br>
        <br>

      </div>
      <button @click="navigateToUser">Kliendivaade</button>
      <button @click ="navigateToShopView">Poevaade</button>
      <button @click="navigateToFoodInput">Kaubarea sisestus</button>
      <button @click="navigateToStock">Laoseis</button>
      <button @click="navigateToOrders">Tellimused</button>
      <button @click="navigateToShops">Uue poe lisamine</button>

    </div>
  </div>

</template>

<script>

export default {
  name: "AdminView",
  data: function () {
    return {
      shopName:'',
      aadress: null,
      telNumber: null,
      longitude: null,
      latitude: null,
      cityName: null,
      shops: {},
      displayUpdate: false,
      shopId: null,
      userId: sessionStorage.getItem('userId')

    }
  },
  methods: {
    navigateToUser: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('userId', this.userId)
      this.$router.push({name: 'userRoute'})
    },
    navigateToShopView: function(){
      this.$router.push({name:'shopRoute'})
    },
    selectName: function (name) {
      this.shopName = name
    },
    navigateToFoodInput: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('shopName', this.shopName)
      this.$router.push({name: 'StockInputRoute'})
    },
    navigateToStock: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('shopName', this.shopName)
      this.$router.push({name: 'stockRoute'})

    },
    navigateToOrders: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('shopName', this.shopName)
      this.$router.push({name: 'ordersRoute'})
    },
    navigateToShops: function () {
      this.$router.push({name: 'shopsRoute'})
    },
    getAuthorizedShops: function () {
      this.$http.get("/stock/shops", {
            params: {
              userId: this.userId
            }
          }
      ).then(response => {
        this.shops = response.data
        this.shopId = response.data[0].shopId
        this.shopName = response.data[0].shopName
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    getShops: function () {
      this.$http.get("/log-in/all")
          .then(response => {
            console.log(response.data)
            this.shops = response.data
          }).catch(error => {
        console.log(error)
      })
    }

  },
  mounted() {
    this.getShops()
  }


}
</script>

<style scoped>
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