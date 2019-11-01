<template>
    <div class="commonTop" id="common_top">
      <el-row>
        <el-col :span="24">
          <el-row class="grid-content bg-purple-dark">
            <el-col :span="18">
              <div style="display:flex;align-content: center;">
                <div class="mimi-admin">
                  SYSTEM
                </div>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="sigin-out">
                <span>{{this.newData}}</span>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="sigin-out">
                <span>{{this.currentUser}}</span>
              </div>
            </el-col>
            <el-col :span="1">
              <div class="sign-out">
                <el-button type="text" @click="siginOut">退出</el-button>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

    </div>
</template>

<script>
export default {
  name: 'common-top',
  data () {
    return {
      newData: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
      currentUser: '追魂'
    }
  },
  methods: {
    siginOut () {
      this.$router.push('/')
      console.log('成功')
    }
  }
}
</script>

<style scoped>

</style>
