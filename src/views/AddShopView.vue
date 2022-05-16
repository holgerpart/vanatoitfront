<template>
  <div>
    <div>
      <button v-if="roleId === '3'" class="nav-button" @click="navigateToAdmin">Admin</button>
      <button class="active">Poe lisamine</button>
      <button class="nav-button" @click="navigateToShop">Poe vaade</button>
      <button class="nav-button" @click="navigateToUser">Kliendivaade</button>
      <button class="nav-button" @click="navigateToFoodInput">Kaubarea sisestus</button>
      <button class="nav-button" @click="navigateToStock">Laoseis</button>
      <button class="nav-button" @click="navigateToOrders">Tellimused</button>
      <button class="nav-button" @click="navigateToLogin">Logi välja</button>


    </div>
    <h1></h1>
    <div>
      <input class="select" type="text" placeholder="Poe nimi" v-model="newShopName">
      <br>
      <input class="select" type="text" placeholder="Aadress" v-model="aadress">
      <br>
      <input class="select" type="text" placeholder="Telefoni number" v-model="telNumber">
      <br>
<!--      <input class="select" type="text" placeholder="Pikkuskraad" v-model="longitude">-->
<!--      <br>-->
<!--      <input class="select" type="text" placeholder="Laiuskraad" v-model="latitude">-->
<!--      <br>-->
      <input class="select" type="text" placeholder="Linn" v-model="cityName">
      <div>
        <button class="small-button" @click="inputShop">Sisesta</button>
      </div>
    </div>


    <div>
      <br>
      <div class="shop"><h3>Poodide nimekiri</h3></div>

      <div id="example-table">
        <table style="width:75%">
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
      <input type="text" placeholder="Uus poe nimi" v-model="newShopName">
      <input type="text" placeholder="Uus aadress" v-model="aadress">
      <input type="text" placeholder="Uus telefoninumber" v-model="telNumber">
      <input type="text" placeholder="Uus linn" v-model="cityName">
      <button class="small-button" v-on:click="updateShop">Kinnita</button>
      <button class="small-button" v-on:click="cancelUpdate">Tühista</button>
    </div>

  </div>
</template>

<script>
export default {
  name: "AddShopView",
  data: function () {
    return {
      aadress: null,
      telNumber: null,
      longitude: null,
      latitude: null,
      cityName: null,
      shops: {},
      displayUpdate: false,
      userId: sessionStorage.getItem('userId'),
      shopId: sessionStorage.getItem('shopId'),
      shopName: sessionStorage.getItem('shopName'),
      newShopName: '',
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

    updateShop: function () {
      let updateRequest = {
        id: this.shopId,
        shopName: this.newShopName,
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

    inputShop: function () {
      let shopRequest = {
        shopName: this.newShopName,
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

    getShops: function () {
      this.$http.get("/log-in/all")
          .then(response => {
            this.shops = response.data
            console.log(response.data)
          }).catch(error => {
        console.log(error)
      })
    },
    navigateToUser: function () {
      sessionStorage.setItem('roleId', this.roleId)
      this.$router.push({name: 'userRoute'})
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
    navigateToAdmin: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('shopName', this.shopName)
      sessionStorage.setItem('roleId', this.roleId)
      this.$router.push({name: 'adminRoute'})
    },
    navigateToAddShop: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('userId', this.userId)
      sessionStorage.setItem('shopName', this.shopName)
      sessionStorage.setItem('roleId', this.roleId)
      this.$router.push({name: 'addShopRoute'})
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