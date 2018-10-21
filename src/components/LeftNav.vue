<template>
    <div id="left-nav">
      <el-container>
  <el-header style="background-color: #67C23A;color:white">后台管理</el-header>
  <el-main> 
    <el-menu :default-openeds="['1']" :router="true" @select='handleHref'>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>系统管理</template>
          <el-menu-item index="index">主页</el-menu-item>
          <el-menu-item index="index">数据库管理</el-menu-item>
          <el-menu-item index="index">日志管理</el-menu-item>
          <el-menu-item index="1-3">系统设置</el-menu-item>
          <el-menu-item index="area?title=区域管理">区域管理</el-menu-item>
      </el-submenu>
      <el-submenu index="user">
        <template slot="title"><i class="el-icon-menu"></i>用户管理</template>
          <el-menu-item index="userlist?title=用户列表" >用户列表</el-menu-item>
          <el-menu-item index="feedback?title=用户反馈">用户反馈</el-menu-item>
      </el-submenu> 
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>比赛管理</template>
          <el-menu-item index="addrace?title=发布比赛">发布比赛</el-menu-item>
          <el-menu-item index="checkrace?title=待审核比赛">待审核比赛</el-menu-item>
          <el-menu-item index="raceinfo?title=比赛列表">比赛列表</el-menu-item>
          <el-menu-item index="3-3">比赛团体列表</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-setting"></i>数据分析</template>
          <el-menu-item index="4-1">比赛分析</el-menu-item>
          <el-menu-item index="4-2">用户分析</el-menu-item>
          <el-menu-item index="4-3">系统分析</el-menu-item>
      </el-submenu>
    </el-menu></el-main>
</el-container>
     
    </div>
</template>

<script>
import MainContent from './MainContent.vue'
export default {
  data() {
    return {};
  },
  methods: {
    handleHref: (index) => {
      MainContent.methods.goto(index);
    }
  }
};
</script>

<style>
#left-nav {
  height: 100%;
}

.el-main {
  padding: 0px;
}
</style>