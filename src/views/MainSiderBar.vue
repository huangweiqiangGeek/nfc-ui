<template>
  <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :unique-opened="false" :collapse="isCollapse"
           background-color="#FFFFFF"
           text-color="#303133"
           active-text-color="#409EFF"
           router>
    <main-sider-bar-item :menus="menus"></main-sider-bar-item>
  </el-menu>
</template>

<script>
  import MainSiderBarItem from './MainSiderBarItem.vue';

  export default {
    components: {MainSiderBarItem},
    props: {
      isCollapse: {},
      menus:{}
    },
    data() {
      return {
      };
    },
    computed: {},
    methods: {}
  }
</script>
<style lang="scss">
  $min-height: 1000px;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: $min-height;
  }

  .el-menu-vertical-demo.el-menu--collapse {
    width: 60px;
    min-height: $min-height;
  }

  .el-menu-vertical-demo {
    float: left;
  }
</style>
