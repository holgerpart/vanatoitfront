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
      <h3>
        Poe id: {{ shopId }}
        <br>
        Pood: {{ shopName }}
      </h3>
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
  name: "OrdersView",
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