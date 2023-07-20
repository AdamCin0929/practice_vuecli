<template>
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
                        <a class="nav-link" href="https://www.themoviedb.org/">電影</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">影集</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">影星</a>
                    </li>
                </ul>
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn " type="submit"></button>
                </form>
            </div>
        </div>
    </nav>
</template>
<script>
export default { name: 'BannerSection', }
</script>