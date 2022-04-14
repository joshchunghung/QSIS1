<template>
    <div class="about">
        <h1>This is an project detail page</h1>
        <div v-if="buildings">
            <h2 v-for=" building in buildings" :key="building.id">{{ building.id }},{{ building.name }}</h2>
        </div>
        <div v-else-if="error">Error: {{ error.message }}</div>
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
    useQuery, useResult
} from '@vue/apollo-composable'
import gql from 'graphql-tag'
export default {
    setup () {
        const { result, loading, error } = useQuery(gql`
    query getbuilding {
        building {
            id
            name
        }
    }
`)

        const buildings = useResult(result, null, data => data.building)
        return {
            buildings,
            loading,
            error
        }
    }
}
</script>
