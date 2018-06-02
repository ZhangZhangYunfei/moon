<template>
  <div>
    <el-steps :active="step" finish-status="success" align-center>
      <el-step title="步骤 1" description="填写报名信息"/>
      <el-step title="步骤 2" description="支付考试费用"/>
    </el-steps>

    <el-form ref="form" :model="form" :rules="rules" label-width="80px" v-show="step===1">
      <el-form-item label="考试名称" prop="examinationId">
        <el-select v-model="form.examinationId" placeholder="考试名称" style="width: 100%"
                   value="number" :disabled="$route.params.examId" @select="handleSelect">
          <el-option
            v-for="item in examinations"
            :key="item.id"
            :label="item.subject"
            :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="基本信息" required="true">
        <el-row>
          <el-col :span="12">
            <el-form-item prop="examineeName">
              <el-input placeholder="姓名" v-model="form.examineeName" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="examineeIdNo">
              <el-input placeholder="身份证号码" v-model="form.examineeIdNo" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="examineeTelephone">
              <el-input placeholder="联系电话" v-model="form.examineeTelephone" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="address">
              <el-input placeholder="联系地址" v-model="form.address" @select="handleSelect"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="gender">
              <el-select v-model="form.gender" placeholder="性别" style="width: 100%" value="string">
                <el-option
                  v-for="item in ['男', '女']"
                  :key="item"
                  :label="item"
                  :value="item"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="politicalStatus">
              <el-input placeholder="政治面貌（党员/团员/群众）" v-model="form.politicalStatus"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="学历信息" required="true">
        <el-row>
          <el-col :span="12">
            <el-form-item prop="school">
              <el-input placeholder="毕业学校" v-model="form.school"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="major">
              <el-input placeholder="专业名称" v-model="form.major"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="degree">
              <el-input placeholder="学历（本科/硕士）" v-model="form.degree"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="scholarship">
              <el-input placeholder="奖励情况" v-model="form.scholarship"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="其他信息" prop="others">
        <el-input placeholder="其他信息" v-model="form.others"/>
      </el-form-item>

      <el-form-item label="报名状态" prop="status">
        <el-input placeholder="创建中" v-model="form.status" disabled/>
        <!--<span style="horiz-align: left"> {{form.status || '创建中'}}</span>-->
      </el-form-item>

      <el-form-item label="证件照" prop="imageUrl">
        <el-col :span="4">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-col :span="12">
          <el-button type="primary" @click="submit('form')">提交</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="success" @click="pay('payForm')"
                     :disabled="'PAID' === form.status || 'CONFIRMED' === form.status">去支付
          </el-button>
        </el-col>
      </el-form-item>
    </el-form>

    <div v-show="step===2">
      <el-row type="flex" justify="left">
        <p style="font-size: xx-large; margin-top: 0px"><b>收银台</b></p>
      </el-row>
      <el-row style="height:100px;background-color: #DEE0E3;">
        <el-col :span="12" align="left">
          <p style="margin-left: 10px">订单编号：{{payForm.no}}</p>
          <p style="margin-left: 10px">订单描述：{{payForm.description}}</p>
        </el-col>
        <el-col :span="12">
          <p>应付金额：{{payForm.amount}}</p>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px; margin-bottom: 20px">
        <el-tabs type="border-card">
          <el-tab-pane label="微信支付">
            <qriously :value="payForm.url" :size="200"/>
            <img src="../assets/WechatPayDesc.png"></img>
          </el-tab-pane>
        </el-tabs>
      </el-row>
      <el-row>
        <el-button type="warning" @click="step--">回退</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {mapActions, mapState} from 'vuex'

  export default {
    name: "registration",

    data() {
      return {
        step: 1,

        interval: null,

        form: {
          id: '',
          examinationId: '',
          examineeName: '',
          examineeIdNo: '',
          examineeTelephone: '',
          address: '',
          gender: '',
          politicalStatus: '',
          school: '',
          major: '',
          degree: '',
          scholarship: '',
          others: '',
          status: '',
          imageUrl: ''
        },

        rules: {
          examinationId: [
            {required: true, message: '请选择...', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入...', trigger: 'blur'}
          ],
          telephone: [
            {required: true, message: '请输入...', trigger: 'blur'}
          ],
          idNo: [
            {required: true, message: '请输入...', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '请输入...', trigger: 'blur'}
          ],
          gender: [
            {required: true, message: '请选择...', trigger: 'blur'}
          ],
          school: [
            {required: true, message: '请输入...', trigger: 'blur'}
          ],
          major: [
            {required: true, message: '请输入...', trigger: 'blur'}
          ],
          degree: [
            {required: true, message: '请输入...', trigger: 'blur'}
          ],
          politicalStatus: [
            {required: true, message: '请输入...', trigger: 'blur'}
          ],
          imageUrl: [
            {required: false, message: '请上传...', trigger: 'blur'}
          ]
        },

        payForm: {
          no: '',
          description: '',
          amount: 0,
          url: ''
        }
      }
    },

    computed: {
      ...mapState(['examinations', 'user'])
    },

    created() {
      if (this.examinations.length === 0) {
        this.beginLoading()
        Vue.http.get('/api/examinations')
          .then(response => {
            if (response.body.status === 'SUCCESS') {
              // this.examinations = response.body.content
              this.setExaminations(response.body.content)
            } else {
              this.$message.error(response.body.message)
            }
          })
          .catch(msg => this.$message.error(msg.data || msg))
          .finally(() => this.stopLoading())
      }

      if (this.$route.params.examId) {
        this.form.examinationId = parseInt(this.$route.params.examId);
        this.beginLoading();
        Vue.http.get('/api/registrations', {
          params: {
            examinationId: this.form.examinationId
          }
        })
          .then(response => {
            if (response.body.status === 'SUCCESS') {
              this.form = response.body.content;
            }
          })
          .finally(() => this.stopLoading())
        // if (!this.user.username) {
        //   this.$message.warning('尚未登陆请先登陆，跳转中...')
        //   setTimeout(() => {
        //     this.$router.push({path: '/login'})
        //   }, 1000)
        // }

      }
      this.form.examineeName = this.user.username;
      this.form.examineeIdNo = this.user.idNo;
      this.form.examineeTelephone = this.user.telephone;
    },

    methods: {
      handleAvatarSuccess(res, file) {
        this.form.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },

      submit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            if (this.form.status === 'CONFIRMED') {
              this.$alert('已经被确认的报名信息不可以被更新！', {
                type: 'warning'
              })
            } else if (this.form.id) {
              this.beginLoading();
              Vue.http.put('/api/registrations', this.form)
                .then(response => {
                  if (response.body.status === 'SUCCESS') {
                    this.$message.success('更新成功！');
                    this.form.id = response.body.content.id;
                    this.payForm.no = response.body.content.id;
                  } else {
                    this.$message.error(response.body.message)
                  }
                })
                .catch(msg => this.$message.error(msg.data))
                .finally(() => this.stopLoading())
            } else {
              Vue.http.post('/api/registrations', this.form)
                .then(response => {
                  if (response.body.status === 'SUCCESS') {
                    this.$message.success('创建成功！');
                    this.form.id = response.body.content.id;
                    this.payForm.no = response.body.content.id;
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

      pay(form) {
        if (!this.form.id) {
          this.$alert('请先提交报名信息', {
            type: 'warning'
          })
        } else {
          let exam = this.examinations.find(value => value.id === this.form.examinationId);
          this.payForm.description = exam.subject;
          this.payForm.amount = exam.price;
          this.beginLoading();
          Vue.http.post('/api/registrations/' + this.form.id + '/payUrl', {}, {
            params: {
              paymentType: 'WECHATPAY'
            }
          })
            .then(response => {
              if (response.body.status === 'SUCCESS') {
                this.payForm.url = response.body.url;
                this.step++
                this.interval = setInterval(this.queryPayResult, 2000)
              } else {
                this.$message.error(response.body.message)
              }
            })
            .catch(msg => this.$message.error(msg.data))
            .finally(() => this.stopLoading())
        }
      },

      queryPayResult() {
        if (this.step === 2 && this.interval) {
          Vue.http.get('/api/registrations/' + this.form.id)
            .then(response => {
              if (response.body.status === 'SUCCESS') {
                this.form = response.body.content
                if (response.body.content.status === 'PAID'
                    || response.body.content.status === 'CREATED') {
                  this.$message.success(response.body.content.status === 'PAID'
                    ? '支付成功！' : '支付失败！')
                  this.step--
                  clearInterval(this.interval)
                }
              } else {
                this.$message.error(response.body.message)
              }
            })
        }
      },

      handleSelect(item) {
        debugger;
        console.log(item);
        if (this.examinationId) {

        }
      },

      ...mapActions(['beginLoading', 'stopLoading', 'setExaminations']),
    }
  }
</script>

<style scoped>
  .el-button {
    width: 100%;
  }

  .el-steps {
    margin-bottom: 10px;
  }

  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
