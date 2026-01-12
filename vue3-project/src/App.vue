<script>

export default {
  data() {
    return {
      message: "Hello Vue 3!",
      titleClassName: "main-title",
    }
  },
}

</script>

<template>
  <h1 :class=titleClassName>{{ message }}</h1>
</template>

<style scoped>

.main-title {
  color: #42b983;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: normal;
  line-height: 1.5;
  font-size: 48px;
  text-align: center;
  margin-top: 40vh;
}

</style>
