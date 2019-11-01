<template>
    <div class="navMenu">
      <el-menu :default-openeds="['1', '3']" :default-active="active" :router="true" >
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>导航一</template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="first" :route="{path:'/first'}">选择框</el-menu-item>
            <el-menu-item index="second" :route="{path:'/second'}">选择器</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组二">
            <el-menu-item index="1-3" :route="{path:'/form'}">form表单</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">弹窗</template>
            <el-menu-item index="1-4-1" :route="{path:'/tags'}">tags标签</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>导航二</template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="2-1" :route="{path:'/secondPrize'}">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>导航三</template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="3-4">
            <template slot="title">选项4</template>
            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </div>
</template>

<script>
export default {
  name: 'nav-menu',
  data () {
    return {
      active: '2',
      router: true,

    }
  },
  created () {
    this.active = this.$router.history.current.name
  }
}
</script>

<style scoped>

</style>
