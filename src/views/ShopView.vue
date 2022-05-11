<template>
  <div>
    <div class="navbar">
      <button class="active">Poe vaade</button>
      <button @click="navigateToUser">Kliendivaade</button>
      <button @click="navigateToFoodInput">Kaubarea sisestus</button>
      <button @click="navigateToStock">Laoseis</button>
      <button @click="navigateToOrders">Tellimused</button>
    </div>
    <div class="shop">
      <h3>Vali pood</h3>
    </div>
    <div v-if="true">
      <section>

        <ul >
          <li v-for="shop in shops">
            <input class="select" v-on:change="selectName(shop.shopName)" type="radio" v-model="shopId"
                   :value="shop.shopId">{{ shop.shopName }}
          </li>
        </ul>
      </section>
    </div>


    <button class="small-button" v-on:click="navigateToFoodInput">Sisesta uus kaubarida
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
      shopId: null,
      shopName: ''

    }
  },
  methods: {
    navigateToUser: function () {
      this.$router.push({name: 'userRoute'})
    },
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
  }
  , mounted() {
    this.getAuthorizedShops()
  }
}
</script>

<style scoped>

</style>