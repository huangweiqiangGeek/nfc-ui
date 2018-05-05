<template>
  <el-container style="border: 1px solid #eee;height: 100%">
    <el-header height="60px" style="text-align: right; font-size: 12px">
      <div :class="['logo',isCollapse ? 'logo-collapse-width' : 'logo-width']">{{isCollapse ? '' : '后台管理系统'}}</div>
      <div class="middle">
        <!--<div class="tools" @click.prevent="isCollapse = !isCollapse">-->
        <!--<i class="fa fa-align-justify"></i>-->
        <!--</div>-->
      </div>
      <div class="userinfo">
        {{user.name}}
        <el-button @click.stop="logout">退出</el-button>
      </div>
    </el-header>

    <el-container>
      <main-sider-bar :isCollapse="isCollapse" :menus="menus"></main-sider-bar>
      <el-main>
        <transition name="fade" mode="out-in">
          <router-view :key="key"></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import {mapGetters} from 'vuex';
  import MainSiderBar from './MainSiderBar.vue';

  export default {
    name: 'Main',
    components: {MainSiderBar},
    data() {
      return {
        title: 'Main',
        isCollapse: false,
      }
    },
    computed: {
      ...mapGetters(['user', 'menus', 'routes']),
      key() {
        return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + new Date();
      },
    },
    methods: {
      logout() {
        this.$http.post('/logout').then(res => {
          this.$store.commit('SET_USER', '');
          this.$router.push('/login');
        });
      }
    },
    created() {
      console.log("vuex user", this.user);
    }
  }
</script>

<style lang="scss" scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    padding: 0px;

    > div {
      float: left;
    }

    .logo {
      text-align: center;
      height: 60px;
      font-size: 22px;
      border-right: solid 1px #e6e6e6;
    }
    .logo.logo-width {
      width: 200px;
    }
    .logo.logo-collapse-width {
      width: 60px
    }

    .middle {
      display: flex;
      .tools {
        padding: 0px 15px;
        width: 14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }

      .breadcrumb-inner.el-breadcrumb {
        line-height: 60px;
        color: #FFFFFF;
      }

      .el-breadcrumb__inner, .el-breadcrumb__inner a {
        color: #FFFFFF;
      }

      .my-breadcrumb-item:last-child .el-breadcrumb__inner {
        color: #FFFFFF;
      }
    }

    .userinfo {
      text-align: right;
      padding-right: 35px;
      height: 60px;
      float: right;
      cursor: pointer;
      img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin: 10px 0px;
        float: right;
      }
    }
  }

  .el-aside {
    color: #333;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    padding: 10px 15px;
    /*text-align: center;*/
    /*line-height: 160px;*/
  }
</style>

