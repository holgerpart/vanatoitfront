<template>
  <div>
    <input type="text" placeholder="Kasutajanimi" v-model="userName">
    <br>
    <br>
    <input type="text" placeholder="Salasõna" v-model="password">
    <br>
    <br>
    <button v-on:click="login">Sisene</button>
    <br>
    <button v-on:click="navigateToRegister">Registreeri kasutaja</button>

  </div>
</template>
<!--{-->
<!--"userName": "string",-->
<!--"password": "string"-->
<!--}-->
<script>
export default {
  name: "LoginView",
  data: function () {
    return {
      userName: '',
      password: ''
    }
  },

  methods: {
    login: function () {
      let someDtoObject = {
        userName: this.userName,
        password: this.password
      }

      // if using alternative then remove "this." from someDtoObject
      this.$http.post("/log-in", someDtoObject
      ).then(response => {
        alert(response.data.userId)
        alert(response.data.userRoleIds)
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    navigateToRegister: function () {
      this.$router.push({name: 'registerRoute'})
    },
  }
}
</script>

<style scoped>

</style>