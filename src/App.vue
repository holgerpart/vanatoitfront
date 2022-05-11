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
