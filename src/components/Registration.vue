<template>
  <div>
    <el-steps :active="step" finish-status="success" align-center>
      <el-step title="步骤 1" description="填写报名信息"/>
      <el-step title="步骤 2" description="支付考试费用"/>
    </el-steps>

    <el-form ref="form" :model="form" :rules="rules" label-width="80px" v-show="step===1">
      <el-form-item label="考试名称" prop="examinationName">
        <el-input v-model="form.examinationName"/>
      </el-form-item>
      <el-form-item label="基本信息" required="true">
        <el-row>
          <el-col :span="12">
            <el-form-item  prop="name">
              <el-input placeholder="姓名" v-model="form.name"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  prop="idNo">
              <el-input placeholder="身份证号码" v-model="form.idNo"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item  prop="telephone">
              <el-input placeholder="联系电话" v-model="form.telephone"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  prop="address">
              <el-input placeholder="联系地址" v-model="form.address"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item  prop="gender">
              <el-input placeholder="性别" v-model="form.gender"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  prop="politicalStatus">
              <el-input placeholder="政治面貌（党员/团员/群众）" v-model="form.politicalStatus"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="学历信息" required="true">
        <el-row>
          <el-col :span="12">
            <el-form-item  prop="school">
              <el-input placeholder="毕业学校" v-model="form.school"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  prop="major">
              <el-input placeholder="专业名称" v-model="form.major"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item  prop="degree">
              <el-input placeholder="学历（本科/硕士）" v-model="form.degree"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  prop="scholarship">
              <el-input placeholder="奖励情况" v-model="form.scholarship"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="证件照" required="true" prop="imageUrl">
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
        <el-button type="success" @click="submit('form')">提交</el-button>
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
  import { mapActions } from 'vuex'

  export default {
    name: "registration",

    data() {
      return {
        step: 1,

        form: {
          examinationName: '',
          name: '',
          idNo: '',
          telephone: '',
          address: '',
          gender: '',
          politicalStatus: '',
          school: '',
          major: '',
          degree: '',
          scholarship: '',
          imageUrl: ''
        },

        rules: {
          examinationName: [
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
            {required: true, message: '请上传...', trigger: 'blur'}
          ]
        },

        payForm: {
          no: '123456',
          description: '安徽特岗考试',
          amount: 40.01,
          url: 'www.1.com'
        }
      }
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
            this.step++
            //todo
          }
        });
      },

      ...mapActions([
        'beginLoading'
      ])
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
