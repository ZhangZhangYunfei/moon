<template>
  <div>
    <nx-card v-for="examination in examinations">
      <template slot="title">{{examination.subject}}</template>
      <template slot="description">{{examination.description}}</template>
      <template slot="image">
        <img src="../assets/ExamItemLogo.png">
      </template>
    </nx-card>
  </div>
</template>

<script>
  export default {
    name: "gallary",

    data() {
      return {
        examinations: [{
          id: 1,
          subject: '安徽省南陵县2018年特岗考试报名',
          description: '报名时间：20180301至20180331，条件：必须为应届毕业生。考试时间待定。',
          price: 1
        }, {
          id: 2,
          subject: '安徽省南陵县2018年卫生系统考试报名',
          description: '报名时间：20180301至20180331，条件：必须为应届毕业生。考试时间待定。',
          price: 1
        }]
      }
    },
  }
</script>

<style scoped>

</style>
