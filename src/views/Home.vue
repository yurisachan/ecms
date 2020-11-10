<!--  -->
<template>
  <el-container class="home-container">
    <el-header>
      <div class="header-logo">
        <img src="../assets/logo.png" alt />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" size="default" @click="logout">退出登录</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse?'64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
        <!-- 一级菜单 -->
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id" @click='getActivePath'>
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getHomeMenus } from '../network/home'
export default {
  name: 'Home',
  data() {
    return {
      menuList: [],
      iconsObj: {
        '125': 'el-icon-user-solid',
        '103': 'el-icon-s-management',
        '101': 'el-icon-s-goods',
        '102': 'el-icon-s-order',
        '145': 'el-icon-s-platform'
      },
      isCollapse:false,
      activePath:''
    }
  },
  created() {
    this.getHomeMenus()
  },
  methods: {
    logout() {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    },
    async getHomeMenus() {
      const { data: res } = await getHomeMenus()
      //console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
    },
    toggleCollapse() {
      this.isCollapse=!this.isCollapse
    },
    getActivePath(){
      this.activePath=this.$route.path
    }
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
  /* width: 100%; */
}
.el-header {
  background-color: #373d4e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}
.header-logo {
  height: 60px;
  color: #fff;
  display: flex;
  align-items: center;
}
.header-logo img {
  height: 60px;
}
.header-logo span {
  font-size: 20px;
  padding-left: 10px;
}
.el-menu {
  border-right: none;
}
.toggle-button {
  color: #fff;
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
