<template>
  <div id="app">
    <VariousPlayer jsonPath="./Animal.json" imagePath="./Animal.png"/>
  </div>
</template>

<script>
import VariousPlayer from './components/VariousPlayer.vue'

export default {
  name: 'app',
  components: {
    VariousPlayer
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
  margin-top: 60px;
}
</style>
