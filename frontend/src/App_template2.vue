<template>
    <headerUI />
    <br />

    <div class="container">
        <div class="offset-2 col-8" :style="{minHeight: Height+'px'}">
            <router-view :key="$route.fullPath + Math.random()"></router-view>
        </div>
    </div>

    <footerUI />
</template>

<script lang="ts">
import {
    defineComponent, onMounted, ref
} from 'vue'
import {
    useRouter
} from 'vue-router'
import headerUI from '@/components/headerUI.vue'
import footerUI from '@/components/footerUI.vue'
export default defineComponent({
    name: 'App',
    components: {
        headerUI,
        footerUI
    },
    setup () {
        const Height = ref(0)
        const router = useRouter()
        onMounted(() => {
            Height.value = document.documentElement.clientHeight - 100
        })
        // 換頁回到上方
        router.afterEach((to, from, next) => {
	        window.scrollTo(0, 0)
        })
        return {
            Height
        }
    }

})
</script>
<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

</style>
