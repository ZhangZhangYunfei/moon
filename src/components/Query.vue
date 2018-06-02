<template>
  <div>
    <el-container>
      <el-aside style="background-color: rgb(238, 241, 246)" width="auto">
        <el-menu class="el-menu-vertical-demo">
          <el-menu-item index="1" @click="$router.push({path: '/home/schedule'})">
            <i class="el-icon-document"></i>
            <span slot="title">报名信息查询</span>
          </el-menu-item>
          <el-menu-item index="2" @click="$router.push({path: '/home/students'})">
            <i class="el-icon-view"></i>
            <span slot="title">成绩查询</span>
          </el-menu-item>
          <el-menu-item index="3" @click="$router.push({path: '/home/subjects'})">
            <i class="el-icon-time"></i>
            <span slot="title">考场查询</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>  </div>
</template>

<script>
  export default {
    name: "query"
  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 150px;
    min-height: 200px;
  }
  .el-header {
    background-color: #0B77E6;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
