<template>
  <div>
    <div class="navbar">
      <button class="active">Poe vaade</button>
      <button @click="navigateToUser">Kliendivaade</button>
      <button @click="navigateToFoodInput">Kaubarea sisestus</button>
      <button @click="navigateToStock">Laoseis</button>
      <button @click="navigateToOrders">Tellimused</button>
    </div>
    <h2>
      Vali pood
    </h2>
    <div>
      <button @click="navigateToUser">Mine üle Kliendi rollile</button>
    </div>
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
.navbar {
  width: 100%;
  background-color: #555;
  overflow: auto;
}

/* Navigation links */
.navbar button {
  float: left;
  padding: 12px;
  color: black;
  text-decoration: none;
  font-size: 17px;
  width: 20%; /* Four equal-width links. If you have two links, use 50%, and 33.33% for three links, etc.. */
  text-align: center; /* If you want the text to be centered */
}

/* Add a background color on mouse-over */
.navbar button:hover {
  background-color: #000;
  color: white;

}

/* Style the current/active link */
.navbar button.active {
  background-color: #04AA6D;
}

/* Add responsiveness - on screens less than 500px, make the navigation links appear on top of each other, instead of next to each other */
@media screen and (max-width: 500px) {
  .navbar button {
    float: none;
    display: block;
    width: 100%;
    text-align: left; /* If you want the text to be left-aligned on small screens */
  }
}

</style>