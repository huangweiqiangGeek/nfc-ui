<template>
  <div>
    <el-row type="flex" class="toolbar top">
      <el-col :span="24">
        <h3>字典信息</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form :model="dictForm" status-icon ref="ruleForm2" label-width="100px" class="tagInfo">
          <el-form-item label="字典名" prop="name" :rules="[{ required: true, message: '字典名不能为空'}]">
            <el-input type="text" v-model="dictForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="字典值" prop="value" :rules="[{ required: true, message: '字典值不能为空'}]">
            <el-input type="text" v-model="dictForm.value" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="字典组" prop="group" :rules="[{ required: true, message: '字典组不能为空'}]">
            <el-input v-model="dictForm.group"></el-input>
          </el-form-item>
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
        dictForm: {},
      };
    },
    created() {
      if (this.$route.params.id) {
        this.$http.get('/dict/' + this.$route.params.id).then(res => {
          this.dictForm = res;
        });
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.$route.params.id){
              this.$http.put('/dict/' + this.$route.params.id, this.dictForm).then(res => {
                this.$message.success('修改成功');
                this.goBack();
              });
            }else {
              this.$http.post('/dict', this.dictForm).then(res => {
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
