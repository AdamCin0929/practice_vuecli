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

header{
  height: 68px;
}

.navbar {
  display: block !important;
  padding: 0px 320px;
  background-color: #131b3b;
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
