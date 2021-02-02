<template>
  <div class="login-container">
    <div class="login-content">
      <h3 class="title">Vue3 Study</h3>
      <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
        class="card-box login-form">
        <el-form-item prop="loginName">
          <i class="fa fa-user" aria-hidden="true"></i>
          <el-input name="loginName" type="text" v-model="loginForm.loginName" autoComplete="on" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <i class="fa fa-unlock-alt" aria-hidden="true"></i>
          <el-input name="password" type="password" @keyup.enter="handleLogin" v-model="loginForm.password" autoComplete="on"
            placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;" :loading="loading" @click.prevent="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { asyncRoutes } from 'router'
export default {
  name: 'login',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 2) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        loginName: '',
        password: ''
      },
      loginRules: {
        loginName: [
          { required: true, trigger: 'blur', message: '请输入用户名' }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePass }
        ]
      },
      loading: false
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            // 跳转登录之前目标路径
            const nextPath = this.$route.params.sourcePath
            if (this.getValidity(asyncRoutes, nextPath)) {
              // 只跳转在动态路由表中的路径
              this.$router.push({ path: nextPath })
              return
            }
            this.$router.push({ path: '/' })
          }).catch(reason => {
            this.$message.error(reason)
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    // 在router中是否存在该path
    getValidity(routers, path) {
      return routers.some(item => {
        let valid = item.component && (item.path === path)
        if (!valid && item.children) {
          valid = this.getValidity(item.children, path)
        }
        return valid
      })
    }
  }
}
</script>

<style lang="scss">
.login-container {
  @include relative;
  height: 100vh;
  background: #fff url('../../assets/images/login-bg.jpg') no-repeat center center;
  background-size: cover;

  input:-webkit-autofill {
    box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  .login-form .el-input input {
    background: transparent !important;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: #eeeeee !important;
    height: 47px;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
  }
  .fa {
    padding: 6px 5px 6px 15px;
    color: #FFF;
  }
  .login-content {
    max-width: 1200px;
    position: relative;
    height: 100%;
    margin: auto;
  }
  .title {
    font-size: 48px;
    color: #eeeeee;
    font-weight: bold;
    position: absolute;
    left: 0;
    top: 80px;
    letter-spacing: 0.1em;
  }
  .login-form {
    position: absolute;
    top: 280px;
    right: 0px;
    background-color: rgba(0,0,0,0.36);
    border-radius: 10px;
    width: 388px;
    padding: 68px 42px 26px;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>
