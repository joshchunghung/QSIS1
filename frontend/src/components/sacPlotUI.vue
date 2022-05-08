<template>
    <br />
    <div id="outer" class='container'>
        <div>station {{ sensor }}</div>
        <div id="sacplot"></div>
    </div>
</template>

<script lang="ts">
import {
    computed,
    defineComponent, onBeforeUpdate, onMounted, watch, watchEffect
} from 'vue'
import {
    sacPlots
} from './sacPlot.js'
import {
    useStore
} from 'vuex'
export default defineComponent({
    name: 'sacPlotUI',
    setup() {
        const store = useStore()
        const sensor = computed(() => store.getters.sensor)
        const event = computed(() => store.getters.targetEvent)

        onMounted(() => {
            const stationInfo = {
                sensor: sensor.value,
                date: event.value.date,
                time: event.value.time
            }
            const chart = sacPlots()
                .stationURLInfo(stationInfo)
                .data(['HNX', 'HNY', 'HNZ'])
                .title(`${sensor.value} ${event.value.date}${event.value.time}(UTC+8)`)
                .legend('HNX HNY HNZ')
                .selector('#sacplot')

            chart()
        })
        onBeforeUpdate(() => {
            document.getElementById('sacplot').remove()
            const newDiv = document.createElement('div')
            newDiv.id = 'sacplot'
            document.getElementById('outer').appendChild(newDiv)
            const stationInfo = {
                sensor: sensor.value,
                date: event.value.date,
                time: event.value.time
            }
            const chart = sacPlots()
                .stationURLInfo(stationInfo)
                .data(['HNX', 'HNY', 'HNZ'])
                .title(`${sensor.value} ${event.value.date}${event.value.time}(UTC+8)`)
                .legend('HNX HNY HNZ')
                .selector('#sacplot')

            chart()
        })
        return {
            sensor
        }
    }

})
</script>

<style scoped>
.chart {
    padding: 10px 15px;
}

.toggle-menu {
    position: relative;
    display: inline-block;
}

.toggle-menu ul.active {
    display: none;
}

.toggle-menu ul {
    position: absolute;
    top: 100%;
    right: 0;
    padding: 0;
    width: 200px;
    height: 200px;
    background-color: #fff;
    border: rgb(197, 197, 197) 1px solid;
    border-radius: 3px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
}

.toggle-menu li {
    display: block;
    float: none;
}

.toggle-menu li a {
    font-size: 16px;
    text-align: center;
    text-decoration: none;
    color: #777;
}

.toggle-menu li a:hover {
    color: #fff;
    background: #1abc9c;
}

.toggle-menu a {
    display: block;
}

.toggle-nav {
    display: inline-block;
    padding: 5px 9px 5px 10px;
    font-size: 20px;
    color: #777;
    border: rgb(197, 197, 197) 1px solid;
    border-radius: 3px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.5);
}

.toggle-nav:hover,
.toggle-nav.active {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.658);
}

.grid .tick {
    stroke: lightgrey;
    opacity: 0.7;
}

.brush .selection {
    stroke-width: 0;
}

.context_xAxis {
    opacity: 0.7;
}

text,
label,
a {
    user-select: none;
}

.yAxis .domain {
    stroke: none;
}
</style>
