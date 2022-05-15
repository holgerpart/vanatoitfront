<template>
  <div>
    <div>
      <button v-if="roleId === '3'" class="nav-button" @click="navigateToAdmin">Admin</button>
<!--      <button class="nav-button" @click="navigateToShop">Poe vaade</button>-->
      <button class="active">Kliendivaade</button>
      <button class="nav-button" @click="navigateToLogin">Logi välja</button>
<!--      <button @click="navigateToStockInput">Kaubarea sisestus</button>-->
<!--      <button @click="navigateToStock">Laoseis</button>-->
<!--      <button @click="navigateToOrders">Tellimused</button>-->
    </div>
    <div>
      <div class="shop">
        <h3>Kaupade otsing</h3>
      </div>

      <div>
        <select class="select" v-model="foodName">
          <option value="0" disabled selected>Vali toode</option>
          <option v-for="article in articles" :value="article.name">{{ article.name }}</option>
        </select>
        <button class="small-button" v-on:click="getByName">Otsi</button>

        <select class="select" v-model="foodType">
          <option value="0" disabled selected>Vali tootegrupp</option>
          <option v-for="type in types" :value="type.name">{{ type.name }}</option>
        </select>
        <button class="small-button" v-on:click="getByFoodType">Otsi</button>

        <input class="select" type="text" placeholder="Pood" v-model="shop">
        <button class="small-button" v-on:click="getByShop">Otsi</button>

        <input class="select" type="text" placeholder="Linn" v-model="city">
        <button class="small-button" v-on:click="getByCity">Otsi</button>
      </div>

      <div>
        <div v-if="tableDisplay">
          <table v-if="displayUpdate === false" style="width:75%">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Pood</th>
              <th scope="col">Toit</th>
              <th scope="col">Kogus</th>
              <th scope="col">Ühik</th>
<!--              <th scope="col">Kuupäev</th>-->
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
<!--              <td>{{ shopFood.dateTime }}</td>-->
              <td>{{ shopFood.comments }}</td>
              <td>
                <button class="small-button" v-if="displayUpdate === false" v-on:click="selectFoodId(shopFood)">Broneeri</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <table v-if="displayUpdate" style="width:75%">
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
        <input class="select" v-if="displayUpdate" type="text" placeholder="Uus kogus" v-model="newQuantity">
        <button class="small-button" v-if="displayUpdate" v-on:click="newBooking">Kinnita</button>
        <button class="small-button" v-if="displayUpdate" v-on:click="reverseDisplay">Tühista</button>
      </div>
    </div>
    <div>
      <div>
        <button class="small-button" v-on:click="showOrders">Näita tellimusi</button>
      </div>
      <div v-if="orderDisplay">
        <table style="width:75%">
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
              <button class="small-button" v-if="displayUpdate === false" v-on:click="selectOrder(order)">Muuda</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-if="orderDisplayUpdate">
        <table style="width:75%">
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
        <input class="select" type="text" placeholder="Uus kogus" v-model="newQuantity">
        <button class="small-button" v-on:click="confirmUpdate">Kinnita</button>

        <select class="select" v-model="statusName">
          <option disabled value="">Valige roll</option>
          <option>Completed</option>
          <option>Cancelled</option>
          <option>Open</option>
        </select>
        <button class="small-button" v-on:click="confirmStatus">Kinnita</button>
        <button class="small-button" v-on:click="reverseOrderDisplay">Tühista</button>
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
      articles: {},
      types: {},
      roleId: sessionStorage.getItem('roleId')

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
      this.orderDisplayUpdate = false
      this.orderDisplay = true
    },
    navigateToAdmin: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('shopName', this.shopName)
      sessionStorage.setItem('roleId', this.roleId)
      this.$router.push({name: 'adminRoute'})
    },
    navigateToStockInput: function () {
      if (this.shopId === null) {
        sessionStorage.setItem('roleId', this.roleId)
        sessionStorage.setItem('shopId', this.shopId);
        sessionStorage.setItem('shopName', this.shopName)
        this.$router.push({name: 'StockInputRoute'})
      }

    },
    navigateToOrders: function () {
      if (this.shopId === null) {
        sessionStorage.setItem('shopId', this.shopId)
        sessionStorage.setItem('shopName', this.shopName)
        sessionStorage.setItem('roleId', this.roleId)
        this.$router.push({name: 'ordersRoute'})
      }
    },
    navigateToUser: function () {
      this.$router.push({name: 'userRoute'})
    },
    navigateToStock: function () {
      if (this.shopId !== null) {
        sessionStorage.setItem('shopId', this.shopId)
        sessionStorage.setItem('shopName', this.shopName)
        sessionStorage.setItem('roleId', this.roleId)
        this.$router.push({name: 'stockRoute'})
      }
    },
    navigateToShop: function () {
      if (this.shopId == null) {
        sessionStorage.setItem('shopId', this.shopId)
        sessionStorage.setItem('shopName', this.shopName)
        sessionStorage.setItem('roleId', this.roleId)
        this.$router.push({name: 'shopRoute'})
      }
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
    this.getArticles();
    this.getTypes()
  }
}
</script>

<style scoped>

</style>