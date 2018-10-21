<template>
<el-container id="app">
  <el-aside width="200px">
      <left-nav></left-nav>
  </el-aside>
  <el-container>
    <el-header>
      <el-row>
           <el-col :span="4" :offset="20" style="text-align:right"><div  class="grid-content">
             <el-popover
  placement="bottom"
  width="400"
  trigger="hover">
  <el-row v-loading="false">
      <el-col>
          进程CPU负载<el-progress :percentage="sysinfo.cpu" color="orange"></el-progress>
      </el-col>
      
      <el-col>
          进程RAM负载<el-progress :percentage="sysinfo.ram" ></el-progress>
      </el-col>

  </el-row>
  <el-button slot="reference" style="border:none" >系统运行信息</el-button>
</el-popover>
   </div>
   </el-col>
 
      </el-row>
     
    </el-header>
    <el-main>
      <main-content></main-content>
    </el-main>
    
  </el-container>
</el-container>
</template>

<script>
import LeftNav from './components/LeftNav.vue';
import MainContent from './components/MainContent.vue';
import io from 'socket.io-client';
export default {
  data() {
    return {
        sysinfo:null
    };
  }
  ,
  methods: {

  },
  components:{
    LeftNav,
    MainContent
  },
  created(){
      const socket = io('http://localhost');
      socket.on('connect',()=>{});
      socket.on('sysinfo',(info)=>{
          this.sysinfo = info;
      })
  }
}
</script>

<style>
#app{
  height: 100vh;
  margin:0px;
}
  .el-header, .el-footer {
    background-color: #ffffff;
    color: rgb(82, 82, 82);
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: rgb(255, 255, 255);
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: rgb(255, 255, 255);
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>