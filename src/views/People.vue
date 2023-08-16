<template>
    <div class="people_info container">
      <People_info />
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import People_info from '@/components/People_info.vue';
  
  export default {
    name: 'People',
    components: { People_info },
  }
  </script>