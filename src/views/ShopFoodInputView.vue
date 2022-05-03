<template>
<div>
  <nav>
    <router-link to="/food-input">Kaubarea sisestus</router-link> |
    <router-link to="/stock">Laoseis</router-link> |
    <router-link to="/orders">Tellimused</router-link> |
  </nav>
  <div>
    <h3>
      Poe id: {{ shopId }}
      <br>
      Pood: {{ shopName }}
    </h3>
  </div>
  <div>
    <input type=text placeholder="Poe Id" v-model="firstName">
    <br>
    <br>
    <input type="text" placeholder="Toidu Id" v-model="lastName">
    <br>
    <br>
    <input type="text" placeholder="Kogus" v-model="name">
    <br>
    <br>
    <input type="text" placeholder="Kõlblik kuni" v-model="password">
    <br>
    <br>
    <input type="text" placeholder="Kõlblik kuni" v-model="password">

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
      shopName: sessionStorage.getItem('shopName')

    }
  },
}
</script>

<style scoped>

</style>