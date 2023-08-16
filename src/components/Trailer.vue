<template>
    <div class="trailer">
        <div class="index_title">{{ movieTitle }}</div>
        <div class="trailer_container">
            <div class="row">

                <!-- youtube -->
                <div id="player" class="col-lg-8"></div>
                <div class="col-lg-4">
                    <span
                        style="white-space: nowrap; font-weight: 700; color: white; background-color:rgba(228, 180, 49, 0.829); padding: 0 8px 2px 8px; margin: 0 8px 0 0; border-radius: 12px; border: 1px solid rgba(228, 180, 49, 0.829);"
                        v-for="genres_n in movieDetails.genres">{{
                            genres_n.name }}</span>
                    <br>
                    <br>
                    <div>
                        <p>
                            {{ movieDetails.overview }}
                        </p>
                    </div>
                    <hr>
                    <div>
                        <span style="font-weight: 700;">Director&nbsp;&nbsp;&nbsp;</span>
                        <template v-for="crew in movieCredits.crew">
                            <router-link :to="`/people_info/${crew.id}`" class="movie_info"><span
                                    v-if="crew.job === 'Director'">
                                    {{ crew.name }}<span style="text-decoration: none; !important">&nbsp;</span>
                                </span></router-link>
                        </template>
                    </div>

                    <div>
                        <span v-if="firstWriter" style="font-weight: 700;">
                            <hr>
                            {{ firstWriter.job }}&nbsp;&nbsp;&nbsp;
                        </span>
                        <template v-for="crew in movieCredits.crew">
                            <router-link :to="`/people_info/${crew.id}`" class="movie_info"><span
                                    v-if="crew.job === 'Writer'">
                                    {{ crew.name }}<span style="text-decoration: none;">&nbsp;</span>
                                </span></router-link>
                        </template>
                    </div>

                    <div>
                        <span v-if="firstNovel" style="font-weight: 700;">
                            <hr>
                            {{ firstNovel.job }}&nbsp;&nbsp;&nbsp;
                        </span>
                        <template v-for="crew in movieCredits.crew">
                            <router-link :to="`/people_info/${crew.id}`" class="movie_info"><span
                                    v-if="crew.job === 'Novel'">
                                    {{ crew.name }}<span style="text-decoration: none;">&nbsp;</span>
                                </span></router-link>
                        </template>
                    </div>

                    <div>
                        <span v-if="firstStory" style="font-weight: 700;">
                            <hr>
                            {{ firstStory.job }}&nbsp;&nbsp;&nbsp;
                        </span>
                        <template v-for="crew in movieCredits.crew">
                            <router-link :to="`/people_info/${crew.id}`" class="movie_info"><span
                                    v-if="crew.job === 'Story'">
                                    {{ crew.name }}<span style="text-decoration: none;">&nbsp;</span>
                                </span></router-link>
                        </template>
                    </div>
                    <hr>
                    <div>
                        <span style="font-weight: 700;">Stars&nbsp;&nbsp;&nbsp;</span>
                        <template v-for="cast in movieCredits.cast">
                            <router-link :to="`/people_info/${cast.id}`" class="movie_info"><span
                                    style="text-decoration: underline;"
                                    v-if="cast.order == 0 || cast.order == 1 || cast.order == 2">
                                    {{ cast.name }}
                                </span><span>&nbsp;</span></router-link>
                        </template>
                    </div>
                    <hr>
                    <div>
                        <span style="font-weight: 700;">Runtime&nbsp;&nbsp;&nbsp;</span>
                        <span>
                            {{ movieDetails.runtime }}&nbsp;mins
                        </span>
                    </div>
                    <hr>
                    <div>
                        <span style="font-weight: 700;">Release Date&nbsp;&nbsp;&nbsp;</span>
                        <span>
                            {{ movieDetails.release_date }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="index_title">Backdrops</div>
            <!-- Container for the image gallery -->
            <div class="img_container">
                <div v-for="(image, index) in movieImg" :key="index">
                    <!-- Full-width images with number text -->
                    <div class="mySlides">
                        <img class="movie_img" :src="getFullImageUrl(image)" alt="Slide" :style="{ width: '100%' }">
                        <a class="imgPrev" @click="plusSlides(-1)" data-bs-no-jquery>&#10094;</a>
                        <a class="imgNext" @click="plusSlides(1)" data-bs-no-jquery>&#10095;</a>
                    </div>

                </div>


                <!-- Next and previous buttons -->


                <!-- Image text -->
                <div class="caption-container">
                    <p id="caption"></p>
                </div>

                <!-- Thumbnail images -->
                <div class="imgRow">
                    <div class="imgColumn" v-for="(image, index) in movieImg" :key="index">
                        <img class="demo cursor" :src="getFullImageUrl(image)" alt="Slide" @click="currentSlide(index)">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <router-view />
</template>
  
<script>
export default {
    name: 'Trailer',
    data() {
        return {
            api_Key: process.env.VUE_APP_API_KEY,
            movieId: null,
            movieTitle: null,
            videoKey: null,
            movieImg: [],
            movieDetails: [],
            movieCredits: {
                crew: []
            },
            slideIndex: 0
        };
    },
    created() {
        this.movieId = this.$route.params.movieid;
        this.movieTitle = this.$route.params.movietitle;
        this.slideIndex = 0;
        this.fetchMovieImages();
        this.fetchMovieVideos();
        this.fetchMovieDetails();
        this.fetchMovieCredits();
    },
    methods: {
        showSlides(n) {
            let i;
            let slides = document.getElementsByClassName("mySlides");
            let dots = document.getElementsByClassName("demo");
            if (n >= this.movieImg.length) {
                this.slideIndex = 0; // 循環顯示，回到第一張圖片
            } else if (n < 0) {
                this.slideIndex = this.movieImg.length - 1; // 循環顯示，回到最後一張圖片
            } else {
                this.slideIndex = n;
            }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[this.slideIndex].style.display = "block";
            dots[this.slideIndex].className += " active";
        },
        currentSlide(n) {
            this.showSlides(this.slideIndex = n);
        },
        plusSlides(n) {
            this.showSlides(this.slideIndex + n);
        },
        fetchMovieImages() {
            const url = `https://api.themoviedb.org/3/movie/${this.movieId}/images`;
            const headers = {
                'Authorization': `Bearer ${this.api_Key}`,
                'Content-Type': 'application/json',
            };
            axios.get(url, { headers })
                .then(response => {
                    this.movieImg = response.data.backdrops.slice(0, 10);
                    this.$nextTick(() => {
                        this.showSlides(0);
                    });
                })
                .catch(error => {
                    console.error(error);
                });
        },
        fetchMovieVideos() {
            const url = `https://api.themoviedb.org/3/movie/${this.movieId}/videos`;
            const headers = {
                'Authorization': `Bearer ${this.api_Key}`,
                'Content-Type': 'application/json',
            };
            axios.get(url, { headers })
                .then(response => {
                    const results = response.data.results;
                    if (results.length > 0) {
                        // 假設第一個結果就是我們要的影片
                        this.videoKey = results[0].key;
                        this.loadYouTubeVideo();
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        },
        fetchMovieDetails() {
            const url = `https://api.themoviedb.org/3/movie/${this.movieId}`;
            const headers = {
                'Authorization': `Bearer ${this.api_Key}`,
                'Content-Type': 'application/json',
            };
            axios.get(url, { headers })
                .then(response => {
                    this.movieDetails = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        fetchMovieCredits() {
            const url = `https://api.themoviedb.org/3/movie/${this.movieId}/credits`;
            const headers = {
                'Authorization': `Bearer ${this.api_Key}`,
                'Content-Type': 'application/json',
            };
            axios.get(url, { headers })
                .then(response => {
                    this.movieCredits = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        loadYouTubeVideo() {
            if (!this.videoKey) {
                return;
            }

            // 使用 YouTube IFrame Player API 來載入影片
            new YT.Player('player', {
                height: '480',
                width: '853',
                videoId: this.videoKey,
                playerVars: {
                    fs: 0,
                    modestbranding: 1,
                    rel: 0,
                },
            });
        },
    },
    computed: {
        getFullImageUrl() {
            const baseUrl = 'https://image.tmdb.org/t/p/original'; // 固定的图片路径前缀
            return function (image) {
                return baseUrl + image.file_path; // 将固定路径和图片名进行拼接
            };
        },
        firstWriter() {
            return this.movieCredits.crew.find(person_ => person_.job === 'Writer');
        },
        firstNovel() {
            return this.movieCredits.crew.find(person_ => person_.job === 'Novel');
        },
        firstStory() {
            return this.movieCredits.crew.find(person_ => person_.job === 'Story');
        }
    }
}
</script>

<style>
.movie_info {
    white-space: nowrap;
    color: rgba(228, 180, 49, 0.829);
    text-decoration: none;
}

/* Position the image container (needed to position the left and right arrows) */
.img_container {
    position: relative;
    width: 100%;
}

/* Hide the images by default */
.mySlides {
    display: none;
}

/* Add a pointer when hovering over the thumbnail images */
.cursor {
    cursor: pointer;
}

/* Next & previous buttons */
.imgPrev,
.imgNext {
    cursor: pointer;
    position: absolute;
    top: 40%;
    padding: 16px;
    color: rgba(228, 180, 49, 0.829);
    font-weight: bold;
    font-size: 20px;
    user-select: none;
    -webkit-user-select: none;
    text-decoration: none;
}

/* Position the "next button" to the right */
.imgPrev {
    left: 0;
    border-radius: 0 3px 3px 0;
}

.imgNext {
    right: 0;
    border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.imgPrev:hover,
.imgNext:hover {
    background-color: rgba(228, 180, 49, 0.829);
    color: #f2f2f2;
}

/* Container for image text */
.caption-container {
    background-color: rgba(228, 180, 49, 0.829);
    padding: 2px;
}

.imgRow:after {
    content: "";
    display: table;
    clear: both;
}

/* Six columns side by side */
.imgRow {
    width: 100%;
}

.imgColumn {
    float: left;
    width: 10% !important;
    padding: 0 0 !important;
}

/* Add a transparency effect for thumnbail images */
.demo {
    opacity: 0.6;
    width: 100%;
}

.active,
.demo:hover {
    opacity: 1;
}
</style>