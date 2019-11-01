<template>
    <div class="confirm-button">
      <el-button @click="getButtonClick">{{ text || '确认' }}</el-button>
    </div>
</template>

<script>
export default {
  name: 'Confirm',
  props: ['text'],
  data () {
    return {
      msg: true
    }
  },
  methods: {
    getButtonClick () {
      this.$emit('message', this.msg)
    }
  }
}
</script>

<style scoped>

</style>
