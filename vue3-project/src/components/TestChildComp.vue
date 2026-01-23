<script>
import JSConfetti from 'js-confetti'

const confetti = new JSConfetti()

export default {
  emits: ['response'],
  props: {
    msg: String,
  },

  mounted() {},

  methods: {
    handleClick() {
      this.$emit('response', 'Hello event from Child Component!')
    },

    handleClick2() {
      confetti.addConfetti()
    },
  },
}
</script>

<template>
  <div class="container2">
    <h1>Test Child Component</h1>
    <div>This is a message from parent: {{ msg }}</div>
    <button @click="handleClick">Click to Emit Event</button>

    <p>
      <slot>Fallback content</slot>
    </p>


    <button @click="handleClick2">Congratulations!</button>
  </div>
</template>

<style lang="less" scoped>
.container2 {
  background-color: aquamarine;
}
</style>
