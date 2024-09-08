<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" width="100" height="100"> -->
  <MyHelloWorld :msgInProps="greeting" @response="fromChildResponse" />
  <div> {{ childMsg || 'No child msg yet' }}</div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import MyHelloWorld from './components/MyHelloWorld.vue'

export default {
  name: 'App',
  components: {
    MyHelloWorld,
  },
  data() { 
    return {
      greeting: "Hello from parent.",
      childMsg: null,
    }
  },
  methods: {
    fromChildResponse(msg) { 
      console.log("fromChildResponse: " + msg)
      this.childMsg = msg
    },
  },
  mounted() { 
    console.log('App has been mounted!');
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin-top: 60px;
}
</style>
