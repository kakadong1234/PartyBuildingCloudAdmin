<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="createRules" label-width="120px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" :disabled=true></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="phone">
        <el-input v-model="form.phone" :disabled=true></el-input>
      </el-form-item>
     <el-form-item label="类型" prop="type">
        <el-input v-model="form.type" :disabled=true></el-input>
      </el-form-item>
      <el-form-item label="所在党支部" prop="partyBranchTitle">
        <el-input v-model="form.partyBranchTitle" :disabled=true></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onCancel">返回</el-button>
      </el-form-item>
    </el-form>
    <div>
      TODO:图表
    </div>
  </div>
</template>

<script>
import { getMember } from '@/api/member'

export default {
  data() {
    return {
      form: {
        ID: this.$route.path.split('/')[3],
        name: '',
        phone: '',
        type: '',
        partyBranchTitle: ''
      }
    }
  },

  mounted() {
    console.log('mounted')
    this.getMemberData(this.form.ID)
  },

  methods: {
    getMemberData(ID) {
      getMember(ID).then(response => {
        console.log('get member success')
        console.log(response)
        response.datapartyBranchTitle = response.data.partyBranch.title
        this.form = response.data
      })
    },
    onCancel() {
      this.$router.push({ path: '/member/index' })
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

