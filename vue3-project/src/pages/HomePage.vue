<script>
export default {
  components: {},

  // 生命周期钩子会在组件生命周期的各个不同阶段被调用
  // 例如这个函数就会在组件挂载完成后被调用
  mounted() {},

  // data() 返回的属性将会成为响应式的状态
  data() {
    return {
      title: '教程',
      list: [{ label: '基础', page:"BasicsPage"},{ label: '互动教程',page:"TutorialPage"},{ label: '实战',page:"PracticePage"}],
    }
  },

  // methods 是一些用来更改状态与触发更新的函数
  // 它们可以在模板中作为事件处理器绑定
  methods: {
    onClick(pageName) {
      console.log("#### clicked:" + pageName)
      this.$router.push({
        name: pageName,
      })
    }
  },
  computed: {},
  watch: {},
}
</script>

<template>
  <div class="container">
    <!-- 在双花括号中的内容并不只限于标识符或路径——我们可以使用任何有效的 JavaScript 表达式。 -->
    <h1>{{ title }}</h1>
    <div>
      <ul>
        <li v-for="(item, index) in list" :key="item.page">
          <router-link :to="{ name: item.page }" class="my-link">
            {{ item.label }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: start;
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

.my-link {
  text-decoration: none;
  color: blue;
  cursor: pointer;
}
.my-link:hover {
  text-decoration: underline;
}
</style>
