<template>
  <div>
    <el-form ref="form" :model="form" labelWidth="80px">
      <el-row class="form-item-block">
        <el-col :span="12">
          <h3>基本信息</h3>
          <el-form-item label="名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <!--<el-form-item label="头像">-->
          <!--<my-avatar-upload v-model="form.avatar"></my-avatar-upload>-->
          <!--</el-form-item>-->
          <el-form-item label="账号">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期" style="width:150px;"
                            value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="form.gender" :label="1">男</el-radio>
            <el-radio v-model="form.gender" :label="2">女</el-radio>
          </el-form-item>
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
  export default {
    data() {
      return {
        form: {
          username: 'ceshi',
          password: '123456',
          name: '测试',
          gender: 1
        }
      }
    },
    created() {
      if (this.$route.params.id) {
        this.$http.get('/user/' + this.$route.params.id).then(res => {
          this.form = res;
        });
      }
    },
    methods: {
      submit() {
        this.$refs['form'].validate((valid) => {
          if (!valid) {
            return false;
          }
          if (this.$route.params.id) {
            this.$http.put('/user/' + this.$route.params.id, this.form).then(res => {
              this.$message.success('修改成功');
              this.goBack();
            });
          } else {
            this.$http.post('/user', this.form).then(res => {
              this.$message.success('新增成功');
              this.goBack();
            });
          }
        });
      }
    }
  }
</script>
