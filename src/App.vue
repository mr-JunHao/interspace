<template>
  <div id="app">
     <el-container>
    <el-header class="interspace">interSpace</el-header>
    <el-container>
      <el-aside class="main-aside" width="200px">
        <el-row class="tac">
         <el-col :span="24">
          <el-menu 
            :router="true"
            default-active="0-1"
            :unique-opened="true"
            @open="handleOpen"
            @close="handleClose"
           >
            <el-submenu index="0">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>功能</span>
              </template>
              <el-menu-item-group>
                <template slot="title">上传</template>
                <el-menu-item route="upload" index="0-1">
                  上传文件
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
           </el-menu>
         </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {

    }
  },
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.interspace{
  font-size: 28px;
  background: #409EFF;
  color: #fff;
  line-height: 60px;
}
.main-aside{
  overflow: hidden;
}
</style>
