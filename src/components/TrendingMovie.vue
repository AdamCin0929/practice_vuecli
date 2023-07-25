<template>
  <div class="trending">
    <div class="title_div">
      <p class="index_title">Trending Movies Today</p>
    </div>
    <div class="trendingPoster">
      <div class="movie_poster" v-for="(movie, index) in trendingMovies" :key="index"
        @mouseenter="handleMouseEnter(movie)" @mouseleave="handleMouseLeave(movie)">
        <div class="carousel_div">
          <img class="carousel_img" :src="getFullImageUrl(movie)" alt="Slide">
          <div class="vote_bar">
            <Prograssbar :percent="Math.round(movie.vote_average * 10)" />
          </div>
          <div class="movieDetails" :style="{ opacity: movie.showDetails ? 1 : 0 }">
            <div id="shiny-shadow">
              <router-link :to="`/details/${movie.id}/${movie.title}`"
                class="trailer_btn"><span>Details</span></router-link>
            </div>
          </div>
        </div>
        <div class="m_title">
          <p>{{ movie.title }}</p>
        </div>
      </div>
    </div>
    <div class="title_div">
      <p class="index_title">Upcoming</p>
    </div>
    <div class="upcomingPoster">
      <div class="movie_poster" v-for="(movie, index) in upcomingMovies" :key="index"
        @mouseenter="handleMouseEnter(movie)" @mouseleave="handleMouseLeave(movie)">
        <div class="carousel_div">
          <img class="carousel_img" :src="getFullImageUrl(movie)" alt="Slide">
          <div class="vote_bar">
            <Prograssbar :percent="Math.round(movie.vote_average * 10)" />
          </div>
          <div class="movieDetails" :style="{ opacity: movie.showDetails ? 1 : 0 }">
            <div id="shiny-shadow">
              <router-link :to="`/details/${movie.id}/${movie.title}`"
                class="trailer_btn"><span>Details</span></router-link>
            </div>
          </div>
        </div>
        <div class="m_title">
          <p>{{ movie.title }}</p>
        </div>
      </div>
    </div>
    <div>
      <img src="@/assets/img/底片.png" width="100%" alt="">
    </div>
  </div>
  <router-view />
</template>

<script>
import Prograssbar from '@/components/Prograssbar.vue'


export default {
  name: 'TrendingMovie',
  components: {
    Prograssbar
  },
  data() {
    return {
      api_Key: process.env.VUE_APP_API_KEY,
      trendingMovies: [],
      upcomingMovies: [],
      error: null,
      moviePage: 1,
    };
  },
  created() {
    this.fetchtrendingData();
    this.fetchupcomingData();
  },
  methods: {
    fetchtrendingData() {
      const url = `https://api.themoviedb.org/3/trending/movie/day`;
      const headers = {
        'Authorization': `Bearer ${this.api_Key}`,
        'Content-Type': 'application/json',
      };
      axios.get(url, { headers })
        .then(response => {
          this.trendingMovies = response.data.results.map(movie => ({
            ...movie,
            showDetails: false,
          }));;
          this.$nextTick(() => {
            this.trendingCarousel();
          });
        })
        .catch(error => {
          this.error = error.message;
        });
    },
    handleMouseEnter(movie) {
      movie.showDetails = true;
    },
    handleMouseLeave(movie) {
      movie.showDetails = false;
    },
    trendingCarousel() {
      $('.trendingPoster').slick({
        arrows: false,
        slidesToShow: 5,
        slidesToScroll: 5, // 设置每次切换的幻灯片数量为3
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              autoplay: true,
              autoplaySpeed: 3000,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              autoplay: true,
              autoplaySpeed: 3000,
            }
          },
          {
            breakpoint: 480,
            settings: {
              autoplay: true,
              autoplaySpeed: 3000,
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    },
    fetchupcomingData() {
      const url = `https://api.themoviedb.org/3/movie/upcoming`;
      const headers = {
        'Authorization': `Bearer ${this.api_Key}`,
        'Content-Type': 'application/json',
      };
      axios.get(url, { headers })
        .then(response => {
          this.upcomingMovies = response.data.results.map(movie => ({
            ...movie,
            showDetails: false,
          }));;
          this.$nextTick(() => {
            this.upcomingCarousel();
          });
        })
        .catch(error => {
          this.error = error.message;
        });
    },
    upcomingCarousel() {
      $('.upcomingPoster').slick({
        arrows: false,
        slidesToShow: 5,
        slidesToScroll: 5, // 设置每次切换的幻灯片数量为3
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              autoplay: true,
              autoplaySpeed: 3000,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              autoplay: true,
              autoplaySpeed: 3000,
            }
          },
          {
            breakpoint: 480,
            settings: {
              autoplay: true,
              autoplaySpeed: 3000,
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    }
  },
  computed: {
    getFullImageUrl() {
      const baseUrl = 'https://image.tmdb.org/t/p/w500'; // 固定的图片路径前缀
      return function (movie) {
        return baseUrl + movie.poster_path; // 将固定路径和图片名进行拼接
      };
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
template {
  margin-top: 68px;
}

.title_div {
  width: auto;
}

.index_title {
  font-size: 2rem;
  color: white;
  margin: 30px 0 30px 0;
  border-bottom: 4px solid rgba(228, 180, 49, 0.829);
}

.carousel_img {
  object-fit: contain;
  width: 100%;
}

.carousel_div {
  position: relative;
  display: inline-block;
  padding: 0 4px;
  overflow: hidden;
  /* 确保伪元素不会超出容器边界 */
}

.carousel_div::after {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  /* 改为从中心开始 */
  width: 0;
  margin: 0;
  height: 100%;
  background-color: black;
  opacity: 0.8;
  transition: all .4s;
  transform: translateX(-50%);
  /* 通过向左偏移一半的宽度来保持在中心 */
}

.carousel_div:hover::after {
  width: 200%;
  transition: all .8s;
  /* 为了能向两侧延伸，我们需要将宽度设置为200% */
}

.movieDetails {
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
  transition: opacity 0s ease;
  z-index: 100000;
}

.movie_poster {
  position: relative;
}

.movie_poster:hover .movieDetails {
  opacity: 1;
  transition: opacity .5s ease;
}

.movie_poster:hover .carousel_div::after {
  width: 200%;
  transition: all .8s;
}

#shiny-shadow {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #131b3b;
}

.trailer_btn {
  border: 1px solid rgba(228, 180, 49, 0.829);
  background: transparent;
  color: white;
  padding: 10px 24px;
  outline: none;
  overflow: hidden;
  position: relative;
  text-decoration: none;
}

span {
  z-index: 20;
}

.trailer_btn:after {
  content: '';
  display: block;
  position: absolute;
  top: -36px;
  left: -100px;
  background: rgba(228, 180, 49, 0.829);
  width: 50px;
  height: 125px;
  opacity: 20%;
  transform: rotate(-45deg);
}

.trailer_btn:hover:after {
  left: 120%;
  transition: all 800ms cubic-bezier(0.3, 1, 0.2, 1);
  -webkit-transition: all 800ms cubic-bezier(0.3, 1, 0.2, 1);
}

.m_title {
  color: white;
  text-align: center;
  font-size: 1rem;
  padding: 0 18px;
}

.vote_bar {
  position: absolute;
  bottom: 0.5%;
  right: 1.5%;
  z-index: 100;
}
</style>