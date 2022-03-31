<template>
  <div class="row">
    <div class="col-lg-3 col-md-12">
      <ul class="nav flex-column">
        <li v-for="(page, index) in pageItem" :key="index" class="nav-item">
          <router-link :to="page.path">{{ page.name }}</router-link>
        </li>
      </ul>
    </div>
    <!-- 頁面在這 -->
    <div class="col-lg-9 col-md-12">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import router from '../router'

export default defineComponent({
  name: 'navList',
  setup () {
    // .filter 過濾陣列的
    const pageItem = router.getRoutes().filter((page) => page.name !== 'redirect')
    return {
      pageItem
    }
  }
})
</script>

<style lang="scss" scoped>
ul {
  padding: 30px;
  text-align: left;
  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.nav {
  margin-bottom: 15px;
}
.nav-item {
  color: #333;
  font-size: 0.9em;
  text-decoration: none;
  line-height: 190%;
  display: block;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #cccccc;
  padding-bottom: 5px;
  padding-top: 5px;
  font-weight: 100;
}
</style>
