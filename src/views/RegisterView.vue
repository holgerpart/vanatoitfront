<template>
<div>

  <div>
  <input class="select" type="text" placeholder="Eesnimi" v-model="firstName">
  <br>
  <br>
  <input class="select" type="text" placeholder="Perekonnanimi" v-model="lastName">
  <br>
  <br>
  <input class="select" type="text" placeholder="Kasutajanimi" v-model="name">
  <br>
  <br>
  <input class="select" type="text" placeholder="Salasõna" v-model="password">
  <br>
  <br>
  <select class="select" v-model="role">
    <option disabled value="">Valige roll</option>
    <option>user</option>
    <option>shop</option>
  </select>
  <button class="small-button" v-on:click="register">Salvesta andmed</button>
  <br>
  <br>
    <button class="nav-button" @click="navigateToLogin">Tühista</button>

  </div>
</div>
</template>

<script>
export default {
  name: "RegisterView",
  data: function () {
    return {
      firstName: '',
      lastName: '',
      name: '',
      password: '',
      role: ''
    }
  },
  methods: {
    register: function () {
      let registryRequest = {
        firstName: this.firstName,
        lastName: this.lastName,
        name: this.name,
        password: this.password,
        role: this.role
      }
      this.$http.post("/log-in/user", registryRequest
      ).then(response => {
        alert("Success")
        if (this.role === 'user') {
          this.$router.push({name: 'userRoute'});
        } else {
          this.$router.push({name: 'shopRoute'})
        }
          }).catch(error => {
            alert(error.response.data.detail)
      })
    },
    navigateToLogin: function () {
      this.$router.push({name: 'loginRoute'})
    },
  }
}
</script>

<style scoped>

</style>