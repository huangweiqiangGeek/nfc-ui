<template>
  <div>
    <el-row type="flex" class="toolbar top">
      <el-button type="primary" @click.stop="$router.push({path: '/dict/add'})">添加</el-button>
    </el-row>
    <el-table ref="table" :data="tableData">
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column prop="name" label="字典名" width="120"></el-table-column>
      <el-table-column prop="value" label="字典值" width="120"></el-table-column>
      <el-table-column prop="group" label="字典组" width="120"></el-table-column>
      <el-table-column label="操作" width="240">
        <template slot-scope="scope">
          <el-button @click.stop="$router.push({path: '/dict/edit/' + scope.row.id})">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row type="flex" class="toolbar down" justify="space-between">
      <div>
        <!--<el-button type="primary" @click.stop="delAll">批量删除</el-button>-->
      </div>
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
        imgPrefix: process.env.imgPrefix,
      };
    },
    computed: {},
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
        this.$http.get('/dict/' + this.page.current + '/' + this.page.size, {params: params}).then(res => {
          this.tableData = res.records;
          this.page.total = res.total;
          this.page.current = res.current;
          this.page.size = res.size;
        });
      },
      //批量删除
      delAll() {
        let selection = this.$refs['table'].selection;
        // 批量
        if (!selection.length) {
          this.$message.error('未选择记录');
          return;
        }
        let ids = selection.map(function (row) {
          return row.id;
        });
        console.log(ids)
      },
    }
  }
</script>
