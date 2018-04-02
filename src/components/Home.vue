<template>
  <el-container>
    <el-header>
      <el-row :span="24">
        <el-col :span="12">
          <el-button type="text">首页</el-button>
          <el-button type="text">考试报名</el-button>
          <el-button type="text">考试查询</el-button>
          <el-button type="text">管理后台</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="text" @click="$router.push({path: '/login'})">登陆</el-button>
          <el-button type="text" @click="$router.push({path: '/registration'})">注册</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row class="el-row-main">
        <img src="../assets/weblogo-new.png" align="center"/>
      </el-row>
      <router-view/>
    </el-main>
    <el-footer>
      <p>所有方：上海优学教育科技有限公司</p>
      <p>客服电话：13818273272&nbsp;&nbsp;&nbsp;技术咨询电话：13917043650&nbsp;&nbsp;&nbsp;监督电话：58876592</p>
      <p>为保障平台的兼容性，建议使用谷歌浏览器</p>
    </el-footer>
  </el-container>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: "home",

    methods: {

    }
  }
</script>

<style scoped>
  .el-button {
    height: 100%;
    font: 20px Extra large ;
  }
  .el-row-main {
    background-color: #5AEFE0;
  }

</style>
