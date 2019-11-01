<template>
  <div>
    <el-row :gutter="20" type="flex" align="center">
      <el-col :span="12" :offset="6">
        <div class="loginForm">
          <div class="title">追魂项目组</div>
          <el-form :model="userLoginForm" ref="userLoginForm" :rules="rules" label-width="100px" class="demo-ruleForm">
            <el-form-item
              label="用户名"
              prop="userName"
            >
              <el-input v-model="userLoginForm.phone" placeholder="请输入用户名：手机号码">
              </el-input>
            </el-form-item>
            <el-form-item
              label="密码"
              prop="password"
            >
              <el-input type="password" v-model="userLoginForm.password" auto-complete="off"
                        placeholder="请输入密码">
              </el-input>
            </el-form-item>
            <el-form-item class="loginButton">
              <el-button type="primary" @click="submitForm('userLoginForm')">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import store from '@/store';
export default {


  name: 'login',
  data () {
    return {
      userLoginForm: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$refs['userLoginForm'].resetFields()
    next()
  },
  methods: {
    submitForm (formName) {
      let self = this
      let userInfo = {
        un: this.userLoginForm.phone,
        pwd: this.userLoginForm.password
      }

      store.dispatch('userInfo/updateLogInfo', {
        isLogin: true,
        $router: this.$router,
        params: userInfo

      })

      // this.$refs[formName].validate((valid) => {
      //   console.log(userInfo)
      //   if (valid) {
      //     self.$router.push('/indexOne')
      //   } else {
      //     console.log('登录失败!!')
      //   }
      // })
    }
  }

}
</script>

<style scoped>
  .loginForm {
    width: 500px;
    margin: 350px auto;
    padding: 0 50px 50px 50px;
    background-color: #fff;
    border-radius: 5px;
  }

  .loginForm .title {
    padding: 30px 0px;
    font-size: 20px;
    text-align: center;
  }

  .loginButton button {
    width: 100%;
  }

  .loginForm .el-form-item__label {
    width: 68px !important;
  }

  .loginForm .el-form-item__content {
    margin-left: 70px !important;
  }

  .loginForm .el-form-item {
    margin-bottom: 20px;
  }
</style>
