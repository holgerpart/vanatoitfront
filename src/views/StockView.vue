<template>
<div>
  <div>
    <h3>
      Poe id: {{ shopId }}
      <br>
      Pood: {{ shopName }}
    </h3>
  </div>
  <div>

    <table class="table table-hover">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Poe Id</th>
        <th scope="col">Toidu Id</th>
        <th scope="col">Toit</th>
        <th scope="col">Kogus</th>
        <th scope="col">Ühiku Id</th>
        <th scope="col">Ühik</th>
        <th scope="col">Kuupäev</th>
        <th scope="col">Kehtivus</th>
        <th scope="col">Kommentaarid</th>
        <th scope="col">Valik</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="shopFood in shopFoods">

        <th scope="row">{{ shopFood.id }}</th>
        <td>{{ shopFood.shopId }}</td>
        <td>{{ shopFood.foodId }}</td>
        <td>{{ shopFood.foodName }}</td>
        <td>{{ shopFood.quantity }}</td>
        <td>{{ shopFood.unitId }}</td>
        <td>{{ shopFood.unitName }}</td>
        <td>{{ shopFood.dateTime }}</td>
        <td>{{ shopFood.expirationDate }}</td>
        <td>{{ shopFood.comments }}</td>
        <td><button v-on:click="selectFoodId(shopFood.id)" >{{ shopFood.id }}</button></td>
<!--        v-model="shopFoodId"-->
      </tr>

      </tbody>
    </table>

  </div>
  <div>
    <button v-on:click="navigateToShopFoodInput">Sisesta uus kaubarida
    </button>
    <button v-on:click="navigateToOrders">Vaata tellimusi</button>
<!--    <div v-if="shopFoodSelection">-->
<!--      <button v-on:click="navigateToShopFoodUpdate">Muuda kaubarida</button>-->
<!--    </div>-->
  </div>
</div>
</template>

<script>
export default {
  name: "StockView",
  data: function () {
    return {
    shopFoods: {},
      shopId: sessionStorage.getItem('shopId'),
      userId: sessionStorage.getItem('userId'),
      shopName: sessionStorage.getItem('shopName'),
      shopFoodId: null,
      shopFoodSelection: false


    }
  },
  methods: {
    selectFoodId: function (id) {
      this.shopFoodId = id
      // this.shopFoodSelection = true
      sessionStorage.setItem('shopFoodId', this.shopFoodId)
      this.$router.push({name: 'ShopFoodUpdateRoute'})

    },

    getStock: function () {
        this.$http.get("/food/all", {
          params: {
            shopName: this.shopName
          }
        })
            .then(response => {
              console.log(response.data)
              alert('Success')
              this.shopFoods = response.data
            }).catch(error => {
          alert(error)
        })
      },
    navigateToShopFoodInput: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('shopName', this.shopName)
      this.$router.push({name: 'ShopFoodInputRoute'})
    },
    navigateToShopFoodUpdate: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('shopName', this.shopName)
      sessionStorage.setItem('shopFoodId', this.shopFoodId)
      this.$router.push({name: 'ShopFoodUpdateRoute'})
    },
    navigateToOrders: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('shopName', this.shopName)
      this.$router.push({name: 'ordersRoute'})
    },
    getStockById: function () {
        this.$http.get("/food/shopid", {
          params: {
            shopId: this.shopId
          }
        })
            .then(response => {
              console.log(response.data)
              this.shopFoods = response.data
            }).catch(error => {
          alert(error)
        })
      }
    },
  mounted() {
    this.getStockById()
  }
}
</script>

<style scoped>

</style>