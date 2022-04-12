import gql from 'graphql-tag'
import {
    useQuery
} from '@vue/apollo-composable'
export const getBuilding = useQuery(gql`
    query building {
        building {
            id
            name
        }
    }
`)
