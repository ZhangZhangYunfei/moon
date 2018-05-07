<template>
  <div id="app" v-loading="isLoading">
    <router-view/>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'App',

    computed: {
      ...mapState(['isLoading'])
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 10px;
  }
</style>
