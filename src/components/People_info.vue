<template>
    <div class="index_title">{{ people_details.name }}</div>
    <img :src="getFullImageUrl(people_details)" alt="Slide">
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
        }
    },
    created() {
        this.castId = this.$route.params.castid;
        this.fetchPeopleDetails();
    },
    methods: {
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
            const baseUrl = 'https://image.tmdb.org/t/p/original'; // 固定的图片路径前缀
            return function (image) {
                return baseUrl + image.profile_path; // 将固定路径和图片名进行拼接
            };
        }
    }
}
</script>