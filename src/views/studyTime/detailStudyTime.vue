<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="createRules" label-width="120px">
      <el-form-item label="党员类型" prop="type">
        <el-input v-model="form.type" :disabled=true></el-input>
      </el-form-item>
      <el-form-item label="学习时长" prop="studyTime">
        <el-input v-model="form.studyTime" :disabled="!isEdit"></el-input>
      </el-form-item>
      <el-form-item v-if="isEdit" >
        <el-button type="primary" @click="onSubmit">编辑</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
      <el-form-item v-else >
        <el-button @click="onCancel">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getStudyTime, editStudyTime} from '@/api/studyTime'
// import '@/utils/custom-menu'

export default {
  data() {

    const validateStudyTime = (rule, value, callback) => {
      if (value >= 0 &&parseInt(value) === value  ) {
        callback(new Error('输入的时长必须为正整数'))
      } else {
        callback()
      }
    }

    return {
      isEdit: this.$route.path.split('/')[2] === 'edit' ? true : false,
      form: {
        ID: this.$route.path.split('/')[3],
        type: '',
        studyTime: ''
      },
      createRules: {
        type: [{required: true}],
        studyTime: [{required: true, trigger: 'blur', validator: validateStudyTime }],
      }
    }
  },

  mounted() {
    console.log('mounted')
    console.log(this.isEdit)
    this.getStudyTimeData(this.form.ID)
  },

  methods: {
    getStudyTimeData(ID) {
      getStudyTime(ID).then(response => {
        console.log('get studyTime success')
        this.form = response.data
      })
    },

    editStudyTimeData(studyTime) {
      editStudyTime(studyTime).then(response => {
        console.log('edit success')
        this.$router.push({ path: '/studyTime/index' })
      })
    },

    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log('--------')
          console.log(this.form)
          this.editStudyTimeData(this.form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    onCancel() {
      this.$router.push({ path: '/studyTime/index' })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.upload_img{
  width: 0.2rem;
  height: 0.2rem;
}
</style>

