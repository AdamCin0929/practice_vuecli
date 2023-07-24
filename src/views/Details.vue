<template>
  <div class="details container">
    <Trailer />
  </div>
</template>
  
<script>
// @ is an alias to /src
import Trailer from '@/components/Trailer.vue';

export default {
  name: 'Details',
  components: { Trailer },
}
</script>