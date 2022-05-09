<template>
  <div>
    <div>
      <div>
        <h3>Kaupade otsing</h3>
        <input type="text" placeholder="Tootenimetus" v-model="foodName">
        <button v-on:click="getByName">Otsi</button>
        <br>
        <br>
        <input type="text" placeholder="Tootegrupp" v-model="foodType">
        <button v-on:click="getByFoodType">Otsi</button>
        <br>
        <br>
        <input type="text" placeholder="Pood" v-model="shop">
        <button v-on:click="getByShop">Otsi</button>
        <br>
        <br>
        <input type="text" placeholder="Linn" v-model="city">
        <button v-on:click="getByCity">Otsi</button>
      </div>

      <div v-if="tableDisplay">
        <!--      v-if="tableDisplay"-->
        <table style="width:100%">
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
              <button v-if="displayUpdate === false" v-on:click="selectFoodId(shopFood.id)">Broneeri</button>
              <input v-if="displayUpdate" type="text" placeholder="Uus kogus" v-model="quantity">
              <button v-if="displayUpdate" v-on:click="newBooking">Kinnita</button>
              <button v-if="displayUpdate" v-on:click="newBooking">Tühista</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
export default {
  name: "UserView",
  data: function () {
    return {
      foodName: '',
      foodType: '',
      shop: '',
      city: '',
      shopFoods: {},
      displayUpdate: false,
      tableDisplay: false,
      userId: sessionStorage.getItem('userId'),
      shopFoodId: null,
      quantity: null,
      usedMethod: this.getByName
    }
  },
  methods: {
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
      this.shopFoodId = id
      sessionStorage.setItem('shopFoodId', this.shopFoodId)
      this.displayUpdate = true;
    },

    newBooking: function () {
      // ALTERNATIVE
      let request = {
        userId: this.userId,
        shopFoodId: this.shopFoodId,
        quantity: this.quantity
      }

      this.$http.post("/order/bookfood", request
      ).then(response => {
        console.log(response.data)
        this.usedMethod()
        this.displayUpdate = false
      }).catch(error => {
        console.log(error)
      })
    }
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

</style>