<template>
  <div>
    <el-container>
      <el-header>
        <el-row :span="24">
          <el-col :span="12">
            <el-button type="text" @click="$router.push({path: '/'})">首页</el-button>
            <el-button type="text" @click="$router.push({path: '/registration'})">考试报名</el-button>
            <el-button type="text" @click="$router.push({path: '/query'})">考试查询</el-button>
            <el-button type="text" @click="$router.push({path: '/console'})"
                       v-if="'ROLE_ADMIN' === user.authority">
              管理后台
            </el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="text" @click="$router.push({path: '/login'})" v-if="!user.name">
              登陆
            </el-button>
            <el-button type="text" @click="$router.push({path: '/signIn'})" v-if="!user.name">
              注册
            </el-button>

            <el-dropdown @command="handleCommand" v-if="user.name">
              <i class="el-icon-setting" style="margin-right: 5px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">概要</el-dropdown-item>
                <el-dropdown-item command="pwd_reset">修改密码</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button type="text" v-if="user.name">{{userName}}</el-button>
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
        <p>所有方：上海优学教育科技有限公司</p>
        <p>客服电话：13818273272&nbsp;&nbsp;&nbsp;技术咨询电话：13917043650&nbsp;&nbsp;&nbsp;监督电话：58876592</p>
        <p>为保障平台的兼容性，建议使用谷歌浏览器</p>
      </el-footer>
    </el-container>

    <el-dialog
      title=""
      :visible.sync="infoDialogVisible"
      width="60%">
      <el-form :model="user" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="user.name" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="user.telephone" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="user.address" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="科目">
          <el-input v-model="user.subject" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="user.created_time" disabled="true"></el-input>
        </el-form-item>
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

    computed: {
      ...mapState(['user']),
      ...mapGetters(['userName'])
    },

    methods: {
      handleCommand(command) {
        if (command === 'info') {
          this.infoDialogVisible = true
        } else if (command === 'logout') {
          //todo
          this.setUser({})
          this.$message.success('执行成功!')
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
              // todo
              this.$message.success('执行成功！');
              this.pwdResetDialogVisible = false
            }
          } else {
            return false
          }
        });
      },

      ...mapActions(['setUser'])
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
