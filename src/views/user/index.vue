<template>
  <div>
    <el-row type="flex" class="toolbar top">
      <el-button type="primary" @click.stop="$router.push({path:'/manager/user/add'})">添加</el-button>
    </el-row>
    <el-table ref="table" :data="tableData">
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column prop="username" label="账号"></el-table-column>
      <!--<el-table-column label="头像" width="60">-->
      <!--<template slot-scope="scope">-->
      <!--<img :src="imgPrefix + scope.row.avatar" class="table-img">-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">
          <template v-if="scope.row.gender == 0">保密</template>
          <template v-else-if="scope.row.gender == 1">男</template>
          <template v-else-if="scope.row.gender == 2">女</template>
          <template v-else>{{scope.row.gender}}</template>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="60">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.activated" type="success">正常</el-tag>
          <el-tag v-else type="danger">冻结</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="注册时间" width="160"></el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button @click.stop="$router.push({path: '/manager/user/edit/' + scope.row.id})">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row type="flex" class="toolbar down" justify="space-between">
      <div>
        <el-button type="primary" @click.stop="activated(false);">冻结</el-button>
        <el-button type="primary" @click.stop="activated(true);">恢复</el-button>
        <!--<el-button type="primary">删除</el-button>-->
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
        this.$http.get('/user/' + this.page.current + '/' + this.page.size, {params: params}).then(res => {
          console.log('res', res);
          this.tableData = res.records;
          this.page.total = res.total;
          this.page.current = res.current;
          this.page.size = res.size;
        });
      },
      activated(status) {
        let word = status ? '禁用' : '解禁';
        this.$confirm('确认 ' + word + ' 吗?').then(() => {
          let selection = this.$refs['table'].selection;
          // 批量
          if (!selection.length) {
            this.$message.error('未选择记录');
            return;
          }
          let ids = selection.map(function (row) {
            return row.id;
          });
          this.$http.post('/user/activated/' + status, ids).then(res => {
            this.$message.success(word + '成功');
            this.getTableData();
          }).catch(error => {
            this.$message.success(word + '失败');
          });
        });
      }
    }
  }
</script>
