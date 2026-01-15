<script>
import JSConfetti from 'js-confetti'

const confetti = new JSConfetti()

export default {
  emits: ['response'],
  props: {
    msg: String,
  },

  mounted() {
  },

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
  <h1>Test Child Component</h1>
  <div>This is a message from parent: {{ msg }}</div>
  <button @click="handleClick">Click to Emit Event</button>

  <slot>Fallback content</slot>

  <button @click="handleClick2">Congratulations!</button>
</template>
