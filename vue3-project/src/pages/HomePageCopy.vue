<script>
export default {
  data() {
    return {
      title: "教程",
      list: [
        { label: "基础", page: "BasicsPage" },
        { label: "互动教程", page: "TutorialPage" },
        { label: "实战", page: "PracticePage" },
      ],
    }
  }
}
</script>

<template>
  <div class="container">
    <h1>{{title}}</h1>
    <ul>
      <li v-for="(item, index) in list" :key="item.page">
        <router-link :to="{ name: item.page }" class="my-link">
          {{ item.label }}
        </router-link>
      </li>
    </ul>

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


.my-link {
  text-decoration: none;
  color: blue;
  cursor: pointer;
}
.my-link:hover {
  text-decoration: underline;
}
</style>
