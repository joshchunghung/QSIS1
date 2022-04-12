<template>
    <div class="about">
        <h1>This is an project detail page</h1>
        <div v-if="result && result.building">
            <h2 v-for=" building of result.building" :key="building.id">{{ building.id }},{{ building.name }}</h2>
        </div>
    </div>
</template>

<script lang="ts">
// import {
//     ref
// } from 'vue'
// import {
//     getBuilding
// } from '../schemas/building'
import {
    useQuery
} from '@vue/apollo-composable'
import gql from 'graphql-tag'
export default {
    setup () {
        const { result } = useQuery(gql`
    query building {
        building {
            id
            name
        }
    }
`)
        return {
            result
        }
    }
}
</script>
