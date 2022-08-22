<template>
<h2 class="text-start">Station Status</h2>
    <div>
        <VueGoodTable :columns="columns" :rows="data" :pagination-options="{
            enabled: true,
            mode: 'pages'
        }">
            <template #table-row="props">
                <span v-if="props.column.field == 'status'">
                    <span :class="props.row.status === 'Connected' ? 'green' : 'red'">{{ props.row.status }}</span>
                </span>
                <span v-else-if="props.column.field == 'ntpoffset'">
                    <span :class="offsetColor(props.row.ntpoffset)">{{ props.row.ntpoffset }}</span>
                </span>
                <span v-else>
                    {{ props.formattedRow[props.column.field] }}
                </span>
            </template>

        </VueGoodTable>
    </div>
</template>
<script lang="ts">
import axios from 'axios'
import {
    defineComponent, ref
} from 'vue'
import {
    VueGoodTable
} from 'vue-good-table-next'
export default defineComponent({
    name: 'stationINFO',
    components: {
        VueGoodTable
    },
    setup() {
        const columns = ref([
            {
                label: 'station',
                field: 'station'
            },
            {
                label: 'statusTime (UTC)',
                field: 'statusTime'
            },
            {
                label: 'status',
                field: 'status'
            },
            {
                label: 'ntpTime (UTC)',
                field: 'ntpTime'
            },
            {
                label: 'offset (s)',
                field: 'ntpoffset',
                type: 'number'
            }
        ])

        const data = ref([])
        axios.get('http://140.109.82.44:8000/api/stationInfo/')
            .then((response) => {
                data.value = response.data
            })
            .catch(err => console.log(err))
        
        const offsetColor = (offset)=>{
            if (Math.abs(offset) < 0.01){
                return 'black'
            } else if (Math.abs(offset) < 0.05) {
                return 'orange'
            } else {
                return 'red'
            }

        }
        return {
            columns,
            data,
            offsetColor
        }
    }
})
</script>

<style scope>
.green {
    color: green
}

.red {
    color: red
}

.orange{
    color:orangered
}

.black{
    color:black
}
</style>
