<template>
  <div>
    <el-row type="flex" class="toolbar top">
      <el-col :span="24">
        <h3>标签信息</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form :model="tagForm" status-icon ref="ruleForm2" label-width="100px" class="tagInfo">
          <el-form-item label="标签名" prop="name" :rules="[{ required: true, message: '标签名不能为空'}]">
            <el-input type="text" v-model="tagForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="标签说明" prop="remark" :rules="[{ required: true, message: '标签说明不能为空'}]">
            <el-input type="text" v-model="tagForm.remark" auto-complete="off"></el-input>
          </el-form-item>
          <!--<el-form-item label="标签商户数" prop="remark" :rules="[{ required: true, message: '标签商户数不能为空'}]">
            <el-input v-model="tagForm.remark"></el-input>
          </el-form-item>-->
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";

  export default {
    components: {
      ElCol,
      ElRow},
    data() {
      return {
        tagForm: {},
      };
    },
    created() {
      if (this.$route.params.id) {
        this.$http.get('/tag/' + this.$route.params.id).then(res => {
          this.tagForm = res;
        });
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.$route.params.id){
              this.$http.put('/tag/' + this.$route.params.id, this.tagForm).then(res => {
                this.$message.success('修改成功');
                this.goBack();
              });
            }else {
              this.$http.post('/tag', this.tagForm).then(res => {
                this.$message.success('新增成功');
                this.goBack();
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped lang="scss">
  .tagInfo{
    background: #ffffff;
    padding: 20px 0 20px 0;
  }
</style>
