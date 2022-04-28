<template>
    <div>{{ name }}</div>
    <div id="building">
        <svg height="300" width="600" viewbox="0,0,900,900">
            <g :transform="`translate(0,${buildingArray.height * (20 + 0.5)})`">
                <rect
                    v-for="index in [...Array(buildingArray.height).keys()]"
                    :key="index"
                    :x="0"
                    :y="-1 * (index + 1) * (20 + 0.5)"
                    :width="200"
                    :height="20"
                    :fill="color(index + 1)"
                    :stroke="'red'"
                    stroke-width="0.5"
                    @click="openFloor(index + 1)"
                ></rect>
                <text
                    v-for="index in [...Array(buildingArray.height).keys()]"
                    :key="index"
                    :x="15"
                    :y="-1 * (index) * (20 + 0.3)"
                    class="text"
                >
                    {{index + 1}}F,
                </text>
                <!-- 地下室 -->
                <rect
                    v-for="index in [...Array(buildingArray.basement).keys()]"
                    :key="index"
                    :x="0"
                    :y="index * (20 + 0.5)"
                    :width="200"
                    :height="20"
                    :fill="color(-(index + 1))"
                    :stroke="'red'"
                    stroke-width="0.5"
                    @click="openFloor(-(index + 1))"
                ></rect>
                <text
                    v-for="index in [...Array(buildingArray.basement).keys()]"
                    :key="index"
                    :x="15"
                    :y="(index+1) * (20 + 0.3)"
                    class="text"
                >
                    B{{index + 1}}
                </text>
                <line
                    x1="0"
                    y1="0"
                    x2="300"
                    y2="0"
                    style="stroke: rgb(0, 0, 0); stroke-width: 2;"
                />
                <text
                    x="305"
                    align="center"
                    y="0"
                    fill="currentColor"
                    text-anchor="start"
                    alignment-baseline="middle"
                    font-weight="bold"
                    font-size="15"
                >
                    ground
                </text>
            </g>
        </svg>
    </div>
    <div>{{buildingArray}}</div>
</template>

<script lang="ts">
import {
    computed, defineComponent
} from 'vue'
import {
    useStore
} from 'vuex'
import {
    colorTable
} from '../../public/data/pgaColorBar'
export default defineComponent({
    name: 'buildingArrayUI',

    setup () {
        const store = useStore()
        const buildingArray = computed(() => store.getters.singleSite)
        const name = computed(() => store.getters.singleSiteName)

        const color = (floor) => {
            let maxPga = -1
            buildingArray.value.stations
                .filter((item) => item.floor === floor)
                .forEach((sta) => {
                    if (sta.pga3comp > maxPga) {
                        maxPga = sta.pga3comp
                    }
                })

            if (maxPga === -1) {
                return 'grey'
            } else {
                const colorArray = colorTable.filter((item) => item[0] <= maxPga)
                const [_, ...targetColor] = colorArray[colorArray.length - 1]
                return `rgb(${targetColor})`
            }
        }

        const openFloor = (floor) => {
            store.commit('changeFloorMapViewState', true)
            store.commit('getFloor', floor)
        }
        return {
            buildingArray,
            name,
            color,
            openFloor
        }
    }
})
</script>

<style scoped>
/* svg :hover {
    fill: red;
} */
svg:hover {
    stroke-width: 1px solid black;
    cursor: pointer;
}

g .text {
    display: none;
}

g:hover .text {
    display: block;
}
</style>
