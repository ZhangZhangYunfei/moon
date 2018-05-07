<template>
  <div>
    <el-container>
      <el-aside style="background-color: rgb(238, 241, 246)" width="auto">
        <el-menu class="el-menu-vertical-demo">
          <el-menu-item index="1" @click="$router.push({path: '/home/schedule'})">
            <i class="el-icon-date"></i>
            <span slot="title">考场安排</span>
          </el-menu-item>
          <el-menu-item index="3" @click="$router.push({path: '/home/subjects'})">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">成绩录入</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "console"
  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 150px;
    min-height: 200px;
  }
  .el-aside {
    color: #333;
  }
</style>
