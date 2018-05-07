<template>
  <div>
    <el-row>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="14" :sm="10" :md="8" :lg="6" :xl="4">
        <el-form label-width="0px" align="left" ref="form" :model="form" :rules="rules">
          <el-form-item prop="identity">
            <el-input
              placeholder="请输入身份证号码"
              prefix-icon="el-icon-tickets"
              v-model="form.identity">
            </el-input>
          </el-form-item>
          <el-form-item prop="telephone">
            <el-input
              placeholder="请输入手机号码"
              prefix-icon="el-icon-phone"
              v-model="form.telephone">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="请输入密码"
              prefix-icon="el-icon-info"
              v-model="form.password">
            </el-input>
          </el-form-item>
          <el-form-item prop="passwordConfirm">
            <el-input
              type="password"
              placeholder="请确认密码"
              prefix-icon="el-icon-info"
              v-model="form.passwordConfirm">
            </el-input>
          </el-form-item>
          <el-form-item prop="captcha">
            <el-input
              placeholder="请输入验证码"
              prefix-icon="el-icon-info"
              v-model="form.captcha">
            </el-input>
          </el-form-item>
          <el-form-item>
            <img :src="captchaUrl" class="image" @click="reloadCaptcha"></img>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="signIn('form')">注册</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
    </el-row>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'SignIn',

    data() {
      let confirmPassword = (rule, value, callback) => {
        if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        form: {
          identity: '',
          telephone: '',
          password: '',
          passwordConfirm: '',
          captcha: '',
        },

        captchaUrl: '',

        rules: {
          identity: [
            {required: true, message: '请输入登陆用户', trigger: 'blur'}
          ],
          telephone: [
            {required: true, message: '请输入手机号码', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          passwordConfirm: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            { validator: confirmPassword, trigger: 'blur' }
          ],
          captcha: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ]
        }
      }
    },

    created() {
      this.reloadCaptcha();
    },

    methods: {
      reloadCaptcha() {
        this.captchaUrl = '/api/users/captcha' + '?random=' + Math.random();
      },

      signIn(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            //todo
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .el-row {
    margin-bottom: 120px;
  }

  .image {
  }

  .el-button {
    width: 100%;
  }

  .el-select {
    width: 100%;
  }
</style>
