<template>
  <div class="flex-container">
    <div>
      <button v-if="roleId === '3'" class="nav-button" @click="navigateToAdmin">Admin</button>
      <button class="nav-button" @click="navigateToShop">Poe vaade</button>
      <button class="nav-button" @click="navigateToUser">Kliendivaade</button>
      <button class="nav-button" @click="navigateToStockInput">Kaubarea sisestus</button>
      <button class="nav-button" @click="navigateToStock">Laoseis</button>
      <button class="active">Tellimused</button>
      <button class="nav-button" @click="navigateToLogin">Logi välja</button>

    </div>
    <div class="shop">
      <h3>
        Pood: {{ shopName }}
        <button class="nav-button" @click="navigateToShop">Vaheta kauplus</button>
      </h3>
    </div>
    <div class="table">
      <table v-if="displayUpdate === false" style="width: 75%">
        <thead>
        <tr>
          <th style="width:1%">#</th>
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
            <button class="small-button" v-on:click="selectOrder(order)">Muuda</button>
          </td>

        </tr>
        </tbody>
      </table>
      <div class="table">
        <table v-if="displayUpdate" style="width: 75%;">
          <thead>
          <tr>
            <th style="width:1%">#</th>
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
            <td>{{ orderId }}</td>
            <td>{{ firstName }}</td>
            <td>{{ lastName }}</td>
            <td>{{ shopName }}</td>
            <td>{{ foodName }}</td>
            <td>{{ quantity }}</td>
            <td>{{ status }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <input class="select" v-if="displayUpdate" type="text" placeholder="Uus kogus" v-model="newQuantity">
      <button class="small-button" v-if="displayUpdate" v-on:click="confirmUpdate">Kinnita</button>

      <select class="select" v-if="displayUpdate" v-model="statusName">
        <option disabled selected value="">Valige roll</option>
        <option>Completed</option>
        <option>Cancelled</option>
        <option>Open</option>
      </select>
      <button class="small-button" v-if="displayUpdate" v-on:click="confirmStatus">Kinnita</button>
      <button class="small-button" v-if="displayUpdate" v-on:click="reverseDisplay">Tühista</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrdersView",
  data: function () {
    return {
      shopId: sessionStorage.getItem('shopId'),
      userId: sessionStorage.getItem('userId'),
      shopName: sessionStorage.getItem('shopName'),
      orders: {},
      orderId: null,
      displayUpdate: false,
      newQuantity: null,
      newComment: null,
      statusName: null,
      id: null,
      firstName: '',
      lastName: '',
      foodName: '',
      quantity: '',
      status: '',
      stockId: null,
      roleId: sessionStorage.getItem('roleId')

    }
  },

  methods: {
    checkRow: function () {
      return false
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
    selectOrder: function (id) {
      this.orderId = id.id
      this.firstName = id.firstName
      this.lastName = id.lastName
      this.foodName = id.foodName
      this.quantity = id.quantity
      this.status = id.status
      this.stockId = id.shopFoodId


      sessionStorage.setItem('orderId', this.orderId)
      this.displayUpdate = true

    },
    confirmUpdate: function () {
      let orderRequest = {
        orderId: this.orderId,
        quantity: this.newQuantity
      }
      this.$http.post("/order/updateorder", orderRequest
      ).then(response => {
        console.log(response.data)
        this.getOrderList()
        this.displayUpdate = false
      }).catch(error => {
        console.log(error)
        alert(error.response.data.detail)

      })
    },
    confirmStatus: function () {
      let orderRequest = {
        orderId: this.orderId,
        statusName: this.statusName
      }
      this.$http.post("/order/status", orderRequest
      ).then(response => {
        console.log(response.data)
        this.getOrderList()
        this.displayUpdate = false
      }).catch(error => {
        console.log(error)
        alert(error.response.data.detail)
      })
    },
    reverseDisplay: function () {
      this.displayUpdate = !this.displayUpdate
    },
    navigateToAdmin: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('shopName', this.shopName)
      sessionStorage.setItem('roleId', this.roleId)
      this.$router.push({name: 'adminRoute'})
    },
    navigateToStockInput: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('shopName', this.shopName)
      sessionStorage.setItem('roleId', this.roleId)
      this.$router.push({name: 'StockInputRoute'})
    },
    navigateToOrders: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('shopName', this.shopName)
      sessionStorage.setItem('roleId', this.roleId)
      this.$router.push({name: 'ordersRoute'})
    },
    navigateToUser: function () {
      sessionStorage.setItem('roleId', this.roleId)
      this.$router.push({name: 'userRoute'})
    },
    navigateToStock: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('shopName', this.shopName)
      sessionStorage.setItem('roleId', this.roleId)
      this.$router.push({name: 'stockRoute'})

    },
    navigateToShop: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('shopName', this.shopName)
      sessionStorage.setItem('roleId', this.roleId)
      this.$router.push({name: 'shopRoute'})
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
    this.getOrderList()
  }

}
</script>
<style scoped>


</style>