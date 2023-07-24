<template>
    <div class="trailer">
        <div class="index_title">Information</div>
        <div class="trailer_container">
            <div class="row">

                <!-- youtube -->
                <div id="player" class="col-lg-8"></div>
                <div class="col-lg-4">
                    <h4 style="font-weight: 700;">{{ movieTitle }}</h4>
                    <span
                        style="white-space: nowrap; font-weight: 700; color: white; background-color:rgba(228, 180, 49, 0.829); padding: 0 8px 2px 8px; margin: 0 8px 0 0; border-radius: 12px; border: 1px solid rgba(228, 180, 49, 0.829);"
                        v-for="genres_n in movieDetails.genres">{{
                            genres_n.name }}</span>
                    <br>
                    <br>
                    <div>
                        <span style="font-weight: 700;">Director&nbsp;&nbsp;&nbsp;</span>
                        <template v-for="crew in movieCredits.crew">
                            <span v-if="crew.job === 'Director'" style="color: rgba(228, 180, 49, 0.829);">
                                {{ crew.name }}&nbsp;
                            </span>
                        </template>
                    </div>
                    <hr>
                    <div>
                        <span style="font-weight: 700;">Writer&nbsp;&nbsp;&nbsp;</span>
                        <template v-for="crew in movieCredits.crew">
                            <span v-if="crew.job === 'Writer' || crew.job === 'Novel' || crew.job === 'Story'"
                                style="color: rgba(228, 180, 49, 0.829);">
                                {{ crew.name }}&nbsp;
                            </span>
                        </template>
                    </div>
                    <hr>
                    <div>
                        <span style="font-weight: 700;">Stars&nbsp;&nbsp;&nbsp;</span>
                        <template v-for="cast in movieCredits.cast">
                            <span v-if="cast.order == 0 || cast.order == 1 || cast.order == 2"
                                style="color: rgba(228, 180, 49, 0.829);">
                                {{ cast.name }}&nbsp;&nbsp;
                            </span>
                        </template>
                    </div>
                    <hr>
                    <div>
                        <span v-if="firstWriter" style="color: rgba(228, 180, 49, 0.829);">
                            {{ firstWriter.name }}&nbsp;
                        </span>
                    </div>
                </div>
            </div>

            <!-- Container for the image gallery -->
            <div class="img_container">
                <div v-for="(image, index) in movieImg" :key="index">
                    <!-- Full-width images with number text -->
                    <div class="mySlides">
                        <div class="numbertext">{{ index + 1 }} / {{ movieImg.length }}</div>
                        <img class="movie_img" :src="getFullImageUrl(image)" alt="Slide" :style="{ width: '100%' }">
                    </div>
                </div>


                <!-- Next and previous buttons -->
                <a class="imgPrev" @click="plusSlides(-1)" data-bs-no-jquery>&#10094;</a>
                <a class="imgNext" @click="plusSlides(1)" data-bs-no-jquery>&#10095;</a>

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
</template>
  
<script>
export default {
    name: 'Trailer',
    data() {
        return {
            apiKey: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjQ3NjVmZDEwZmUyNGQxMmQ0MGRjNWQ1NjgzY2I5YiIsInN1YiI6IjY0NzgwM2FlMDc2Y2U4MDE0OWVkYjYzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GTd83wKGglXe42txhEeDSdzdosIAHlJTiIndkIUBB-M',
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
        var urlParams = new URLSearchParams(window.location.search);
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
            let captionText = document.getElementById("caption");
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
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            };
            axios.get(url, { headers })
                .then(response => {
                    this.movieImg = response.data.backdrops.slice(0, 5);
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
                'Authorization': `Bearer ${this.apiKey}`,
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
                'Authorization': `Bearer ${this.apiKey}`,
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
                'Authorization': `Bearer ${this.apiKey}`,
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
            const baseUrl = 'https://image.tmdb.org/t/p/w500'; // 固定的图片路径前缀
            return function (image) {
                return baseUrl + image.file_path; // 将固定路径和图片名进行拼接
            };
        },
        firstWriter() {
            return this.movieCredits.crew.find(person_ => person_.job === 'Writer');
        }
    }
}
</script>

<style>
/* Position the image container (needed to position the left and right arrows) */
.img_container {
    position: relative;
    width: 501px;
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
    top: 35%;
    width: auto;
    padding: 16px;
    color: rgba(228, 180, 49, 0.829);
    font-weight: bold;
    font-size: 20px;
    border-radius: 0 3px 3px 0;
    user-select: none;
    -webkit-user-select: none;
    text-decoration: none;
}

/* Position the "next button" to the right */
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

/* Number text (1/3 etc) */
.numbertext {
    color: #f2f2f2;
    font-size: 12px;
    padding: 8px 12px;
    position: absolute;
    top: 0;
}

/* Container for image text */
.caption-container {
    background-color: #131b3b;
    padding: 2px 16px;
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
    width: 20% !important;
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