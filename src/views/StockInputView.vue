<template>
<div>
<!--  <nav>-->
<!--    <router-link to="/food-input">Kaubarea sisestus</router-link> |-->
<!--    <router-link to="/stock">Laoseis</router-link> |-->
<!--    <router-link to="/orders">Tellimused</router-link> |-->
<!--  </nav>-->
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
    <input type="text" placeholder="Toidu Id" v-model="foodId">
    <br>
    <br>
    <input type="text" placeholder="Kogus" v-model="quantity">
    <br>
    <br>
    <input type="text" placeholder="Kõlblik kuni" v-model="expirationDate">
    <br>
    <br>
    <input type="text" placeholder="Kommentaarid" v-model="comments">
    <br>
    <br>
    <input type="text" placeholder="Ühik" v-model="unit">

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
      unit:null
    }
  },
  methods:{
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