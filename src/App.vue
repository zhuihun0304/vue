<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
  import loginApi from '@/api/login'

export default {
  name: 'App',
  data() {

  },
  created() {
    this.verify()
  },
  methods: {
    // 验证是否登陆
    verify() {
      const { history: { current: { path,fullPath,query } } } = this.$router;
      const loading = this.$loading({
        text: '加载中......'
      });
      loginApi.getUserInfo()
        .then((res) => {
          const data = res;
          console.log(data)
        })
        .catch(() => {
          loading.close()
        })


    }
  }

}
</script>

<style>
  body,ul,ol,p,h1,h2,h3,h4,h5,dl,dd,form,input,textarea,td,th,button,strong,em,select,video,canvas{margin:0;padding:0;}
  li{list-style:none;vertical-align:top;}
  table{ border-collapse:collapse;}
  textarea{resize:none;overflow:auto;}
  img{ border:none; vertical-align:middle;}
  em{ font-style:normal;}
  a{ text-decoration:none; color: #48576a;}
  a,input{ -webkit-tap-highlight-color:rgba(0,0,0,0);}
  input{outline:0px;}
  body{background:#f1f1f1; margin: 0; padding: 0; font-family:'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;}
  /* 公共样式 */
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    /*margin-top: 5px;*/
    min-width: 1100px;
  }
  .el-table .cell, .el-table th>div {
    padding:15px 0px;
    text-align: center;
  }
  .el-pagination {
    margin-top: 20px;
    text-align: right;
  }
  th > .cell {
    text-align: center;
  }
  .el-table {
    margin-top: 10px;
  }
  .el-form-item__content {
    text-align: left;
  }
  .el-form-item {
    margin-bottom: 22px;
  }
  .el-button--danger.is-disabled, .el-button--danger.is-disabled:hover, .el-button--danger.is-disabled:focus, .el-button--danger.is-disabled:active {
    opacity: 0.5;
  }
  .routerA{
    color: green;
  }
  .el-table__body-wrapper{
    text-align: center;
  }
  .demo-ruleForm {
    width: 460px;
  }
</style>
