<template>
    <br />
    <div>station: {{ sensor }}, PGA-3comp: {{ stationInfo.pga3comp }}gal</div>
    <br />
    <div id="sacplot" class="container"></div>
</template>

<script lang="ts">
import {
    computed, defineComponent, onBeforeUpdate, onMounted, reactive, ref
} from 'vue'
import {
    sacPlots
} from './sacPlot.js'
import {
    useStore
} from 'vuex'
import axios from 'axios'
export default defineComponent({
    name: 'sacPlotUI',
    setup () {
        const store = useStore()
        const sensor = computed(() => store.getters.sensor)
        const event = computed(() => store.getters.targetEvent)
        const isArray = computed(() => store.getters.isArray)
        const stationInfo = computed(() => store.getters.stationInfo)
        let plotData = reactive([])
        console.log(stationInfo.value)
        // function download(data, fileName) {
        //     if (!data) {
        //         return
        //     }
        //     let url = window.URL.createObjectURL(new Blob([data]))
        //     let link = document.createElement('a')
        //     link.style.display = 'none'
        //     link.href = url
        //     link.setAttribute('download', fileName)

        //     document.body.appendChild(link)
        //     link.click()
        //     link.remove()
        // }
        // const downloadData = (chn) => {
        //     const filename = `${event.value.date.toString().replace("-", "")}${event.value.time.toString().replace(":", "")}.${sensor.value}.${chn}.csv`
        //     axios.post('http://140.109.82.44:8000/api/download/', { sensor: sensor.value, date: event.value.date, time: event.value.time, chn: chn }, { responseType: 'blob' })
        //         .then(response => download(response.data, filename))
        //         .catch(error => console.log(error))
        // }
        // const uploadAllData = () => {
        //     ['HNX', 'HNY', 'HNZ'].forEach((chn) => downloadData(chn))
        // }

        const stationURLInfo = computed(() => {
            return {
                sensor: sensor.value,
                date: event.value.date,
                time: event.value.time
            }
        })

        function sacPlotData (Data) {
            const tmpDataX = Data[0].time.map((time, i) => {
                return {
                    x: time,
                    y: Data[0].ampX[i]
                }
            })
            const tmpDataY = Data[0].time.map((time, i) => {
                return {
                    x: time,
                    y: Data[0].ampY[i]
                }
            })
            const tmpDataZ = Data[0].time.map((time, i) => {
                return {
                    x: time,
                    y: Data[0].ampZ[i]
                }
            })
            let raw
            raw = [{
                0: tmpDataX
            }, {
                1: tmpDataY
            }, {
                2: tmpDataZ
            }]
            const meanArr = raw.map((data, i) => d3.mean(data[i], (d) => d.y))

            const demeanArray = raw.map((data, i) =>
                data[i].map(
                    (d) =>
                        new Object({
                            x: d.x,
                            y: d.y - meanArr[i]
                        })
                )
            )

            const [Xmin, Xmax] = d3.extent(Data[0].ampX)
            const [Ymin, Ymax] = d3.extent(Data[0].ampY)
            const [Zmin, Zmax] = d3.extent(Data[0].ampZ)
            const maxAmpX = -1 * Xmin > Xmax ? -1 * Xmin : Xmax
            const maxAmpY = -1 * Ymin > Ymax ? -1 * Ymin : Ymax
            const maxAmpZ = -1 * Zmin > Zmax ? -1 * Zmin : Zmax
            const maxAmpArr = [maxAmpX, maxAmpY, maxAmpZ]

            const self = demeanArray.map(
                (data, i) =>
                    new Object({
                        fileName: 'test',
                        data: data.map(
                            (d) =>
                                new Object({
                                    x: d.x,
                                    y: d.y / maxAmpArr[i]
                                })
                        )
                    })
            )
            raw = [
                {
                    fileName: 'test',
                    data: demeanArray[0]
                },
                {
                    fileName: 'test',
                    data: demeanArray[1]
                },
                {
                    fileName: 'test',
                    data: demeanArray[2]
                }
            ]
            return {
                raw,
                self
            }
        }

        function callData (isArray, stationURLInfo) {
            let url
            if (isArray.value) {
                url = 'http://140.109.82.44:8000/api/onlineWave/qsis/'
            } else {
                url = 'http://140.109.82.44:8000/api/onlineWave/palert/'
            }
            axios.post(url, stationURLInfo.value)
                .then((response) => {
                    plotData = []
                    plotData.push(response.data)
                    const data = sacPlotData(plotData)
                    //  console.debug("title", data)
                    // console.debug("stationURLInfo", stationURLInfo)
                    const chart = sacPlots()
                        .data(data)
                        .title(
                            `${stationURLInfo.value.sensor} ${stationURLInfo.value.date}${stationURLInfo.value.time}(UTC+8)`
                        )
                        .legend('HLX HLY HLZ')
                        .selector('#sacplot')
                    chart()
                    store.commit('changeLoading', false)
                })
        }

        onMounted(() => {
            store.commit('changeLoading', true)
            callData(isArray, stationURLInfo)
        })
        onBeforeUpdate(() => {
            store.commit('changeLoading', true)
            console.log('update')
            callData(isArray, stationURLInfo)
        })

        return {
            sensor,
            // uploadAllData,
            plotData,
            stationInfo
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
