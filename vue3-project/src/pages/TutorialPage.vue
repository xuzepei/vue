<script>
import TestChildComp from '@/components/TestChildComp.vue'

export default {
  components: {
    TestChildComp,
  },

  mounted() {
    console.log(this.$refs.pElementRef)
  },

  data() {
    return {
      message: 'Hello Cool!',
      titleClassName: 'main-title',
      count: 0,
      inputText: '',
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
    increase() {
      this.count += 1
    },
    onInput(event) {
      this.inputText = event.target.value
    },
    toggle() {
      this.willShow = !this.willShow
    },
    addTodo() {
      if (this.newTodo.trim() !== '') {
        this.todos.push({
          id: this.todos.length + 1,
          text: this.newTodo.trim(),
          done: false,
        })
        this.newTodo = ''
      }
    },
    removeTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id)
    },
    responseEventHandler(msg) {
      console.log('Event received from child:', msg)
    },
  },

  computed: {
    filteredTodos() {
      return this.todos.filter((todo) => !todo.done)
    },
  },
  watch: {
    inputText(newVal) {
      console.log('Input text changed to:', newVal)
    },
  },
}
</script>

<template>
  <div class="container">
    <!-- <h1 :class="titleClassName" v-if="willShow">{{ message }} {{ count }}</h1> -->

    <TestChildComp :msg="inputText" @response="responseEventHandler">Message: {{ message }} from Parent Component
    </TestChildComp>

    <h1 :class="[titleClassName, { 'is-hidden': !willShow }]">{{ message }} {{ count }}</h1>
    <button class="button1" @click="increase">Click Me</button>
    <input v-model="inputText" placeholder="Edit message" />
    <input :value="inputText" @input="onInput" placeholder="Edit message" />
    <p>Input Text: {{ inputText }}</p>
    <button @click="toggle">
      {{ willShow ? 'Hide' : 'Show' }}
    </button>

    <form class="todo-form" @submit.prevent="addTodo">
      <input class="new-todo-input" v-model="newTodo" placeholder="New todo" />
      <button class="add-todo-button" type="submit">Add Todo</button>

      <ul>
        <li v-for="todo in filteredTodos" :key="todo.id">
          <input class="my-checkbox" type="checkbox" v-model="todo.done" />
          <span :class="['todo-text', { 'is-done': todo.done }]">{{ todo.text }}</span>
          <button class="remove-btn" @click="removeTodo(todo.id)">X</button>
        </li>
      </ul>
    </form>

    <p ref="pElementRef">Hello</p>
  </div>
</template>

<style lang="less" scoped>
.container {
  display: flex;
  /* 开启 Flex 模式 */
  flex-direction: column;
  /* 让子元素纵向排列 (如果不加，h1 和 button 会并排) */
  justify-content: center;
  /* 在主轴（垂直方向）上居中 */
  align-items: center;
  /* 在交叉轴（水平方向）上居中 */

  width: 100%;
  /* 占满宽度 */
  min-height: 100vh;
  /* 可选：如果你想让内容相对于整个屏幕高度布局 */
  gap: 20px;
}

.main-title {
  color: var(--primary-color);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: normal;
  line-height: 1.5;
  font-size: 48px;
  text-align: center;
}

.is-hidden {
  visibility: hidden;
}

.button1 {
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.todo-form {
  background-color: white;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.new-todo-input {
  width: calc(500 / 768 * 100vw);
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: var(--font-size-input);
  height: 40px;
  caret-color: var(--primary-color);

  // 关键代码：焦点状态
  &:focus {
    outline: none;
    /* 1. 去掉浏览器默认的蓝色/黑色外轮廓 */
    border-color: var(--primary-color);
    /* 2. 使用你的全局变量颜色 */

    /* 可选：增加一点发光效果，让输入框更有“被激活”的感觉 */
    box-shadow: 0 0 5px rgba(66, 165, 245, 0.2);
  }

  &::placeholder {
    font-size: var(--font-size-input);
    font-weight: 400;
    color: var(--system-gray4);
    /* 使用你定义的灰色变量 */
    opacity: 1;
    /* Firefox 默认会降低透明度，设为 1 确保颜色准确 */
  }
}

.add-todo-button {
  padding: 8px 16px;
  margin-bottom: 20px;
  background: var(--primary-gradient);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: var(--primary-gradient-hover);
  }
}

ul {
  list-style: none;
  padding: 0;
  /* 清除元素内部的内边距 */
  width: 100%;
  /* 确保列表占满表单宽度 */
  margin-top: 30px;
  width: calc(500 / 768 * 100vw);
}

li {
  display: flex;
  align-items: center;
  /* 垂直方向对齐 */
  width: 100%;
  /* 必须撑满父容器 */
  margin-bottom: 8px;
  border-bottom: 1px solid #eee;
  /* 可选：加个底边线方便观察对齐 */
  padding-bottom: 4px;
}

/* 之前设置的圆点 */
li::before {
  content: '•';
  color: #42b983;
  font-weight: bold;
  margin-right: 10px;
  flex-shrink: 0;
  /* 防止圆点被挤压 */
}

.todo-text {
  flex: 1;
  /* 关键：自动伸展占据剩余所有空间 */
  text-align: left;
  /* 确保文字靠左 */
  word-break: break-all;
  /* 防止长单词撑破布局 */
  color: var(--primary-color);

  /* 核心代码 */
  display: -webkit-box;
  /* 必须结合 box 模型 */
  -webkit-box-orient: vertical;
  /* 设置盒子方向为垂直 */
  -webkit-line-clamp: 2;
  /* 关键：限制显示的行数（这里设为 2） */
  overflow: hidden;
  /* 隐藏超出行数的内容 */

  &.is-done {
    text-decoration: line-through;
    color: var(--system-gray4);
  }
}

.remove-btn {
  flex-shrink: 0;
  /* 防止按钮被挤压变型 */
  margin-left: 20px;
  /* 按钮与文字之间的最小间距 */
  /* 设置固定宽度可以确保按钮在垂直方向上绝对对齐 */
  width: 30px;
  height: 30px;
  cursor: pointer;
}
</style>
