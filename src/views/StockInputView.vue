<template>
<div>
  <div>
    <button class="nav-button" @click="navigateToShop">Poe vaade</button>
    <button class="nav-button" @click="navigateToUser">Kliendivaade</button>
    <button class="active">Kaubarea sisestus</button>
    <button class="nav-button" @click="navigateToStock">Laoseis</button>
    <button class="nav-button"  @click="navigateToOrders">Tellimused</button>
    <button class="nav-button" @click="navigateToLogin">Logi välja</button>
  </div>
  <div class="shop">
    <h3>
      Pood: {{ shopName }}
      <button class="nav-button" @click="navigateToShop">Vaheta kauplus</button>
    </h3>
  </div>
  <div class="input">
    <select class="select" v-model="foodId">
      <option  value="" disabled selected hidden>Vali toiduaine</option>
      <option v-for="article in articles" :value="article.id">{{ article.name }}</option>
    </select>
    <input class="select" type="text" placeholder="Kogus" v-model="quantity">
    <input class="date" type="date" placeholder="Kõlblik kuni" v-model="expirationDate">Kõlblik kuni
    <input class="select" type="text" placeholder="Kommentaarid" v-model="comments">
    <select class="select" v-model="unit">
      <option value="0" disabled selected>Vali ühik</option>
      <option value="kg">kg</option>
      <option value="pcs">pcs</option>
    </select>
  </div>
  <div>
    <button class="small-button" v-on:click="inputShopFood" >
      Sisesta
    </button>
  </div>
</div>
</template>

<script>
export default {
  name: "FoodInputView",
  data: function () {
    return {
      shopId: sessionStorage.getItem('shopId'),
      userId: sessionStorage.getItem('userId'),
      shopName: sessionStorage.getItem('shopName'),
      foodId:null,
      quantity:null,
      expirationDate:null,
      comments:null,
      unit:null,
      articles:{},
      shops:{},

    }
  },
  methods:{
    getArticles: function () {
      this.$http.get("/stock/articles")
          .then(response => {
            this.articles = response.data
            console.log(response.data)
          }).catch(error => {
        console.log(error)
      })
    },
    inputShopFood: function () {
      let shopFoodRequest = {
      shopId:this.shopId,
      foodId:this.foodId,
      quantity:this.quantity,
      comments:this.comments,
      unit:this.unit
    }

        // if using alternative then remove "this." from someDtoObject
        this.$http.post("/stock", shopFoodRequest
        ).then(response => {

          console.log(response.data)
          this.$router.push({name: 'stockRoute'})
        }).catch(error => {
          console.log(error)
          alert(error.response.data.detail)
        })
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
    navigateToUser: function () {
      this.$router.push({name: 'userRoute'})
    },
    navigateToStock: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('shopName', this.shopName)
      this.$router.push({name: 'stockRoute'})

    },
    navigateToShop: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('shopName', this.shopName)
      this.$router.push({name: 'shopRoute'})

    },
    selectName: function (name) {
      this.shopName = name
    },
    navigateToLogin: function () {
      this.$router.push({name: 'loginRoute'})
    },
  },

  mounted() {
    this.getArticles()
  },


}
</script>

<style scoped>

</style>