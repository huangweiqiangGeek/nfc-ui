<template>
  <el-pagination
    @size-change="function (val) {size = val;}"
    @current-change="function (val) {current = val;}"
    :current-page="current"
    :page-sizes="sizes"
    :page-size="size"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
</template>

<script>
  export default {
    props: {
      q: {}
    },
    data() {
      return {
        q: {},
        size: 10,
        current: 1,
        total: 0,
        sizes: [10, 20, 30, 40]
      }
    },
    watch: {
      current() {
      },
      size() {
      }
    },
    methods: {
      getTableData() {
        this.$http.get('/user/' + this.current + '/' + this.size, {params: this.q}).then(res => {
          console.log("res", res);
          this.tableData = data.rows;
          this.page.total = data.total;
          this.page.currentPage = data.currentPage;
          this.page.pageSize = data.pageSize;
        });
      },
    }
  }
</script>
<style scoped>
</style>
