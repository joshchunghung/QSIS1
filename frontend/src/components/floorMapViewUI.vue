<template>
    <br />

    <h3>{{ name }} {{ floor }}F</h3>
    <!-- <div>{{ buildingArray.stations.filter((item) => item.floor === floor) }}</div> -->
    <svg height="300" width="600" viewBox="0 0 600 300">
        <foreignObject x="0" y="0" width="600" height="300">
            <img :src="require('../../public/RCEC600x300.png')" alt="RCEC" />
        </foreignObject>
        <g v-for="station in buildingArray.stations.filter((item) => item.floor === floor)" :key="station.code">
            <rect :x="station.rx" :y="station.ry" :width="10" :height="10" :fill="pgaColor('station', station)"
                :stroke="'red'" stroke-width="0.5" @click="openWaveform(station.code)"></rect>
            <text :x="station.rx + 40" :y="station.ry" text-anchor="middle" class="sensorText">
                {{ station.code }}
            </text>
        </g>
    </svg>
</template>

<script lang="ts">
import {
    computed,
    defineComponent,
    ref
} from 'vue'
import {
    useStore
} from 'vuex'
import {
    pgaColor
} from './color.js'
export default defineComponent({
    name: 'floorMapViewUI',

    setup() {
        const store = useStore()
        const name = computed(() => store.getters.singleSiteName)
        const floor = computed(() => store.getters.floor)
        const buildingArray = computed(() => store.getters.singleSite)
        const openWaveform = (sensor) => {
            store.commit('changeWaveFormState', true)
            store.commit('getSensor', sensor)
        }
        return {
            name,
            floor,
            buildingArray,
            openWaveform,
            pgaColor
        }
    }
})
</script>
<style scoped>
rect:hover {
    cursor: pointer;
}

.sensorText {
    background-color: blue;
}
</style>
