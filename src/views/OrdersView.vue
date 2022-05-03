<template>
  <div>
    <nav>
      <router-link to="/food-input">Kaubarea sisestus</router-link>
      |
      <router-link to="/stock">Laoseis</router-link>
      |
      <router-link to="/orders">Tellimused</router-link>
      |
    </nav>
    <div>
      <input type="text" placeholder="Eesnimi" v-model="firstName">
      <br>
      <br>
      <input type="text" placeholder="Perekonnanimi" v-model="lastName">
      <br>
      <br>
      <input type="text" placeholder="Kasutajanimi" v-model="name">
      <br>
      <br>
      <input type="text" placeholder="Salasõna" v-model="password">
      <br>
      <br>
    </div>
  </div>
</template>
<!--private Integer shopId;-->
<!--private Integer foodId;-->
<!--private Integer quantity;-->
<!--private LocalDate expirationDate;-->
<!--private String comments;-->
<!--private String unit;-->
<script>
export default {
  name: "OrdersView"
}
</script>

<style scoped>

</style>