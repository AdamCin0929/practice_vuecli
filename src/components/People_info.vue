<template>
    <div class="index_title">{{ people_details.name }}</div>
    <div class="trailer_container">
        <div class="row">
            <div class="col-lg-2">
                <img :src="getFullImageUrl(people_details)" alt="Slide">
            </div>
            <div class="col-lg-10">
                <span>
                    {{ biographySummary }}
                </span>
                <!-- Button trigger modal -->
                <button class="readall" type="button" @click="openModal">
                    Read All
                </button>

                <!-- Modal -->
                <div class="modal fade" id="staticBackdrop" ref="modalRef" data-bs-backdrop="static"
                    data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-xl">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Biography</h5>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                {{ people_details.biography }}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Understood</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <p>{{ people_details.birthday }}</p>
</template>
<script>
export default {
    name: 'People_info',

    data() {
        return {
            api_Key: process.env.VUE_APP_API_KEY,
            castId: null,
            people_details: [],
            maxSummaryLength: 1600
        }
    },
    created() {
        this.castId = this.$route.params.castid;
        this.fetchPeopleDetails();
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
    },
    computed: {
        getFullImageUrl() {
            const baseUrl = 'https://image.tmdb.org/t/p/w200'; // 固定的图片路径前缀
            return function (image) {
                return baseUrl + image.profile_path; // 将固定路径和图片名进行拼接
            };
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
        }
    }
}
</script>

<style>
.modal-content {
    background-color: rgb(40, 39, 39) !important;
}

.readall{
    color: white;
    background-color: rgba(228, 180, 49, 0.829);
    border: none;
    border-radius: 6px;
}
</style>