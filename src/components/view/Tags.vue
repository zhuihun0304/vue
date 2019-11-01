<template>
    <div id="tags">
      <div>
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </div>
      <div class="message">
        <el-button :plain="true" @click="open1">成功</el-button>
        <el-button :plain="true" @click="open2">警告</el-button>
        <el-button :plain="true" @click="open3">消息</el-button>
        <el-button :plain="true" @click="open4">错误</el-button>
      </div>
      <div class="messageBox">
        <el-button type="text" @click="openMesage">点击打开 Message Box</el-button>
      </div>
      <div class="tabs">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
          <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>

<script>
export default {
  name: 'tags',
  data () {
    return {
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
      activeName: 'second'
    }
  },
  methods: {
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_=> {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    open1 () {
      this.$message({
        message: '恭喜你，这是一条成功消息',
        type: 'success',
        duration: '1000'
      })
    },
    open2 () {
      this.$message({
        message: '警告哦，这是一条警告消息',
        type: 'warning',
        duration: '1000'
      })
    },
    open3 () {
      this.$message({
        message: '这是一条消息',
        duration: '1000'
      })
    },
    open4 () {
      this.$message({
        message: '错了哦，这是一条错误信息',
        type: 'error',
        duration: '1000'
      })
    },
    openMesage () {
      this.$confirm('此操作将永久删除该文件，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功！'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleClick (tab, event) {
      console.log(tab,event)
    }
  }
}
</script>

<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  #tags {
    text-align: center;
    margin-top: 40px;
  }
  .message {
    margin-top: 40px;
  }
  .messageBox {
    margin-top: 40px;
  }
  .tabs {
    margin-top: 40px;
  }
</style>
