<template>
  <div class="movie container">
    <TrendingMovie />
  </div>
</template>

<script>
// @ is an alias to /src
import TrendingMovie from '@/components/TrendingMovie.vue';

export default {
  name: 'MovieView',
  components: { TrendingMovie },
}
</script>