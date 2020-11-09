<!--  -->
<template>
  <div class="login-container">
    <div class="login-box">
      <div class="logo">
        <img src="../assets/logo.png" alt />
      </div>
      <el-form
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        :inline="false"
        size="normal"
        class="login-form"
        ref="loginFormRef"
      >
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user-solid" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item class="login-form-button">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '../network/login'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await login(this.loginForm)
        console.log(res)
        if (res.meta.status !== 200) {
          //console.log('登陆失败')
          return this.$message.error('登陆失败')
        }
        this.$message.success('登陆成功')
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    },
    resetForm() {
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  background-color: #2b4b6b;
}
.login-box {
  width: 450px;
  height: 300px;
  position: absolute;
  background-color: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
}
.logo {
  width: 130px;
  height: 130px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #eee;
  box-shadow: 0 0 10px #ddd;
  padding: 10px;
}
.logo img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.login-form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
}
.login-form-button {
  display: flex;
  justify-content: flex-end;
}
</style>
