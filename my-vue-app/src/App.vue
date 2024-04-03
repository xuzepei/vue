<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" width="100" height="100"> -->
  <MyHelloWorld/>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import MyHelloWorld from './components/MyHelloWorld.vue'

export default {
  name: 'App',
  components: {
    MyHelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
