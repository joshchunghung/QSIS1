<template>
    <div v-if="eventID != 0">eventID{{ eventID }}</div>
    <div id="building" v-if="siteID != 0">
        <svg height="600" width="600" viewbox="0,0,900,900">
            <g :transform="`translate(0,${buildingArray.height * (20 + 0.5)})`">
                <rect
                    v-for="index in [...Array(buildingArray.height).keys()]"
                    :key="index"
                    :x="0"
                    :y="-1 * (index + 1) * (20 + 0.5)"
                    :width="100"
                    :height="20"
                    :fill="'gray'"
                    :stroke="'red'"
                    stroke-width="0.5"
                ></rect>

                <!-- 地下室 -->
                <rect
                    v-for="index in [...Array(buildingArray.basement).keys()]"
                    :key="index"
                    :x="0"
                    :y="index * (20 + 0.5)"
                    :width="200"
                    :height="20"
                    :fill="'blue'"
                    :stroke="'red'"
                    stroke-width="0.5"
                ></rect>
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
        {{ buildingArray }}, siteID{{ siteID }},
    </div>
</template>

<script lang="ts">
import {
    computed, defineComponent
} from 'vue'
import {
    useStore
} from 'vuex'
export default defineComponent({
    name: 'buildingArrayUI',

    setup () {
        const store = useStore()
        const siteID = computed(() => store.getters.siteID)
        const eventID = computed(() => store.getters.targetEvent)
        const buildingArray = computed(() => store.getters.site)

        return {
            buildingArray,
            siteID,
            eventID
        }
    }
})
</script>
