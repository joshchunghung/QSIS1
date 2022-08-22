<template>
    <nav id="navList" class="navbar sticky-top shadow-sm navbar-expand-lg navbar-dark py-1 py-lg-0 px-lg-5">
        <router-link to='/' class="navbar-brand d-block d-lg-none">
            <h1 class="display-4 text-white text-uppercase m-0">RESIST</h1>
        </router-link>

        <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-center" id="navbarCollapse">
            <div class="navbar-nav ml-auto py-0">
                <router-link to='/seis' class="nav-item nav-link">Seis</router-link>
                <router-link to='/stationINFO' class="nav-item nav-link">stationInfo</router-link>
                <a  class="nav-item nav-link">Testimonial</a>
                <a  class="nav-item nav-link">Contact</a>
            </div>

            <div  class="color navbar-brand px-4 mx-3 d-none d-lg-block">
                <router-link to='/'>
                    <h1 class="myMouse display-4 text-white text-uppercase m-0">RESIST</h1>
                </router-link>
            </div>
            <div class="navbar-nav mr-auto py-0">

                <a  class="nav-item nav-link">Team</a>
                <a  class="nav-item nav-link">FAQs</a>
                <router-link to='/register' class="nav-item nav-link">Log In</router-link>
                <a  class="nav-item nav-link">Contact</a>
            </div>
        </div>
    </nav>

</template>
<script lang="ts">
import {
    defineComponent
} from 'vue'
export default defineComponent({
    name: 'headerUI'
})
</script>
<style scoped>
#navList {
    background-color: #22395d ;
}

.color {
    background-color:#009CFF
}
.navbar-dark .navbar-nav .nav-link:hover,
.navbar-dark .navbar-nav .nav-link.active {
  color: #DBBC42;
}

.myMouse{
    cursor: pointer;
}

a {
    text-decoration:none;
}

</style>
<style>
.footer {
  height: 50px; /*設定footer本身高度*/
  background-color: yellow;
}
</style>
