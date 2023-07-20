<template>
  <div class="home">
    <BannerSection/>
  </div>
</template>

<script>
// @ is an alias to /src
import BannerSection from '@/components/banner.vue';

export default {
    name: 'banner',
    components: {     BannerSection   }
}
</script>
