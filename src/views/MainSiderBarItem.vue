<template>
  <div>
    <template v-for="(item,i) in menus">
      <el-menu-item class="one-menu" :index="item.path" v-if="item.type == 1">
        <i :class="item.icon"></i><span slot="title">{{item.name}}</span>
      </el-menu-item>
      <el-submenu class="one-menu" :index="item.path" v-else>
        <template slot="title">
          <i :class="item.icon"></i><span slot="title" class="title-span">{{item.name}}</span>
        </template>
        <main-sider-bar-item :menus="item.children"></main-sider-bar-item>
      </el-submenu>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'MainSiderBarItem',
    props: {
      menus: {}
    },
    data() {
      return {};
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
