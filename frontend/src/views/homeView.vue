<template>
    <div class="home">
        <twMap />
        <div v-if="buildingState">
            <buildingArrayUI />
        </div>
    </div>
</template>

<script lang="ts">
import {
    computed,
    defineComponent
} from 'vue'
import twMap from '@/components/taiwanMap.vue' // @ is an alias to /src
import buildingArrayUI from '@/components/buildingArrayUI.vue'
import {
    useStore
} from 'vuex'
export default defineComponent({
    name: 'HomeView',
    components: {
        twMap,
        buildingArrayUI
    },
    setup () {
        const store = useStore()
        const buildingState = computed(() => store.getters.buildingState)
        return {
            buildingState
        }
    }
})
</script>
