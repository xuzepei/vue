<script>
import { marked } from 'marked'
import { debounce } from 'lodash-es'

export default {
  components: {},
  mounted() {},

  data() {
    return {
      input: '# Markdown编辑器',
    }
  },

  methods: {
    update: debounce(function (e) {
      this.input = e.target.value
    }, 300),
  },
  computed: {
    output() {
      return marked(this.input)
    }
  },
  watch: {},
}
</script>

<template>
  <div class="container2">
    <div class="editor">
      <textarea class="input" :value="input" @input="update"></textarea>
      <div class="output" v-html="output"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.editor {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
}

.input {
  flex: 1;
  height: 100%;
  padding: 20px;
  font-size: 16px;
  border: none;
  border-right: 1px solid #ccc;
  background-color: var(--editor-bg, #f9f9f9);
  outline: none;
  resize: none;
}

.output {
  flex: 1;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
}


code {
  color: #f66;
}
</style>
