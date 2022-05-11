<template>
  <div>
    <div class="navbar">
      <button class="active" @click="navigateToUser">Kliendivaade</button>
    </div>
    <div>
      <div class="input">
        <h3>Kaupade otsing</h3>
        <select v-model="foodName">
          <option value="0" disabled selected>Vali toode</option>
          <option v-for="article in articles" :value="article.name">{{article.name}}</option>
        </select>
        <button v-on:click="getByName">Otsi</button>

        <select v-model="foodType">
          <option value="0" disabled selected>Vali tootegrupp</option>
          <option v-for="type in types" :value="type.name">{{type.name}}</option>
        </select>
        <button v-on:click="getByFoodType">Otsi</button>

        <input type="text" placeholder="Pood" v-model="shop">
        <button v-on:click="getByShop">Otsi</button>

        <input type="text" placeholder="Linn" v-model="city">
        <button v-on:click="getByCity">Otsi</button>
      </div>

      <div>
        <div v-if="tableDisplay">
          <table v-if="displayUpdate === false" style="width:100%">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Pood</th>
              <th scope="col">Toit</th>
              <th scope="col">Kogus</th>
              <th scope="col">Ühik</th>
              <th scope="col">Kuupäev</th>
              <th scope="col">Kommentaarid</th>
              <th scope="col">Valik</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="shopFood in shopFoods">
              <th scope="row">{{ shopFood.id }}</th>
              <th scope="row">{{ shopFood.shopName }}</th>
              <td>{{ shopFood.foodName }}</td>
              <td>{{ shopFood.quantity }}</td>
              <td>{{ shopFood.unitName }}</td>
              <td>{{ shopFood.dateTime }}</td>
              <td>{{ shopFood.comments }}</td>
              <td>
                <button v-if="displayUpdate === false" v-on:click="selectFoodId(shopFood)">Broneeri</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <table v-if="displayUpdate" style="width:100%">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Pood</th>
            <th scope="col">Toit</th>
            <th scope="col">Kogus</th>
            <th scope="col">Ühik</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th scope="row">{{ shopFoodId }}</th>
            <th scope="row">{{ shopName }}</th>
            <td>{{ foodName }}</td>
            <td>{{ quantity }}</td>
            <td>{{ unitName }}</td>
          </tr>
          </tbody>
        </table>
        <input v-if="displayUpdate" type="text" placeholder="Uus kogus" v-model="newQuantity">
        <button v-if="displayUpdate" v-on:click="newBooking">Kinnita</button>
        <button v-if="displayUpdate" v-on:click="reverseDisplay">Tühista</button>
      </div>
    </div>
    <div>
      <div>
        <button v-on:click="showOrders">Näita tellimusi</button>
      </div>
      <div v-if="orderDisplay">
        <table style="width:100%">
          <thead>
          <tr>
            <th>#</th>
            <th>Eesnimi</th>
            <th>Perekonnanimi</th>
            <th>Pood</th>
            <th>Toiduartikkel</th>
            <th>Kogus</th>
            <th>Staatus</th>
            <th scope="col">Valik</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="order in orders">
            <td>{{ order.id }}</td>
            <td>{{ order.firstName }}</td>
            <td>{{ order.lastName }}</td>
            <td>{{ order.shopName }}</td>
            <td>{{ order.foodName }}</td>
            <td>{{ order.quantity }}</td>
            <td>{{ order.status }}</td>
            <td>
              <button v-if="displayUpdate === false" v-on:click="selectOrder(order)">Muuda</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-if="orderDisplayUpdate">
      <table style="width:100%">
        <thead>
        <tr>
          <th>#</th>
          <th>Eesnimi</th>
          <th>Perekonnanimi</th>
          <th>Pood</th>
          <th>Toiduartikkel</th>
          <th>Kogus</th>
          <th>Staatus</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{ id }}</td>
          <td>{{ firstName }}</td>
          <td>{{ lastName }}</td>
          <td>{{ shopName }}</td>
          <td>{{ foodName }}</td>
          <td>{{ quantity }}</td>
          <td>{{ status }}</td>
        </tr>
        </tbody>
      </table>
      <input type="text" placeholder="Uus kogus" v-model="newQuantity">
      <button v-on:click="confirmUpdate">Kinnita</button>

        <select v-model="statusName">
          <option disabled value="">Valige roll</option>
          <option>Completed</option>
          <option>Cancelled</option>
          <option>Open</option>
        </select>
        <button v-on:click="confirmStatus">Kinnita</button>
        <button v-on:click="reverseOrderDisplay">Tühista</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserView",
  data: function () {
    return {
      shopId: sessionStorage.getItem('shopId'),
      userId: sessionStorage.getItem('userId'),
      shopName: sessionStorage.getItem('shopName'),
      foodName: '',
      foodType: '',
      shop: '',
      city: '',
      shopFoods: {},
      newQuantity: null,
      statusName: '',
      status: '',
      displayUpdate: false,
      tableDisplay: false,
      shopFoodId: null,
      quantity: null,
      usedMethod: this.getByName,
      orders: {},
      unitName: '',
      orderDisplay: false,
      orderDisplayUpdate: false,
      firstName: '',
      lastName: '',
      id: '',
      articles:{},
      types:{}
    }
  },
  methods: {
    getArticles: function () {
      this.$http.get("/stock/articles")
          .then(response => {
            this.articles = response.data
            console.log(response.data)
          }).catch(error => {
        console.log(error)
      })
    },
    getTypes: function () {
      this.$http.get("/stock/types")
          .then(response => {
            console.log(response.data)
            this.types = response.data
          }).catch(error => {
        console.log(error)
      })
    },
    getByName: function () {
      this.tableDisplay = true
      this.$http.get("/stock/articlename", {
        params: {
          article: this.foodName
        }
      })
          .then(response => {
            console.log(response.data)
            this.shopFoods = response.data
            sessionStorage.setItem('usedMethod', 'getByName')
          }).catch(error => {
        alert(error)
      })
    },
    getByFoodType: function () {
      this.tableDisplay = true
      this.$http.get("/stock/typename", {
            params: {
              type: this.foodType
            }
          }
      ).then(response => {
        this.shopFoods = response.data
        console.log(response.data)
        sessionStorage.setItem('usedMethod', 'getByFoodType')

      }).catch(error => {
        console.log(error)
      })
    },
    getByShop: function () {
      this.tableDisplay = true
      this.$http.get("/stock/all", {
            params: {
              shop: this.shop
            }
          }
      ).then(response => {
        this.shopFoods = response.data
        console.log(response.data)
        sessionStorage.setItem('usedMethod', 'getByShop')
      }).catch(error => {
        console.log(error)
      })
    },
    getByCity: function () {
      this.tableDisplay = true
      this.$http.get("/stock/cityname", {
            params: {
              city: this.city
            }
          }
      ).then(response => {
        this.shopFoods = response.data
        console.log(response.data)
        sessionStorage.setItem('usedMethod', 'getByCity')

      }).catch(error => {
        console.log(error)
      })
    },
    selectFoodId: function (id) {
      this.shopFoodId = id.id
      this.articleName = id.foodName
      this.quantity = id.quantity
      this.unitName = id.unitName
      sessionStorage.setItem('shopFoodId', this.shopFoodId)
      this.displayUpdate = true;
    },

    newBooking: function () {
      // ALTERNATIVE
      let request = {
        userId: this.userId,
        shopFoodId: this.shopFoodId,
        quantity: this.newQuantity
      }

      this.$http.post("/order/bookfood", request
      ).then(response => {
        console.log(response.data)
        this.usedMethod()
        this.displayUpdate = false
      }).catch(error => {
        console.log(error)
        alert(error.response.data.detail)
      })
    },
    showOrders: function () {
      this.orderDisplay = true
      this.$http.get(" order/customerfoods", {
            params: {
              userId: this.userId
            }
          }
      ).then(response => {
        this.orders = response.data
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })

    },
    selectOrder: function (id) {
      this.id = id.id
      this.firstName = id.firstName
      this.lastName = id.lastName
      this.foodName = id.foodName
      this.quantity = id.quantity
      this.status = id.status
      sessionStorage.setItem('orderId', this.orderId)
      this.orderDisplayUpdate = true
      this.orderDisplay = false


    },
    confirmUpdate: function () {
      let orderRequest = {
        orderId: this.orderId,
        quantity: this.newQuantity
      }
      this.$http.post("/order/updateorder", orderRequest
      ).then(response => {
        console.log(response.data)
        this.showOrders()
        this.displayUpdate = false
        this.orderDisplay = true
      }).catch(error => {
        console.log(error)
        alert(error)
      })
    },
    confirmStatus: function () {
      let orderRequest = {
        orderId: this.id,
        statusName: this.statusName
      }
      this.$http.post("/order/status", orderRequest
      ).then(response => {
        console.log(response.data)
        this.showOrders()
        this.reverseOrderDisplay()
        this.displayUpdate = false
      }).catch(error => {
        console.log(error)
      })
    },
    getOrderList: function () {
      this.$http.get("/order/foods", {
        params: {
          shopId: this.shopId
        }
      })
          .then(response => {
            console.log(response.data)
            this.orders = response.data
          }).catch(error => {
        console.log(error)
      })
    },
    reverseDisplay: function () {
      this.displayUpdate = !this.displayUpdate
    },
    reverseOrderDisplay: function () {
      this.orderDisplayUpdate =  false
      this.orderDisplay = true
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
  },
  mounted() {
    this.getArticles();
    this.getTypes()
  }
}
</script>

<style scoped>
table, th, td {
  /*border: 1px solid black;*/
  border-collapse: collapse;
  /*background-color: beige;*/
  /*border-radius: 10px;*/
  border-bottom-style: ridge;
  padding: 15px;
  /*border-spacing: 30px;*/
}

tr:hover {
  background-color: bisque;
}

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

.input {
  display: inline-block;
  margin: 50px;
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