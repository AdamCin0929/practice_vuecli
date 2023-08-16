<template>
    {{ castId }}
</template>
<script>
export default {
    name: 'People_info',
    data() {
        return {
            api_Key: process.env.VUE_APP_API_KEY,
            castId: null
        }
    },
    created() {
        this.castId = this.$route.params.castid;
    }
}
</script>