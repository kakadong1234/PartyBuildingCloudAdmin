<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="createRules" label-width="120px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="房子类型" prop="resourceType">
        <el-select v-model="form.resourceType" placeholder="请选择房子类型">
          <el-option label="V01" value="V01"></el-option>
          <el-option label="V02" value="V02"></el-option>
          <el-option label="V03" value="V03"></el-option>
          <el-option label="V4" value="V4"></el-option>
        </el-select>  
      </el-form-item>
      <el-form-item label="是否已经租出">
        <el-switch v-model="form.isRentOut"></el-switch>
      </el-form-item>
      <el-form-item label="开租时间">
        <el-date-picker type="date" placeholder="请选择开租时间" v-model="form.startDate" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="结租时间">
        <el-date-picker type="date" placeholder="请选择结租时间" v-model="form.endDate" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type"></el-checkbox>
          <el-checkbox label="Promotion activities" name="type"></el-checkbox>
          <el-checkbox label="Offline activities" name="type"></el-checkbox>
          <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor"></el-radio>
          <el-radio label="Venue"></el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="图片墙" prop="imgUrlList">
        <el-upload class="upload-demo" action="http://picture-system-live.ejudata.com/qiniu/image/single"
        v-model="form.imgUrlList" list-type="picture-card" :data="dataObj" :headers="headers"
        :before-upload="beforeUpload" :on-success="onPicUploadSuccess" :on-remove="onPicRemove"  multiple>
          <i class="el-icon-plus"></i>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5MB</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { isValidTitle, isValidResourceType } from '@/utils/validate'
import { createHouse } from '@/api/houses'

export default {
  data() {
    const validateTitle = (rule, value, callback) => {
      console.log('-----------------123')
      if (!isValidTitle(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validateResourceType = (rule, value, callback) => {
      if (!isValidResourceType(value)) {
        callback(new Error('请选择正确的资源类型'))
      } else {
        callback()
      }
    }

    const validateImgUrlList = (rule, value, callback) => {
      // if (!validateURL(value)) {
      //   callback(new Error('请输入正确的图片地址'))
      // } else {
      //   callback()
      // }
      callback()
    }

    return {
      form: {
        title: '',
        address: '',
        resourceType: '',
        isRentOut: false,
        startDate: '',
        endDate: '',
        desc: '',
        imgUrlList: []
      },
      createRules: {
        title: [{ required: true, trigger: 'blur', validator: validateTitle }],
        resourceType: [{ required: true, trigger: 'blur', validator: validateResourceType }],
        imgUrlList: [{ required: true, trigger: 'blur', validator: validateImgUrlList }]
      },
      dataObj: { bizType: 1 },
      headers: {
        ts: 1521450452371,
        token: '4056a87b6101a0c16a85db1af0d0eace',
        platform: 'WEB'
      }
    }
  },
  methods: {
    onPicUploadSuccess(response, file, fileList) {
      console.log(response)
      console.log('---------------')
      file.url = response.data.url
      this.form.imgUrlList.push(response.data.url)
    },
    onPicRemove(file, fileList) {
      console.log(file)
      this.form.imgUrlList = this.form.imgUrlList.filter(function(imgUrl) {
        return imgUrl !== file.url
      })
    },
    beforeUpload(file) {
      console.log(file.name)
      const isJPGOoPNG = ['image/jpeg', 'image/png'].indexOf(file.type) !== -1
      const isLt = file.size / 1024 / 1024 < 5
      if (!isJPGOoPNG) {
        this.$message.error('上传图片只能是jpg/png格式!')
        return false
      }
      if (!isLt) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
        return false
      }
      return true
    },
    createHouseData(house) {
      createHouse(house).then(response => {
        this.$message('create success')
        this.$router.push({ path: '/houses/index' })
      })
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.createHouseData(this.form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
      this.$router.push({ path: '/houses/index' })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

