<template>
  <div>
    <input type="text" placeholder="Kasutajanimi" v-model="userName">
    <br>
    <br>
    <input type="text" placeholder="Salasõna" v-model="password">
    <br>

    <div v-if="valiKontoDivDisplay">
      <section>
        <h3>vali konto</h3>
        <ul class="list-group">
          <li class="list-group-item" v-for="role in userRoles">
            <input v-on:click="navigateToSelectedRole(role.roleId)" type="radio" v-model="roleId" :value="role.roleId">{{ role.roleName }} {{role.roleId}}
          </li>
        </ul>
      </section>
    </div>
    <br>
    <button v-on:click="login">Sisene</button>
    <br>
    <button v-on:click="navigateToRegister">Registreeri kasutaja</button>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data: function () {
    return {
      userName: '',
      password: '',
      role: {},
      roles: {},
      userRoles: {},
      roleId: null,
      tableDivDisplay: true,
      valiKontoDivDisplay: false
    }
  },

  methods: {
    displayTableDiv: function () {
      this.tableDivDisplay = true
    },

    hideTableDiv: function () {
      this.tableDivDisplay = false
    },
    login: function () {
      let userInfo = {
        userName: this.userName,
        password: this.password
      }

      // if using alternative then remove "this." from someDtoObject
      this.$http.post("/log-in", userInfo
      ).then(response => {
        this.userRoles = response.data.userRoles
        sessionStorage.setItem('userId', response.data.userId)
        if (this.userRoles.length === 1) {
          if (this.userRoles[0].roleId === 1) {
            this.navigateToUser()
          } else if (this.userRoles[0].roleId === 2) {
            this.navigateToShop()
          } else {
            this.navigateToAdmin()
          }
        }

        if (this.userRoles.length > 1) {
          // unhide vali konto sektsioon
          this.valiKontoDivDisplay = true;
        }
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    navigateToSelectedRole: function (id) {

      sessionStorage.setItem('roleId', id)
      if (id === 1) {
        this.navigateToUser()
      } else if (id === 2) {
        this.navigateToShop()
      } else {
        this.navigateToAdmin()
      }
    },
    navigateToAdmin: function () {
      this.$router.push({name: 'adminRoute'})
    },

    navigateToShop: function () {
      this.$router.push({name: 'shopRoute'})
    },
    navigateToUser: function () {
      this.$router.push({name: 'userRoute'})
    },
    navigateToRegister: function () {
      this.$router.push({name: 'registerRoute'})
    },
  }
}

</script>

<style scoped>

</style>