<template>


  <div id="app">
    <div id="header">
      <header> Vali VanaToit</header>
    </div>
    <nav>
      <button class="small-button" @click="navigateToLogin">Login</button>
      <button class="small-button" v-if="getRoleId() > 1" @click="navigateToRegister">Register</button>
      <button class="small-button" v-if="getRoleId() > 1" @click="navigateToShop">Pood</button>
      <button class="small-button" v-if="getRoleId() > 0" @click="navigateToUser">Kasutaja</button>
      <button class="small-button" v-if="getRoleId() > 1" @click="navigateToStockInput">Kaubarea sisestus</button>
      <button class="small-button" v-if="getRoleId() > 1" @click="navigateToStock">Laoseis</button>
      <button class="small-button" v-if="getRoleId() > 1 " @click="navigateToLogin">Tellimused</button>
      <button class="small-button" v-if="getRoleId() === 3 " @click="navigateToAdmin">Admin</button>
<!--      <button class="small-button" v-if="getRolesAmount() > 1" @click="showChoice">Vali roll</button>-->
<!--      <ul class="list-group" v-if="roleChoice">-->
<!--        <li class="list-group-item" v-for="role in userRoles">-->
<!--          <input  class="select" v-on:click="navigateToSelectedRole(role.roleId)" type="radio" v-model="roleId" :value="role.roleId">{{-->
<!--            role.roleName-->
<!--          }}-->
<!--        </li>-->
<!--      </ul>-->
    </nav>
    <router-view/>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      userName: '',
      password: '',
      role: {},
      roles: {},
      userRoles: sessionStorage.getItem('userRoles'),
      roleId: sessionStorage.getItem('roleId'),
      userId: sessionStorage.getItem('userId'),
      shopId: sessionStorage.getItem('shopId'),
      shopName: sessionStorage.getItem('shopName'),
      // userRolesAmount: sessionStorage.getItem(),
      roleChoice: false
    }
  },
  methods: {
    navigateToLogin: function () {
      this.$router.push({name: 'loginRoute'})
    },
    navigateToRegister: function () {
      this.$router.push({name: 'registerRoute'})
    },
    navigateToUser: function () {
      this.$router.push({name: 'userRoute'})
    },
    navigateToStockInput: function () {
        sessionStorage.setItem('shopId', this.shopId);
        sessionStorage.setItem('shopName', this.shopName)
        this.$router.push({name: 'StockInputRoute'})

    },
    navigateToStock: function () {
        sessionStorage.setItem('shopId', this.shopId)
        sessionStorage.setItem('shopName', this.shopName)
        this.$router.push({name: 'stockRoute'})
    },
    getRoleId: function () {
      return Number(sessionStorage.getItem('roleId'));
    }
    ,
    navigateToAdmin: function () {
      sessionStorage.setItem('shopId', this.shopId);
      sessionStorage.setItem('shopName', this.shopName)
      this.$router.push({name: 'adminRoute'})
    },

    getRolesAmount: function () {
      return sessionStorage.getItem('userRolesAmount')
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
    navigateToShop: function () {
      sessionStorage.setItem('shopId', this.shopId)
      sessionStorage.setItem('shopName', this.shopName)
      this.$router.push({name: 'shopRoute'})
    },
  }

}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.navbar {
  width: 100%;
  background-color: #555;
  overflow: auto;
}

#header {
  padding: 60px;
  text-align: center;

  color: #2c3e50;
  font-size: 1.8em;

}

/* Navigation links */
.navbar button {
  float: left;
  padding: 12px;
  color: black;
  text-decoration: none;
  font-size: 17px;
  width: 20%; /* Four equal-width links. If you have two links, use 50%, and 33.33% for three links, etc.. */
  text-align: center; /* If you want the text to be centered */
}

/* Add a background color on mouse-over */
.navbar button:hover {
  background-color: #000;
  color: white;

}

/* Style the current/active link */
.navbar button.active {
  background-color: #04AA6D;
}

/* Add responsiveness - on screens less than 500px, make the navigation links appear on top of each other, instead of next to each other */
@media screen and (max-width: 500px) {
  .navbar button {
    float: none;
    display: block;
    width: 100%;
    text-align: left; /* If you want the text to be left-aligned on small screens */
  }
}



/*nav {*/
/*  padding: 30px;*/
/*}*/

/*nav a {*/
/*  font-weight: bold;*/
/*  color: #2c3e50;*/
/*}*/

/*nav a.router-link-exact-active {*/
/*  color: #42b983;*/
/*}*/
</style>
