<template>
  <div>
    <nx-card v-for="examination in examinations" v-bind:url="getUrl(examination)">
      <template slot="title">{{examination.subject}}</template>
      <template slot="description">{{examination.description}}</template>
      <template slot="image">
        <img src="../assets/ExamItemLogo.png">
      </template>
    </nx-card>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {mapActions, mapState} from 'vuex'

  export default {
    name: "gallary",

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
    },

    data() {
      return {
        //examinations: []
      }
    },

    computed: {
      ...mapState(['examinations'])
    },

    methods: {
      ...mapActions(['beginLoading', 'stopLoading', 'setExaminations']),

      getUrl(examination) {
        return '/#/registration/' + examination.id
      },
    }
  }
</script>

<style scoped>

</style>
