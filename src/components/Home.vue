<template>
  <div>
    <el-container>
      <el-header>
        <el-row :span="24">
          <el-col :span="12">
            <el-button type="text" @click="$router.push({path: '/'})">首页</el-button>
            <el-button type="text" @click="onJump('registration')">考试报名</el-button>
            <el-button type="text" @click="onJump('query')">考试查询</el-button>
            <el-button type="text" @click="onJump('console')"
                       v-if="user.authorities && (user.authorities.indexOf('ROLE_ADMIN') !== -1
                       ||  user.authorities.indexOf('ROLE_EXAMINER') !== -1)">
              管理后台
            </el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="text" @click="$router.push({path: '/login'})" v-if="!user.username">
              登陆
            </el-button>
            <el-button type="text" @click="$router.push({path: '/signIn'})" v-if="!user.username">
              注册
            </el-button>

            <el-dropdown @command="handleCommand" v-if="user.username">
              <i class="el-icon-setting" style="margin-right: 5px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">概要</el-dropdown-item>
                <el-dropdown-item command="pwd_reset">修改密码</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button type="text" v-if="user.username">{{userName}}</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-row>
        <el-row class="el-row-image">
          <img src="../assets/WebMain.png" align="center"/>
        </el-row>
      </el-row>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer>
        <!--<p>所有方：上海优学教育科技有限公司</p>-->
        <!--<p>客服电话：13818273272&nbsp;&nbsp;&nbsp;技术咨询电话：13917043650&nbsp;&nbsp;&nbsp;监督电话：58876592</p>-->
        <p>为保障平台的兼容性，建议使用谷歌浏览器</p>
      </el-footer>
    </el-container>

    <el-dialog
      title=""
      :visible.sync="infoDialogVisible"
      width="60%">
      <el-form :model="user" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="user.username" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="user.telephone" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="user.idNo" disabled="true"></el-input>
        </el-form-item>
        <!--<el-form-item label="创建时间">-->
        <!--<el-input v-model="user.created_time" disabled="true"></el-input>-->
        <!--</el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="infoDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title=""
      :visible.sync="pwdResetDialogVisible"
      width="60%">
      <el-form ref="pwdInfo" :model="pwdInfo" :rules="pwdInfoRules" label-width="90px">
        <el-form-item label="旧密码" prop="oldPwd">
          <el-input v-model="pwdInfo.oldPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input v-model="pwdInfo.newPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="newPwdAgain">
          <el-input v-model="pwdInfo.newPwdAgain" type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="resetPwd('pwdInfo')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {mapState} from 'vuex'
  import {mapActions} from 'vuex'
  import {mapGetters} from 'vuex'

  import {setCookie, getCookie, delCookie} from '../assets/js/cookieUtil'

  export default {
    name: "home",

    data() {
      return {
        infoDialogVisible: false,
        pwdResetDialogVisible: false,

        pwdInfo: {
          oldPwd: '',
          newPwd: '',
          newPwdAgain: ''
        },

        pwdInfoRules: {
          oldPwd: [
            {required: true, message: '请输入...', trigger: 'blur'}
          ],
          newPwd: [
            {required: true, message: '请输入...', trigger: 'blur'}
          ],
          newPwdAgain: [
            {required: true, message: '请输入...', trigger: 'blur'}
          ]
        },
      }
    },

    created() {
      const user = getCookie('user')
      if (user && !this.user.id) {
        this.beginLoading()
        Vue.http.get('/api/users')
          .then(response => {
            if (response.body.status === 'SUCCESS') {
              this.setUser(response.body.content)
            } else {
              this.$message.error(response.body.message)
            }
          })
          .catch(msg => this.$message.error(msg.data || msg))
          .finally(() => this.stopLoading())
      }
    },

    computed: {
      ...mapState(['user']),
      ...mapGetters(['userName'])
    },

    methods: {
      ...mapActions(['setUser', 'beginLoading', 'stopLoading']),

      handleCommand(command) {
        if (command === 'info') {
          this.infoDialogVisible = true
        } else if (command === 'logout') {
          this.beginLoading()
          Vue.http.post('/api/users/logout')
            .then(response => {
              if (response.body.status === 'SUCCESS') {
                delCookie('user', '/', window.location.hostname)
                this.setUser({})
                this.$message.success(response.body.message || '执行成功')
              } else {
                this.$message.error(response.body.message)
              }
            })
            .catch(msg => this.$message.error(msg.data))
            .finally(() => this.stopLoading())

        } else if (command === 'pwd_reset') {
          this.pwdResetDialogVisible = true
        }
      },

      resetPwd(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            if (this.pwdInfo.newPwd !== this.pwdInfo.newPwdAgain) {
              this.$message.error('新密码两次输入不一致！')
            } else {
              this.beginLoading()
              Vue.http.post('/api/users/password-resets', {}, {
                params: {
                  oldPassword: this.pwdInfo.oldPwd,
                  newPassword: this.pwdInfo.newPwd,
                }
              })
                .then(response => {
                  if (response.body.status === 'SUCCESS') {
                    this.$message.success(response.body.message || '执行成功')
                    this.pwdResetDialogVisible = false
                  } else {
                    this.$message.error(response.body.message)
                  }
                })
                .catch(msg => this.$message.error(msg.data))
                .finally(() => this.stopLoading())
            }
          }
        });
      },

      onJump(name) {
        if (!this.user.id) {
          this.$message.warning('尚未登陆请先登陆，跳转中...')
          setTimeout(()=>{
            this.$router.push({path: '/login'})
          }, 1000)
        } else {
          switch (name) {
            case 'registration':
              this.$router.push({path: '/registration'})
              break;
            case 'query':
              this.$router.push({path: '/query'})
              break;
            case 'console':
              this.$router.push({path: '/console'})
              break;
          }
        }
      }
    }
  }
</script>

<style scoped>
  .el-button {
    height: 100%;
    font: 20px Extra large;
  }

  .el-row-image {
    background-color: #5AEFE0;
  }

  .el-header {
    margin-bottom: 0px;
  }

  .el-main {
    margin-top: 0px;
    min-height: 600px;
  }
</style>
