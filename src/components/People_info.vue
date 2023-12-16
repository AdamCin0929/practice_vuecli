<template>
    <div class="index_title">{{ people_details.name }} ({{ formattedBirthday }}{{ formattedDate }})</div>
    <div class="trailer_container">
        <div class="row">
            <div class="col-lg-2">
                <img :src="getFullImageUrl(people_details.profile_path)" alt="Slide">
            </div>
            <div class="col-lg-10">
                <span>
                    {{ biographySummary }}
                </span>
                <!-- Button trigger modal -->
                <button v-if="showReadAllButton" class="readall" type="button" @click="openModal">
                    Read All
                </button>

                <!-- Modal -->
                <div class="modal fade" id="staticBackdrop" ref="modalRef" data-bs-backdrop="static"
                    data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-xl">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2 class="modal-title" id="staticBackdropLabel">Biography</h2>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                {{ people_details.biography }}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <span v-for="results in people_Taggedimg.results">
            <img :src="getFullImageUrl(results.media.backdrop_path)" alt="Slide">            
        </span>
    </div>
</template>
<script>
export default {
    name: 'People_info',

    data() {
        return {
            api_Key: process.env.VUE_APP_API_KEY,
            castId: null,
            people_details: [],
            maxSummaryLength: 1600,
            people_Taggedimg: []
        }
    },
    created() {
        this.castId = this.$route.params.castid;
        this.fetchPeopleDetails();
        this.fetchPeopleTaggedimg();
    },
    methods: {
        openModal() {
            // 使用 $nextTick 確保 modalRef 已經存在於 DOM 中
            this.$nextTick(() => {
                const modalElement = this.$refs.modalRef;

                // 初始化 Modal
                const modal = new bootstrap.Modal(modalElement, { backdrop: 'static', keyboard: false });

                // 手動設置 rootElement
                modal._config.rootElement = document.body;

                // 手動打開 modal
                modal.show();
            });
        },
        fetchPeopleDetails() {
            const url = `https://api.themoviedb.org/3/person/${this.castId}`;
            const headers = {
                'Authorization': `Bearer ${this.api_Key}`,
                'Content-Type': 'application/json',
            };
            axios.get(url, { headers })
                .then(response => {
                    this.people_details = response.data;

                })
                .catch(error => {
                    console.error(error);
                });
        },
        fetchPeopleTaggedimg() {
            const url = `https://api.themoviedb.org/3/person/${this.castId}/tagged_images?page=1`;
            const headers = {
                'Authorization': `Bearer ${this.api_Key}`,
                'Content-Type': 'application/json',
            };
            axios.get(url, { headers })
                .then(response => {
                    this.people_Taggedimg = response.data;

                })
                .catch(error => {
                    console.error(error);
                });
        },
    },
    computed: {
        getFullImageUrl() {
            const baseUrl = 'https://image.tmdb.org/t/p/w200'; // 固定的图片路径前缀
            return function (image) {
                return baseUrl + image; // 将固定路径和图片名进行拼接
            };
        },
        formattedBirthday() {
            if (this.people_details && this.people_details.birthday) {
                // 將生日日期格式從 "yyyy-mm-dd" 替換為 "yyyy/mm/dd"
                return this.people_details.birthday.replace(/-/g, '/') + " - ";
            }
            return '';
        },
        deathday() {
            if (this.people_details && this.people_details.deathday == null) {
                return 'Now'
            }

            // 將死亡日期格式從 "yyyy-mm-dd" 替換為 "yyyy/mm/dd"
            const formattedDate = this.people_details.deathday.replace(/-/g, '/');

            return formattedDate
        },
        biographySummary() {
            if (this.people_details && this.people_details.biography) {
                return this.people_details.biography.length > this.maxSummaryLength
                    ? this.people_details.biography.slice(0, this.maxSummaryLength) + "....."
                    : this.people_details.biography;
            }
            return ''; // 当 biography 不存在时返回空字符串
        },
        remainingText() {
            if (this.people_details && this.people_details.biography) {
                return this.people_details.biography.length > this.maxSummaryLength
                    ? this.people_details.biography.slice(this.maxSummaryLength)
                    : '';
            }
            return ''; // 当 biography 不存在时返回空字符串
        },
        showReadAllButton() {
            return this.people_details.biography && this.people_details.biography.length > this.maxSummaryLength;
        }
    }
}
</script>

<style>
.modal-content {
    background-color: rgb(40, 39, 39) !important;
}

.readall {
    color: rgba(228, 180, 49, 0.829);
    background-color: transparent;
    border: none;
    text-decoration: underline;
    font-weight: 700;
}
</style>