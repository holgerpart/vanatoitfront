<template>
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
  <select v-model="role">
    <option disabled value="">Valige roll</option>
    <option>user</option>
    <option>shop</option>
  </select>
  <button v-on:click="register">Salvesta andmed</button>
  <br>
  <br>
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
            alert("Error")
      })
    }
  }
}
</script>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
}

.side {
  flex: 30%;
  background-color: beige;
  padding: 20px;
}

.main {
  flex: 70%;
  background-color: white;
  padding: 20px;
}

/*.navbar {*/
/*  display: flex;*/
/*  background-color: grey;*/
/*}*/
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

/*caption {*/
/*  font:;*/
/*}*/
input {
  text-align: center;
}

.navbar {
  display: flex;
  width: 100%;
  background-color: #231818;
  overflow: auto;
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
  background-color: #4b5860;
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
</style>