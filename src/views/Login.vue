<template>
  <div>
    <vue-particles
      color="#35B39A"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="5"
      linesColor="#AFCF62"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <el-form :model="form" :rules="rules" ref="form" label-position="left" label-width="0px"
             class="demo-ruleForm login-container">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="form.username" auto-complete="off" placeholder="账号" style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="form.password" auto-complete="off" placeholder="密码"
                  style="width: 100%"></el-input>
      </el-form-item>
      <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="login" :loading="logining">登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        logining: false,
        form: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {required: true, message: '请输入账号', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ]
        },
        checked: true
      };
    },
    methods: {
      login() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.logining = true;
            this.$http.postForm('login', this.form).then(({code, msg}) => {
              this.logining = false;
              this.$router.push({path: '/'});
            }).catch(errorMsg => {
              this.logining = false;
              this.$message.error(errorMsg);
            });
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    position: absolute;
    top: 180px;
    left: 50%;
    margin-left: -245px;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
    .el-checkbox__input.is-checked.is-focus .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: #5DB431;
      border-color: #5DB431;
    }
  }
  #particles-js {
    background: url("../assets/bgImg.jpg") no-repeat;
    background-size: cover;
  }
</style>
