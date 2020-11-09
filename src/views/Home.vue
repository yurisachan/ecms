<!--  -->
<template>
  <div>
    <el-button type="info" size="default" @click="logout">退出登录</el-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {}
  },
  methods: {
    logout() {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
</style>
