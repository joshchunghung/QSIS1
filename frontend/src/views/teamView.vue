<template>
    <div class="team">
        <twMapUI />
        <ul class="nav nav-tabs ">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" @click.prevent="" href="#">active</a>
                <div v-if="buildingState && isArray">
                    <br />
                    <buildingArrayUI />
                </div>
                <div v-else-if="buildingState !== null && buildingState">
                    <br />
                    {{ isArray }}
                    <sacPlotUI />
                </div>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li>
        </ul>

        <div v-if="buildingState && isArray">
            <br />
            <buildingArrayUI />
        </div>
        <div v-else-if="buildingState !== null && buildingState">
            <br />
            {{ isArray }}
            <sacPlotUI />
        </div>

        <div v-if="floorMapViewState">
            <floorMapViewUI />
        </div>
        <div v-if="waveFormState">
            <sacPlotUI />
        </div>
    </div>
</template>

<script lang="ts">
import {
    computed,
    defineComponent,
    ref,
    watch
} from 'vue'
import twMapUI from '@/components/taiwanMapUI.vue' // @ is an alias to /src
import buildingArrayUI from '@/components/buildingArrayUI.vue'
import floorMapViewUI from '@/components/floorMapViewUI.vue'
import sacPlotUI from '@/components/sacPlotUI.vue'
import {
    useStore
} from 'vuex'
export default defineComponent({
    name: 'teamView',
    components: {
        twMapUI,
        buildingArrayUI,
        floorMapViewUI,
        sacPlotUI
    },
    setup() {
        const store = useStore()
        const buildingState = computed(() => store.getters.buildingState)
        const floorMapViewState = computed(() => store.getters.floorMapViewState)
        const waveFormState = computed(() => store.getters.waveFormState)
        const isArray = computed(() => store.getters.isArray)
        // console.log(isArray)

        return {
            buildingState,
            floorMapViewState,
            waveFormState,
            isArray
        }
    }
})
</script>
