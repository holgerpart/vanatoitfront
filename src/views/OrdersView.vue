<template>
  <div>
<!--    <nav>-->
<!--      <router-link to="/food-input">Kaubarea sisestus</router-link>-->
<!--      |-->
<!--      <router-link to="/stock">Laoseis</router-link>-->
<!--      |-->
<!--      <router-link to="/orders">Tellimused</router-link>-->
<!--      |-->
<!--    </nav>-->
    <div>
      <h3>
        Poe id: {{ shopId }}
        <br>
        Pood: {{ shopName }}
      </h3>
<!--      <div>-->
<!--        <select class="custom-select" id="inputGroupSelect01" v-model="accountId">-->
<!--          <option selected v-for="order in orders" :value="order.id">{{-->
<!--              order.-->
<!--            }}-->
<!--          </option>-->
<!--        </select>-->
<!--      </div>-->
    </div>
    <div>
      <table class="table table-hover">
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
          <td>{{order.id}}</td>
          <td>{{order.firstName}}</td>
          <td>{{order.lastName}}</td>
          <td>{{order.shopName}}</td>
          <td>{{order.foodName}}</td>
          <td>{{order.quantity}}</td>
          <td>{{order.status}}</td>
          <td><button v-on:click ="selectOrder(order.id)" >Muuda</button></td>

        </tr>
        </tbody>
      </table>
      <input v-if="displayUpdate" type="text" placeholder="Uus kogus" v-model="newQuantity">
      <button v-if="displayUpdate" v-on:click="confirmUpdate">Kinnita</button>

      <select v-if="displayUpdate" v-model="statusName">
        <option disabled value="">Valige roll</option>
        <option>Completed</option>
        <option>Cancelled</option>
        <option>Open</option>
      </select>
      <button v-if="displayUpdate" v-on:click="confirmStatus">Kinnita</button>
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
      orders:{},
      orderId: null,
      displayUpdate: false,
      newQuantity: null,
      newComment: null,
      statusName:null
    }
  },

  methods: {
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
      this.orderId = id
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
      })
    }
  },
  mounted() {
    this.getOrderList()
  }
}
</script>

<style scoped>

</style>