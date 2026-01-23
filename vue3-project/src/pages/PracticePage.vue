<script>
import MarkdownEditor from '@/components/MarkdownEditor.vue'
import MyTable from '@/components/MyTable.vue'

export default {
  components: {
    MarkdownEditor,
    MyTable,
  },
  mounted() {
    //解决刷新时每次都回到默认视图的问题
    // 1. 页面加载时，尝试从 URL 获取视图名称
    const params = new URLSearchParams(window.location.search);
    const view = params.get('view');

    // 2. 如果 URL 里有 view 参数，且在我们的 list 范围内，就切换过去
    if (view && this.list.some(item => item.view === view)) {
      this.currentView = view;
    }
  },

  data() {
    return {
      title: '实战',
      currentView: 'MarkdownEditor',
      list: [
        { label: 'Markdown编辑器', view: 'MarkdownEditor' },
        { label: '带有排序和过滤器的网格', view: 'MyTable' },
      ],
    }
  },

  methods: {
    onClick(viewName) {
      console.log('#### clicked:' + viewName)
      this.currentView = viewName

      // 3. 点击时，同步更新 URL，但不刷新页面
      const url = new URL(window.location);
      url.searchParams.set('view', viewName);
      window.history.pushState({}, '', url);
    },
  },
  computed: {},
  watch: {},
}
</script>

<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <div class="main-layout">
      <div class="sidebar">
        <ul>
          <li v-for="(item, index) in list" :key="item.view" @click="onClick(item.view)"
            :class="{ active: currentView === item.view }">
            {{ item.label }}
          </li>
        </ul>
      </div>

      <div class="view-area">
        <component :is="currentView"></component>
      </div>
    </div>
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
  padding: 0px 20px 20px;
  height: 100vh; /* 占满视口高度 */
  overflow: hidden; /* 防止出现双滚动条 */
}

.main-layout {
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: transparent;
  margin-top: 10px;
  margin-bottom: 0px;
  justify-self: start;
  border: 1px solid #ccc;
  flex: 1;         /* 关键：分配剩余所有空间 */
  overflow: hidden; /* 保证内部滚动不撑破布局 */
}

.sidebar {
  width: 250px;
  border-right: 1px solid #ddd;
  background-color: var(--system-gray6);
  margin: 0px;

  ul {
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    margin: 0;
  }

  li {
    background-color: transparent;
    cursor: pointer;
    padding: 10px;
    list-style: disc;
    margin-left: 20px;
    color: #333;

    &.active {
      color: black;
      font-weight: bold;
    }
  }
}

.view-area {
  flex: 1;
  padding: 0 0px;
  margin: 0px;
  background-color: transparent;
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
