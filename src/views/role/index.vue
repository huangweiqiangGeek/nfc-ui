<template>
  <div>
    <el-row type="flex" class="toolbar top">
      <el-button type="primary" @click.stop="$router.push({path:'/manager/role/add'})">添加</el-button>
    </el-row>
    <el-table ref="table" :data="tableData">
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="createUserId" label="创建者ID"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button @click.stop="$router.push({path: '/manager/role/edit/' + scope.row.id})">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row type="flex" class="toolbar down" justify="space-between">
      <div></div>
      <el-pagination
        @size-change="function (val) {page.size = val;}"
        @current-change="function (val) {page.current = val;}"
        :current-page="page.current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        q: {},
        page: {current: 1, size: 10, total: 0},
        tableData: [],
      };
    },
    computed: {
    },
    watch: {
      'page.current'() {
        this.getTableData();
      },
      'page.size'() {
        this.getTableData();
      }
    },
    created() {
      this.getTableData();
    },
    methods: {
      getTableData() {
        let params = this.q;
        this.$http.get('/role/' + this.page.current + '/' + this.page.size, {params: params}).then(res => {
          console.log('res', res);
          this.tableData = res.records;
          this.page.total = res.total;
          this.page.current = res.current;
          this.page.size = res.size;
        });
      },
    }
  }
</script>
