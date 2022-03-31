<template>
  <div class="home">
    <twMap />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import twMap from '@/components/taiwanMap.vue' // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    twMap
  }
})
</script>
