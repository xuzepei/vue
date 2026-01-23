<script>
import GridView from '@/components/GridView.vue'

export default {
  components: {
    GridView,
  },
  mounted() {},

  data() {
    return {
      title: '表格',
      searchQuery: '',
      gridColumns: ['name', 'power'],
      gridData: [
        { name: 'Chuck Norris', power: Infinity },
        { name: 'Bruce Lee', power: 9000 },
        { name: 'Jackie Chan', power: 7000 },
        { name: 'Jet Li', power: 8000 }
      ]
    }
  },
  methods: {},
  computed: {},
  watch: {},
}
</script>

<template>
  <div class="container2">
    <form id="search">
      Search <input name="query" v-model="searchQuery">
    </form>
    <GridView :data="gridData" :columns="gridColumns" :filter-key="searchQuery">
    </GridView>
  </div>
</template>

<style lang="less" scoped>

  .container2 {
    padding: 20px;
    width: 100%;
  }

#search {
  margin: 20px 0px;
}

</style>
