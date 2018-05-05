<template>
  <div>
    <el-form ref="form" :model="form" labelWidth="80px">
      <el-row class="form-item-block">
        <el-col :span="12">
          <h3>基本信息</h3>
          <el-form-item label="名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" :rows="2" v-model="form.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="form-item-block">
        <el-col :span="12">
          <h3>权限配置</h3>
          <!-- :default-checked-keys="[4]"  -->
          <el-tree :data="menus" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current
                   :props="{children: 'children',label: 'name'}"></el-tree>
        </el-col>
      </el-row>
    </el-form>

    <el-row type="flex" class="toolbar down" justify="space-between">
      <div>
        <el-button type="primary" @click.stop="goBack">返回</el-button>
        <el-button type="primary" @click.stop="submit">保存</el-button>
      </div>
    </el-row>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';

  export default {
    data() {
      return {
        form: {}
      }
    },
    computed: {
      ...mapGetters(['menus'])
    },
    created() {
      if (this.$route.params.id) {
        this.$http.get('/role/' + this.$route.params.id).then(res => {
          this.form = res;
        });
      }
    },
    methods: {
      submit() {
        let keys = this.$refs.tree.getCheckedKeys();
        this.form.menuIds = keys;
        this.$refs['form'].validate((valid) => {
          if (!valid) {
            return false;
          }
          if (this.$route.params.id) {
            this.$http.put('/role/' + this.$route.params.id, this.form).then(res => {
              this.$message.success('修改成功');
              this.goBack();
            });
          } else {
            this.$http.post('/role', this.form).then(res => {
              this.$message.success('新增成功');
              this.goBack();
            });
          }
        });
      }
    }
  };
</script>
