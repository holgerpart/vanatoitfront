<template>
  <div>
    <div>
      <button class="nav-button active">Admin</button>
      <button class="nav-button" @click="navigateToShop">Poe vaade</button>
      <button class="nav-button" @click="navigateToUser">Kliendivaade</button>
      <button class="nav-button" @click="navigateToFoodInput">Kaubarea sisestus</button>
      <button class="nav-button" @click="navigateToStock">Laoseis</button>
      <button class="nav-button" @click="navigateToOrders">Tellimused</button>
      <button class="nav-button" @click="navigateToLogin">Logi välja</button>
    </div>
    <h1>AdminView</h1>
    <div v-if="displayUpdate === false" class="input">
      <input type="text" placeholder="Poe nimi" v-model="shopName">
      <br>
      <br>
      <input type="text" placeholder="Aadress" v-model="aadress">
      <br>
      <br>
      <input type="text" placeholder="Telefoni number" v-model="telNumber">
      <br>
      <br>
      <input type="text" placeholder="Pikkuskraad" v-model="longitude">
      <br>
      <input type="text" placeholder="Laiuskraad" v-model="latitude">
      <br>
      <input type="text" placeholder="Linn" v-model="cityName">
      <br>
      <div>
        <button class="small-button" @click="inputShop">Sisesta</button>
      </div>
    </div>


    <div>
      <br>
      <div id="example-table">
      <table style="width:100%">
        <caption>Poodide nimekiri</caption>
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Poe nimi</th>
          <th scope="col">Aadress</th>
          <th scope="col">Telefoninumber</th>
          <th scope="col">Linn</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="shop in shops">

          <th scope="row">{{ shop.id }}</th>
          <td>{{ shop.name }}</td>
          <td>{{ shop.aadress }}</td>
          <td>{{ shop.telNumber }}</td>
          <td>{{ shop.cityName }}</td>
          <td>
            <button class="small-button" v-on:click="selectShopId(shop.id)">Muuda poe andmeid</button>
          </td>

        </tr>
        </tbody>
      </table>
      </div>
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
      shopName: null,
      aadress: null,
      telNumber: null,
      longitude: null,
      latitude: null,
      cityName: null,
      shops: {},
      displayUpdate: false,
      userId: sessionStorage.getItem('userId')

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
    navigateToShop: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('shopName', this.shopName)
      this.$router.push({name: 'shopRoute'})
    },
      navigateToUser: function () {
        sessionStorage.setItem('shopId', this.shopId)
        sessionStorage.setItem('userId', this.userId)
        this.$router.push({name: 'userRoute'})
      },

    navigateToLogin: function () {
      this.$router.push({name: 'loginRoute'})
    },

  },
  mounted() {
    this.getShops()
  }


}

</script>


<style scoped>

</style>