<template>
  <div class="index" id="index" ref="index">
    <el-container>
        <el-header>
          <!--<el-dropdown>-->
          <!--<i class="el-icon-setting" style="margin-right: 15px"></i>-->
          <!--<el-dropdown-menu slot="dropdown">-->
          <!--<el-dropdown-item>查看</el-dropdown-item>-->
          <!--<el-dropdown-item>新增</el-dropdown-item>-->
          <!--<el-dropdown-item>删除</el-dropdown-item>-->
          <!--</el-dropdown-menu>-->
          <!--</el-dropdown>-->
          <!--<span>王小虎</span>-->
          <CommonTop></CommonTop>
        </el-header>
      <el-container>
        <el-aside>
          <NavMenu></NavMenu>
        </el-aside>
        <el-main>

          <router-view></router-view>

        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>
import NavMenu from '@/components/sub/NavMenu'
import CommonTop from '@/components/sub/CommonTop'

export default {
  name: 'index',
  data () {
    return {
    }
  },
  components: {
    NavMenu,
    CommonTop
  }
}
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    text-align: right;
  }

  .el-aside {
    color: #333;
  }
  .el-table {
    margin-top: 0;
  }
  .el-main {
    padding-top: 0;
  }
  .el-table .cell, .el-table th>div {
    text-align: center;
  }
</style>
