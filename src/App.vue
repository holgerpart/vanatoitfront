<template>


  <div id="app">
    <div id="header">
      Vali VanaToit
    </div>
<!--    <nav>-->
<!--      <router-link to="/home">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link> |-->
<!--      <router-link to="/">Login</router-link> |-->
<!--      <router-link to="/register">Register</router-link> |-->
<!--      <router-link to="/shop">Pood</router-link> |-->
<!--      <router-link to="/user">Kasutaja</router-link> |-->
<!--      <router-link to="/stock-input">Kaubarea sisestus</router-link> |-->
<!--      <router-link to="/stock">Laoseis</router-link> |-->
<!--      <router-link to="/orders">Tellimused</router-link> |-->
<!--    </nav>-->
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#header {
  padding: 60px;
  text-align: center;
  background: antiquewhite;
  color: #2c3e50;
  font-size: 1.8em;

}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
