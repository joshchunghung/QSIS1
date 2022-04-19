<template>
    <div class="container">
        <div class="row">
            <div id="title" class="col-lg-9">
                <h2>RESIST</h2>
                <p>
                    REsilient Societies through Intelligent Smart-city Technology
                </p>
            </div>
            <div id="RCEC" class="col-lg-3">
                <!-- <img src="../public/RCEC.png" style="width: 200px;" alt="RCEC" align="right" /> -->
            </div>
        </div>
        <hr />

        <navList />
    </div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue'
import navList from '@/components/navList.vue'

export default defineComponent({
    name: 'App',
    components: {
        navList
    }
})
</script>
<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#title {
    padding: 30px 0 0 30px;
    text-align: left;
}

#RCEC {
    padding-top: 30px;
    padding-right: 40px;
}

h2 > p {
    padding: 0;
    margin: 0;
}
</style>
