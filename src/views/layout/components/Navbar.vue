<template>
<div class="all-div">
    <div class="logo-div">
      <img class="logo-img" :src="img_logo">
      <img class="logo-img2" :src="img_logo2">
      <el-input class="search-bar" placeholder="请输入内容" prefix-icon="el-icon-search" v-model="searchInput" clearable></el-input>
      <img class="user-img" @click="goToUserInfoPage()" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3289761550,697278018&fm=27&gp=0.jpg">
    </div>
    <div class="menu-div">
    <el-menu class="navbar" mode="horizontal" background-color="#ff0001" active-text-color="#ffd04b">
      <el-menu-item class="menu" v-for="(item, index) in routes" :key="item.id" :index="item.title" @click="goToDetailPage(item.id)" >{{item.title}}</el-menu-item> 
      <!-- <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">登出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
      </el-dropdown> -->
    </el-menu>
    <div class="nav-location-div">信息动态</div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import img_logo from '@/assets/logo.png'
import img_logo2 from '@/assets/logo2.png'

export default {
  data() {
    return {
      img_logo,
      img_logo2
    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
   props: {
    routes: {
      type: Array
    },
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.all-div {
   position: fixed;
    /*固定定位*/
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 180px;
    border-bottom: 1px solid red;
    // line-height: 50px;
    // border-radius: 0px !important;
    .logo-div{
      height: 100px;
      .logo-img{
        position: absolute;
        top: 10px;
        left: 40px;
        width: 80px;
        height: 80px;
        border-radius: 10px;
      }
      .logo-img2{
        position: absolute;
        top: 20px;
        left: 140px;
        width: 180px;
        height: 60px;
        border-radius: 10px;
      }
      .search-bar{
        position: absolute;
        top: 30px;
        right: 100px;
        width: 8rem;
        height: 40px;
      }
      .user-img{
        position: absolute;
        top: 25px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 10px;
      }
    }

    .menu-div{
      height: 50px;
      background: red;
    }
    .navbar {
      margin-left: 1rem;
      background: red;
      width: 14rem;
      margin-right: 1rem;
    .menu{
      width: 1.75rem;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: white;
      font-size: 0.15rem;
    };
    };

    .nav-location-div{
      height: 30px;
      font-size: 0.1rem;
      position: absolute;
      top: 160px;
      left: 40px;
    }
  .hamburger-container {
    font-size: 0px;
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

