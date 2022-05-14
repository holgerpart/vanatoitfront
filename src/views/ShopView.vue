<template>
  <div>
    <div>
      <button v-if="roleId === '3'" class="nav-button" @click="navigateToAdmin">Admin</button>
      <button class="active">Poe vaade</button>
      <button class="nav-button" @click="navigateToUser">Kliendivaade</button>
      <button class="nav-button" @click="navigateToStockInput">Kaubarea sisestus</button>
      <button class="nav-button" @click="navigateToStock">Laoseis</button>
      <button class="nav-button" @click="navigateToOrders">Tellimused</button>
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


    <button class="small-button" v-on:click="navigateToStockInput">Sisesta uus kaubarida
    </button>
    <br>
    <br>
    <button class="small-button" v-on:click="navigateToStock">Vaata laoseisu</button>
    <br>
    <br>
    <button class="small-button" v-on:click="navigateToOrders">Vaata tellimusi</button>
  </div>
</template>

<script>
export default {
  name: "ShopView",
  data: function () {
    return {
      userId: sessionStorage.getItem('userId'),
      shops: {},
      shopId: sessionStorage.getItem('shopId'),
      roleId: sessionStorage.getItem('roleId'),
      shopName: sessionStorage.getItem('shopName'),


    }
  },
  methods: {

    selectName: function (name) {
      this.shopName = name
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
    navigateToAdmin: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('shopName', this.shopName)
      sessionStorage.setItem('roleId', this.roleId)
      this.$router.push({name: 'adminRoute'})
    },
    navigateToUser: function () {
      sessionStorage.setItem('roleId', this.roleId)
      this.$router.push({name: 'userRoute'})
    },
    navigateToStockInput: function () {
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
  }
  , mounted() {
    this.getAuthorizedShops()
  }
}
</script>

<style scoped>

</style>