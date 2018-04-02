<template>
  <div>
    <el-row>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="14" :sm="10" :md="8" :lg="6" :xl="4">
        <el-form label-width="0px" align="left">
          <el-form-item>
            <el-input
              placeholder="请输入身份证号码"
              prefix-icon="el-icon-phone"
              v-model="loginIdentity">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              placeholder="请输入手机号码"
              prefix-icon="el-icon-phone"
              v-model="loginIdentity">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              type="password"
              placeholder="请输入密码"
              prefix-icon="el-icon-info"
              v-model="password">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              type="password"
              placeholder="请再输入密码"
              prefix-icon="el-icon-info"
              v-model="password">
            </el-input>
          </el-form-item>
          <el-form-item>
            <img :src="captchaUrl" class="image" @click="reloadCaptcha"></img>
          </el-form-item>
          <el-form-item>
            <el-alert
              title="请输入正确的电话号码或者密码"
              v-if="showError"
              type="error"
              show-icon>
            </el-alert>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doRegistration()">登陆</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "registration"
  }
</script>

<style scoped>

</style>
