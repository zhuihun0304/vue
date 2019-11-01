<template>
  <div>
    <div class="first-app title" @click="toSecond">
      {{msg}}
      <!--<confirm text="注册" @message="getMeaasge"></confirm>-->
      <!--<p>-->
      <!--<router-link to="/second">去第二个页面</router-link>-->
      <!--</p>-->
      <!--<p>-->
      <!--<router-link to="/">返回首页</router-link>-->
      <!--</p>-->
    </div>
    <div class="radio-center">
      <el-radio-group v-model="radio">
        <el-radio :label="3">备选项</el-radio>
        <el-radio :label="6">备选项</el-radio>
        <el-radio :label="9">备选项</el-radio>
      </el-radio-group>
    </div>
    <div class="radio-center">
      <el-radio-group v-model="radio1" @change="changeRadio1">
        <el-radio-button label="上海"></el-radio-button>
        <el-radio-button label="北京"></el-radio-button>
        <el-radio-button label="广州"></el-radio-button>
        <el-radio-button label="深圳"></el-radio-button>
      </el-radio-group>
    </div>
    <div class="checked">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" >
        全选
      </el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="radio-center">
      <el-row>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </el-row>
      <el-row>
        <el-input type="textarea" :row="4" placeholder="文本内容" v-model="textarea"></el-input>
      </el-row>
    </div>
    <div class="radio-center">
      <el-select v-model="value1" multiple placeholder="请选择" @change="handleChangeSelect">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="radio-center">
      <el-input-number v-model="num" controls-position="right" @change="handleChangeNumber" :min="1" :max="10"></el-input-number>
    </div>
    <div class="radio-center">
      <el-switch
        v-model="valueSwich"
        active-text="按月付费"
        inactive-text="按年付费"
        inactive-color="#ff4949"
        active-color="#13ce66"
      >

      </el-switch>
    </div>

  </div>
</template>

<script>
import Confirm from '../sub/Confirm'
// const cityOptions = ['上海', '北京', '广州', '深圳']

export default {
  name: 'First',
  components: {
    Confirm
  },
  data () {
    return {
      msg: 'Welcome to FirstApp',
      radio1: '上海',
      radio: 3,
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: [],
      isIndeterminate: true,
      input: '',
      textarea: '',
      num: 1,
      options: [],
      value1: [],
      valueSwich: true
    }
  },
  created () {
    this.fectchData()
  },
  methods: {

    fectchData () {
      const cityOptions = ['上海', '北京', '广州', '深圳']
      const allOptions = [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'

        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ]
      let self = this
      self.cities = cityOptions
      self.options = allOptions
    },
    getMeaasge (val) {
      alert(val)
    },
    changeRadio1 (val) {
      console.log(val)
    },
    handleCheckAllChange (val) {
      this.checkedCities = val ? this.cities : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      // console.log(this.cities)
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    handleChangeNumber (value) {
      console.log(value)
    },
    handleChangeSelect (value) {
      console.log(value)
    },
    toSecond() {
      this.$store.dispatch('text/setTextParams', {
        name: '老王'
      })
      this.$router.push(`/Second`);
    }
  }

}
</script>

<style scoped>
  .title {
    font-size: 49px;
    color: #d01e1e;
    text-align: center;
    margin-top: 12px;

  }
  .radio-center {
    text-align: center;
    margin-top: 40px;
  }
  .checked {
    text-align: center;
    margin-top: 40px;
  }
  .radio-center .el-input {
    width: 300px;
  }
  .el-textarea {
    width: 300px;
    margin-top: 40px;
  }
  .el-select {
    width: 300px;
  }

</style>
