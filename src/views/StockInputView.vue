<template>
<div>
  <div class="navbar">
    <button  href="#">Koduleht</button>
    <button @click="navigateToUser">Kliendivaade</button>
    <button class="active" @click="navigateToStockInput">Kaubarea sisestus</button>
    <button @click="navigateToStock">Laoseis</button>
    <button  @click="navigateToOrders">Tellimused</button>
  </div>
  <div>
    <h3>
      Poe id: {{ shopId }}
      <br>
      Pood: {{ shopName }}
    </h3>
  </div>
  <div>

    <br>
    <br>
<!--    <input type="text" placeholder="Toidu Id" v-model="foodId">-->
    <select v-model="foodId">
      <option value="0" disabled selected>Vali toiduaine</option>
      <option v-for="article in articles" :value="article.id">{{ article.name }}</option>
    </select>
    <br>
    <br>
    <input type="text" placeholder="Kogus" v-model="quantity">
    <br>
    <br>
    <input type="date" placeholder="Kõlblik kuni" v-model="expirationDate">Kõlblik kuni
    <br>
    <br>
    <input type="text" placeholder="Kommentaarid" v-model="comments">
    <br>
    <br>
<!--    <input type="text" placeholder="Ühik" v-model="unit">-->
    <select v-model="unit">
      <option value="0" disabled selected>Vali ühik</option>
      <option value="kg">kg</option>
      <option value="pcs">pcs</option>
    </select>
  </div>
  <div>
    <button v-on:click="inputShopFood" >
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
      articles:{}
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

    },
  mounted() {
    this.getArticles()
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