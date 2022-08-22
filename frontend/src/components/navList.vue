<template>
    <div class="row">
        <div class="col-lg-3 col-md-12">
            <ul class="nav flex-column">
                <li v-for="(page, index) in pageItem" :key="page.name" class="nav-item">
                    <router-link :to="page.path">{{ page.name }}</router-link>
                </li>
            </ul>
        </div>
        <div class="col-lg-9 col-md-12">
            <router-view :key="$route.fullPath + Math.random()"></router-view>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue'
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
        text-decoration: none;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}

.nav {
    margin-bottom: 15px;
}

.nav-item {
    display: block;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 0.9em;
    font-weight: 100;
    text-decoration: none;
    color: #333;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: #ccc;
    line-height: 190%;
}
</style>
