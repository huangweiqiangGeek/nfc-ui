<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import Vue from 'vue';
  Vue.prototype.goBack = function () {
//    let route = this.$route.matched[this.$route.matched.length - 2];
//    this.$router.push({path: route.path});
    window.history.go(-1);
  };
  export default {
    name: 'App'
  }
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    margin-top: 1px;
    width: 100%;
  }

  .toolbar {
    background: #fff;
    padding: 10px;
  }

  .toolbar.top {
    margin-bottom: 10px;
  }

  .toolbar.down {
    margin-top: 10px;
  }

  div.el-input {
    width: 150px;
  }

  .table-img {
    width: 100%;
    max-height: 60px;
  }

  .el-form {
    .form-item-block {
      background-color: #FFF;
      padding: 5px 10px;
      margin-bottom: 10px;
    }
  }
</style>
