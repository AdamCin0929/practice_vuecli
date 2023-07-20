<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>|
    <router-link to="/setting">Setting</router-link>
  </nav>
  <router-view />
</template>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";

html {
  height: 100%;
}

body {
  font-family: 思源黑體, 微軟正黑體, 蘋方黑體, 華康麗黑體, Helvetica, Arial, sans-serif, serif;
  margin: 0;
  padding: 0px;
  background-color: black;
}

#header {
  height: 72px;
}

@media screen and (max-width:1280px) {
  .navbar {
    padding: 0px !important;
  }
}

button:focus {
  box-shadow: none !important;
}

.navbar {
  padding: 0px 320px;
  background-color: #131b3b;
}

.nav-link {
  color: white !important;
  transition: all 0.05s ease-in-out 0.2s !important;
  font-size: 1rem;
}

.nav-link:hover {
  text-shadow: 0.1em 0.1em 0.2em white;
}

.container-fluid {
  padding: 6px;
}


.d-flex input {
  width: 260px;
}

.d-flex input:focus {
  box-shadow: 0 0 3px 1px white !important;
}

.d-flex button {
  background-image: url('@/assets/img/search_icon.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
