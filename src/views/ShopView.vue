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
    <div v-if="selectionDisplay">
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
      <br>
      <br>
      <button class="small-button" v-on:click="addArticleView">Lisa uus artikkel</button>
      <br>
      <br>
      <button class="small-button" v-on:click="addTypeView">Lisa uus kategooria</button>
    </div>
    <div v-if="articleDisplay">
      <div class="shop">
        <h3>Lisa uus artikkel</h3>
      </div>
      <input class="select" type="text" placeholder="Toiduartikli nimi" v-model="articleName">
      <input class="select" type="text" placeholder="Kategooria" v-model="typeName">
      <br>
      <button class="small-button" v-on:click="addNewArticle">Lisa</button>
      <button class="small-button" v-on:click="addArticleView">Tühista</button>

    </div>
    <div v-if="typeDisplay">
      <div class="shop">
        <h3>Lisa uus kategooria</h3>
      </div>
      <input class="select" type="text" placeholder="Kategooria nimi" v-model="typeName">
      <br>
      <button class="small-button" v-on:click="addNewType">Lisa</button>
      <button class="small-button" v-on:click="addTypeView">Tühista</button>

    </div>
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
      selectionDisplay: true,
      articleName: '',
      typeName: '',
      articleDisplay: false,
      typeDisplay: false,
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
    addNewArticle: function () {
      // ALTERNATIVE
      let request = {
        articleName: this.articleName,
        typeName: this.typeName,
      }

      // if using alternative then remove "this." from someDtoObject
      this.$http.post("/stock/article", request
      ).then(response => {
        console.log(response.data)
        this.addArticleView()
      }).catch(error => {
        console.log(error)
        alert(error.response.data.detail)
      })
    },
    addNewType: function () {
      this.$http.get("/stock/type", {
            params: {
              typeName: this.typeName
            }
          }
      ).then(response => {
        console.log(response.data)
        this.addTypeView()
      }).catch(error => {
        console.log(error)
        alert(error.response.data.detail)
      })
    },
    // addNewType: function () {
    //   let request = {
    //     typeName: this.typeName
    //   }
    //   this.$http.get("/stock/type", request
    //   ).then(response => {
    //     console.log(response.data)
    //     this.addTypeView()
    //   }).catch(error => {
    //     console.log(error)
    //     alert(error.response.data.detail)
    //   })
    // },
    addArticleView: function () {
      this.selectionDisplay = !this.selectionDisplay
      this.articleDisplay = !this.articleDisplay
    },
    addTypeView: function () {
      this.selectionDisplay = !this.selectionDisplay
      this.typeDisplay = !this.typeDisplay
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