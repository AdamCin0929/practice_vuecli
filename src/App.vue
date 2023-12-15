<template>
  <header>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#">
          <img src="@/assets/img/movietitle4.png" alt="" height="50">
        </a>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link">電影</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/tvseries" class="nav-link">影集</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/stars" class="nav-link">影星</router-link>
            </li>
          </ul>
          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn " type="submit"></button>
          </form>
        </div>
      </div>
    </nav>
  </header>
  <div class="Negative">
    <img src="@/assets/img/底片.png" alt="">
  </div>
  <router-view />
  <div class="Negative" style="position: relative; bottom: 0; padding-top: 30px;">
    <img src="@/assets/img/底片.png" alt="">
  </div>
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
  background-color: rgb(40, 39, 39);
  color: white;
}

header {
  height: 72px;
}

.Negative img {
  width: 100%;
}

.navbar {
  display: block !important;
  padding: 0px 320px;
  background-color: black;
}

.index_title {
  font-size: 2rem;
  color: white;
  margin: 30px 0 30px 0;
  border-bottom: 4px solid rgba(228, 180, 49, 0.829);
}

@media screen and (max-width:1280px) {
  .navbar {
    padding: 0px !important;
  }
}

button:focus {
  box-shadow: none !important;
}

.nav-link {
  color: white !important;
  transition: all 0.05s ease-in-out 0.15s !important;
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
