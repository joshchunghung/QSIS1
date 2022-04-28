<template>
    <div>{{name}} {{ floor}}</div>
    <div>{{buildingArray.stations.filter((item) => item.floor === floor)}}</div>
    <svg height="300" width="600" viewBox="0 0 600 300">
        <foreignObject x="0" y="0" width="600" height="300">
            <img src="../../public/RCEC600x300.png"  alt="RCEC" />
        </foreignObject>
        <g v-for="station in buildingArray.stations.filter((item) => item.floor === floor)"   :key="station.code">
            <rect
                :x="station.rx"
                :y="station.ry"
                :width="10"
                :height="10"
                :fill="'red'"
                :stroke="'red'"
                stroke-width="0.5"
                @click="openFloor(-(index + 1))"
            ></rect>
            <text
                :x="station.rx"
                :y="station.ry - 10"
                text-anchor="middle"
            >
                {{station.code}}
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
export default defineComponent({
    name: 'floorMapViewUI',
    setup () {
        const store = useStore()
        const name = computed(() => store.getters.singleSiteName)
        const floor = computed(() => store.getters.floor)
        const buildingArray = computed(() => store.getters.singleSite)

        return {
            name,
            floor,
            buildingArray
        }
    }
})
</script>
