<script>
export default {
  components: {},

  mounted() { },

  data() {
    return {
      title: '基础',
      message: 'Hello World',
      isRed: true,
      color: 'green',
      list: [1, 2, 3],
      showList: true,
      rawHtml: '<span style="color: red">This should be red.</span>',
      count: 0,
      inputText: '',
      mySourceCode: `<p>Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html: <span v-html="rawHtml"></span></p>`,
      isButtonDisabled: true,
      willShow: true,
      newTodo: '',
      todos: [
        { id: 1, text: 'Learn Vue.js', done: false },
        {
          id: 2,
          text: 'Build something awesome Build something awesome Build something awesome',
          done: false,
        },
        { id: 3, text: 'Share with the world', done: false },
      ],
    }
  },

  methods: {
    reverseText() {
      this.message = this.message.split(' ').reverse().join(' ')
    },

    appendText() {
      this.message += '!!!'
    },

    onClickedLink(e) {
      console.log('onClickedLink')
      alert('navigation was prevented.')
      //e.preventDefault()
    },

    toggleRed() {
      this.isRed = !this.isRed
    },
    toggleColor() {
      this.color = this.color === 'green' ? 'blue' : 'green'
    },
  },

  computed: {},
  watch: {},
}
</script>

<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <h3># 插值显示</h3>
    <p>{{ message }}</p>
    <h3># 处理用户输入</h3>
    <button @click="reverseText">Reverse Text</button>
    <button @click="appendText">Append !!!</button>
    <a href="https://www.baidu.com" @click.prevent="onClickedLink">
      A link with e.preventDefault()
    </a>

    <highlightjs language="html" :code="mySourceCode" />
    <div>
      <p>Using text interpolation: {{ rawHtml }}</p>
      <p>Using v-html: <span v-html="rawHtml"></span></p>
    </div>

    <h3># Attribute 绑定</h3>
    <p><button :disabled="isButtonDisabled">按钮</button></p>

    <p>
      <span :title="message">
        Hover your mouse over me for a few seconds to see my dynamically bound title!
      </span>
    </p>
    <p>
      <el-tooltip popper-class="my-el-tooltip" :content="message" placement="top"><span>鼠标悬停试试</span></el-tooltip>
    </p>
    <p :class="{ red: isRed }" @click="toggleRed">
      This should be red... but click me to toggle it.
    </p>
    <p :style="{ color }" @click="toggleColor">
      This should be green, and should toggle between green and blue on click.
    </p>

    <h3># 条件与循环</h3>
    <div class="btn-container">
      <button @click="showList = !showList">Toggle List</button>
      <button @click="list.push(list.length + 1)">Push Number</button>
      <button @click="list.pop()">Pop Number</button>
      <button @click="list.reverse()">Reverse List</button>
    </div>
    <ul v-if="showList">
      <li v-for="item in list" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: flex-start;
  width: 100%;
  min-height: 100vh;
  gap: 0px;
  padding: 0px 20px;
}

h1 {
  font-size: 36px;
  color: #333;
  margin-bottom: 0px;
}

h3 {
  margin-bottom: 0px;
}

button,
a {
  display: block;
  margin-top: 4px;
  margin-bottom: 4px;
}

.red {
  color: red;
}

.btn-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>
