<template>
  <div>

    <h2>
      Vali pood
    </h2>
    <div v-if="true">
      <section>
        <h3>vali konto</h3>
        <ul class="list-group">
          <li class="list-group-item" v-for="shop in shops">
            <input v-on:click="chooseShop" type="radio" v-model="shopId" :value="shop.shopId">{{ shop.shopName }}
          </li>
        </ul>
      </section>
    </div>


    <nav>
      <router-link to="/food-input">Kaubarea sisestus</router-link>
      |
      <router-link to="/stock">Laoseis</router-link>
      |
      <router-link to="/orders">Tellimused</router-link>
      |
    </nav>
    <button v-on:click="navigateToFoodInput">Sisesta uus kaubarida
    </button>
    <br>
    <br>
    <button v-on:click="navigateToStock">Vaata laoseisu</button>
    <br>
    <br>
    <button v-on:click="navigateToOrders">Vaata tellimusi</button>
  </div>
</template>

<script>
export default {
  name: "ShopView",
  data: function () {
    return {
      userId: sessionStorage.getItem('userId'),
      shops: {},
      shopId: null

    }
  },
  methods: {
    getAuthorizedShops: function () {
      this.$http.get("/food/shops", {
            params: {
              userId: this.userId
            }
          }
      ).then(response => {
        this.shops = response.data
        this.shopId = response.data[0].shopId
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },

    chooseShop: function () {
      sessionStorage.setItem('shopId', this.shopId)
    },

    navigateToFoodInput: function () {
      this.$router.push({name: 'foodInputRoute'})
    },
    navigateToStock: function () {
      this.$router.push({name: 'stockRoute'})
    },
    navigateToOrders: function () {
      this.$router.push({name: 'ordersRoute'})
    },
  }
  ,mounted() {
    this.getAuthorizedShops()
  }
}
</script>

<style scoped>

</style>