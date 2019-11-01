<template>
    <div>
      <el-table :data="tableData" height="704"
      >
        <el-table-column prop="date" label="日期" >
        </el-table-column>
        <el-table-column prop="name" label="姓名" >
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
export default {
  name: 'indexOne',
  data () {
    const item = {
      date: '2019-07-04',
      name: '追魂',
      address: '山东省青岛市'
    }
    return {
      tableData: Array(20).fill(item)
    }
  }
}
</script>

<style scoped>

</style>
