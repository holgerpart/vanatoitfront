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
            <input v-on:change="selectName(shop.shopName)" type="radio" v-model="shopId"
                   :value="shop.shopId">{{ shop.shopName }}
          </li>
        </ul>
      </section>
    </div>


<!--    <nav>-->
<!--      <router-link to="/food-input">Kaubarea sisestus</router-link>-->
<!--      |-->
<!--      <router-link to="/stock">Laoseis</router-link>-->
<!--      |-->
<!--      <router-link to="/orders">Tellimused</router-link>-->
<!--      |-->
<!--    </nav>-->
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
      shopId: null,
      shopName: ''

    }
  },
  methods: {
    selectName: function (name) {
      this.shopName = name
    },
    getAuthorizedShops: function () {
      this.$http.get("/food/shops", {
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
      this.$router.push({name: 'ShopFoodInputRoute'})
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