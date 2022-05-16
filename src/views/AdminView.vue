<template>
  <div v-if="roleId === '3'">
    <div>
      <button class="active">Admin</button>
      <button class="nav-button" @click="navigateToShop">Poe vaade</button>
      <button class="nav-button" @click="navigateToUser">Kliendivaade</button>
      <button class="nav-button" @click="navigateToFoodInput">Kaubarea sisestus</button>
      <button class="nav-button" @click="navigateToStock">Laoseis</button>
      <button class="nav-button" @click="navigateToOrders">Tellimused</button>
      <button class="nav-button" @click="navigateToAddShop">Poe lisamine</button>
      <button class="nav-button" @click="navigateToLogin">Logi välja</button>
    </div>
    <div class="shop">
      <h3>Vali pood</h3>
    </div>
    <div v-if="true">
      <ul>
        <li class="radio" v-for="shop in shops">
          <input v-on:change="selectName(shop.shopName)" type="radio" v-model="shopId"
                 :value="shop.shopId">{{ shop.shopName }}
        </li>
      </ul>
    </div>
    <div v-if="displayUpdate">
      <input  type="text" placeholder="Uus poe nimi" v-model="shopName">
      <input  type="text" placeholder="Uus aadress" v-model="aadress">
      <input  type="text" placeholder="Uus telefoninumber" v-model="telNumber">
      <input  type="text" placeholder="Uus linn" v-model="cityName">
      <button class="small-button" v-on:click="updateShop">Kinnita</button>
      <button class="small-button" v-on:click="cancelUpdate">Tühista</button>
    </div>

  </div>
</template>

<script>

export default {
  name: "AdminView",
  data: function () {
    return {
      shopName: '',
      aadress: null,
      telNumber: null,
      longitude: null,
      latitude: null,
      cityName: null,
      shops: {},
      displayUpdate: false,
      userId: sessionStorage.getItem('userId'),
      shopId: sessionStorage.getItem('shopId'),
      roleId: sessionStorage.getItem('roleId')


    }
  },
  methods: {
    cancelUpdate: function (id) {
      this.displayUpdate = false;
    },
    selectShopId: function (id) {
      this.shopId = id
      sessionStorage.setItem('shopId', this.shopId)
      this.displayUpdate = true;
    },
    inputShop: function () {
      let shopRequest = {
        shopName: this.shopName,
        aadress: this.aadress,
        telNumber: this.telNumber,
        longitude: this.longitude,
        latitude: this.latitude,
        cityName: this.cityName
      }
      this.$http.post("/log-in/shop", shopRequest
      ).then(response => {
        this.getShops()

      }).catch(error => {
        alert("Error")
      })
    },
    updateShop: function () {
      let updateRequest = {
        id: this.shopId,
        shopName: this.shopName,
        aadress: this.aadress,
        telNumber: this.telNumber,
        cityName: this.cityName
      }
      this.$http.post("/log-in/update", updateRequest
      ).then(response => {
        this.getShops()

      }).catch(error => {
        alert("Error")
      })
    },
    getShops: function () {
      this.$http.get("/log-in/all")
          .then(response => {
            this.shops = response.data
            console.log(response.data)
          }).catch(error => {
        console.log(error)
      })
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
    navigateToFoodInput: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('shopName', this.shopName)
      sessionStorage.setItem('roleId', this.roleId)
      this.$router.push({name: 'StockInputRoute'})
    },
    navigateToStock: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('shopName', this.shopName)
      sessionStorage.setItem('roleId', this.roleId)
      this.$router.push({name: 'stockRoute'})

    },
    navigateToOrders: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('shopName', this.shopName)
      sessionStorage.setItem('roleId', this.roleId)
      this.$router.push({name: 'ordersRoute'})
    },
    navigateToShop: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('shopName', this.shopName)
      sessionStorage.setItem('roleId', this.roleId)
      this.$router.push({name: 'shopRoute'})
    },
      navigateToUser: function () {
        sessionStorage.setItem('shopId', this.shopId)
        sessionStorage.setItem('userId', this.userId)
        sessionStorage.setItem('roleId', this.roleId)
        this.$router.push({name: 'userRoute'})
      },

    navigateToLogin: function () {
      this.$router.push({name: 'loginRoute'})
    },
    navigateToAddShop: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('userId', this.userId)
      sessionStorage.setItem('shopName', this.shopName)
      sessionStorage.setItem('roleId', this.roleId)
      this.$router.push({name: 'addShopRoute'})
    },
    selectName: function (name) {
      this.shopName = name
    },

  },
  mounted() {
    this.getAuthorizedShops()
  }


}
</script>

<style scoped>

</style>