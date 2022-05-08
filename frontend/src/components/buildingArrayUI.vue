<template>
    <h4>{{ targetEvent.date }} {{ targetEvent.time }}(UTC+8), depth: {{ targetEvent.depth }}km, ML{{ targetEvent.ML }}
    </h4>
    <h3> Site: {{ name }}</h3>
    <div id="building">
        <svg height="300" width="600" viewbox="0,0,900,900">
            <g :transform="`translate(0,${buildingArray.height * (20 + 0.5)})`">
                <rect v-for="index in [...Array(buildingArray.height).keys()]" :key="index" :x="0"
                      :y="-1 * (index + 1) * (20 + 0.5)" :width="200" :height="20"
                      :fill="pgaColor('maxPGA', buildingArray.stations, index + 1)" :stroke="'red'" stroke-width="0.5"
                      @click="openFloor(index + 1)"
                ></rect>
                <text v-for="index in [...Array(buildingArray.height).keys()]" :key="index" :x="15"
                      :y="-1 * index * (20 + 0.7)" class="floorText"
                >
                    {{ index + 1 }}F,
                </text>
                <!-- 地下室 -->
                <rect v-for="index in [...Array(buildingArray.basement).keys()]" :key="index" :x="0"
                      :y="index * (20 + 0.5)" :width="200" :height="20"
                      :fill="pgaColor('maxPGA', buildingArray.stations, -(index + 1))" :stroke="'red'" stroke-width="0.5"
                      @click="openFloor(-(index + 1))"
                ></rect>
                <text v-for="index in [...Array(buildingArray.basement).keys()]" :key="index" :x="15"
                      :y="(index + 1) * (20 + 0.3)" class="floorText"
                >
                    B{{ index + 1 }}
                </text>
                <line x1="0" y1="0" x2="205" y2="0" style="stroke: rgb(0, 0, 0); stroke-width: 2" />
                <text x="210" align="center" y="0" fill="currentColor" text-anchor="start" alignment-baseline="middle"
                      font-weight="bold" font-size="15"
                >
                    ground
                </text>
            </g>
        </svg>
    </div>
    <!-- <div>{{ buildingArray }}</div> -->
</template>

<script lang="ts">
import {
    computed, defineComponent
} from 'vue'
import {
    useStore
} from 'vuex'
import {
    pgaColor
} from './color.js'
export default defineComponent({
    name: 'buildingArrayUI',

    setup () {
        const store = useStore()
        const buildingArray = computed(() => store.getters.singleSite)
        const name = computed(() => store.getters.singleSiteName)
        const targetEvent = computed(() => store.getters.targetEvent)
        const openFloor = (floor) => {
            store.commit('changeFloorMapViewState', true)
            store.commit('getFloor', floor)
            store.commit('changeWaveFormState', false)
        }
        return {
            buildingArray,
            name,
            pgaColor,
            openFloor,
            targetEvent
        }
    }
})
</script>

<style scoped>
/* svg :hover {
    fill: red;
} */
rect:hover {
    stroke-width: 1px solid black;
    cursor: pointer;
}

g .floorText {
    display: none;
}

g:hover .floorText {
    display: block;
}
</style>
