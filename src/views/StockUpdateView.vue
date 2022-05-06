<template>
  <div>
    <div>
      <h3>
        Poe id: {{ shopId }}
        <br>
        Pood: {{ shopName }}
        <br>
        <div>
          Kaubarea Id: {{shopFoodId}}
        </div>

      </h3>
    </div>
    <div>
        <br>
        <br>
        <input type="text" placeholder="Kogus" v-model="quantity">
      <br>
      <br>
    </div>
    <div>
      <button v-on:click="updateStockQuantity" >
        Uuenda
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
      shopFoodId: sessionStorage.getItem('shopFoodId'),
    }
  },
  methods:{
    updateStockQuantity: function () {
      let stockRequest = {
        foodId: this.shopFoodId,
        quantity: this.quantity
      }
      alert(stockRequest.foodId)
      alert(stockRequest.quantity)
      // if using alternative then remove "this." from someDtoObject
      this.$http.post("/stock/stock", stockRequest
      ).then(response => {
        console.log(response.data)
        this.$router.push({name: 'stockRoute'})
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
      })
    }

  },




}
</script>

<style scoped>

</style>