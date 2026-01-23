<script>
export default {
  props: {
    todo: Object
  },
  emits: ['update:text']
}
</script>

<template>
    <li>{{ todo.text }} <input :value="todo.text" @input="$emit('update:text', $event.target.value)" /></li>
</template>

<style lang="less" scoped>
li {
  margin: 6px;
}
</style>
