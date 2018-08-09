<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <navbar :routes="routes"></navbar>
    <div class="main-container">
      <sidebar class="sidebar-container"></sidebar>
      <app-main class="app-main-container"></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from '@/views/layout/components'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    routes() {
      return [
        {
          id:1,
          title: "信息动态"
        },
        {
          id:2,
          title: "网上讲习所"
        },
        {
          id:3,
          title: "驻村云监管"
        },
        {
          id:4,
          title: "党建大数据"
        },
        {
          id:5,
          title: "智能调度台"
        },
        {
          id:6,
          title: "党旗E家"
        },
        {
          id:7,
          title: "人才直通车"
        },
        {
          id:8,
          title: "后台管理"
        },
      ]
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
