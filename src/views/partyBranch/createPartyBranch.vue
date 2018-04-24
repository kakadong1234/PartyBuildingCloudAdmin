<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="createRules" label-width="120px">
      <el-form-item label="名称" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="党支部类型" prop="resourceType">
        <el-select v-model="form.resourceType" placeholder="请选择党支部类型">
          <el-option label="党建示范点" value="V01"></el-option>
          <el-option label="普通党支部" value="V02"></el-option>
        </el-select>  
      </el-form-item>
      <el-form-item label="地址">
        <el-col :span="11">
          <el-input v-model="form.address"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="getLocationByAddress()">生成经纬度</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="经纬度">
        <el-input v-model="form.location"></el-input>
      </el-form-item>
      <el-form-item label="党支部详情介绍">
        <!-- <el-input type="textarea" v-model="form.desc"></el-input> -->
        <div id="editor" v-model="from.desc"></div>
      </el-form-item>
      <!-- <el-form-item label="图片墙" prop="imgUrlList">
        <el-upload class="upload-demo" action="http://picture-system-live.ejudata.com/qiniu/image/single"
        v-model="form.imgUrlList" list-type="picture-card" :data="dataObj" :headers="headers"
        :before-upload="beforeUpload" :on-success="onPicUploadSuccess" :on-remove="onPicRemove"  multiple>
          <i class="el-icon-plus"></i>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5MB</div>
        </el-upload>
      </el-form-item> -->
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
import WangEditor from 'wangeditor'

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
        editor:null,
        title: '',
        address: '',
        resourceType: '',
        desc: '',
        location: '',
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
  mounted() {
    console.log('mounted')
    this.initEditor()
  },
  methods: {

    initEditor(){
      console.log('initEditor')
      this.editor = new WangEditor('#editor')  //这个地方传入div元素的id 需要加#号
        // 配置 onchange 事件
      this.editor.change = function () { // 这里是change 不是官方文档中的 onchange
        // 编辑区域内容变化时，实时打印出当前内容
        console.log(this.txt.html())
      }
      this.editorConfigUploadImg(this.editor)
      this.editor.create()     // 生成编辑器
      this.editor.txt.html('<p>输入内容...</p>')   //注意：这个地方是txt  不是官方文档中的$txt
    },

    editorConfigUploadImg(editor) {
      editor.customConfig.debug = true
      console.log(editor)
      editor.customConfig.showLinkImg = false
      editor.customConfig.uploadImgServer = 'http://picture-system-live.ejudata.com/qiniu/image/single'  // 上传图片到服务器
      // // 图片上传限制
      // editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024
      // editor.customConfig.uploadImgMaxLength = 1
      // header和 body 配置
      editor.customConfig.uploadFileName = 'file'
      editor.customConfig.uploadImgParams = {
        bizType:2
      },
      editor.customConfig.uploadImgHeaders = {
          ts: 1524539752494,
          token: 'd4c349f09cc2dd8d5b2c2da3347c1497',
          platform: 'WEB'
      }
      editor.customConfig.uploadImgTimeout = 8000
      editor.customConfig.uploadImgHooks = {
        before: function (xhr, editor, files) {
            console.log('before')
            console.log(files.length)
            if(files.length > 1) {
              alert('一次最多上传1张图片')
              return {prevent: true,msg: '一次最多上传1张图片'}
            }
            const file = files[0]
            const isJPGOoPNG = ['image/jpeg', 'image/png'].indexOf(file.type) !== -1
            const isLt = file.size / 1024 / 1024 < 0.05
            if (!isJPGOoPNG) {
              alert('上传图片只能是jpg/png格式!')
              return {prevent: true,msg: '上传图片只能是jpg/png格式'}
            }
            if (!isLt) {
              alert('上传头像图片大小不能超过 5MB!')
              return {prevent: true,msg: '上传头像图片大小不能超过 5MB!'}
            } 
            return {prevent:false}
      },
      success: function (xhr, editor, result) {
      },
      fail: function (xhr, editor, result) {
        console.log(xhr)
        console.log(result)
        // 图片上传并返回结果，但图片插入错误时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      },
      error: function (xhr, editor) {
        console.log('errror')
      },
      timeout: function (xhr, editor) {
         alert('请求超时')
      },
      customInsert: function (insertImg, result, editor) {
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
        console.log(result)
        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        const url = result.data.url
        insertImg(url)
      }
    }
},
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
    // beforeUpload(file) {
    //   console.log(file.name)
    //   const isJPGOoPNG = ['image/jpeg', 'image/png'].indexOf(file.type) !== -1
    //   const isLt = file.size / 1024 / 1024 < 5
    //   if (!isJPGOoPNG) {
    //     this.$message.error('上传图片只能是jpg/png格式!')
    //     return false
    //   }
    //   if (!isLt) {
    //     this.$message.error('上传头像图片大小不能超过 5MB!')
    //     return false
    //   }
    //   return true
    // },
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
    },
    getLocationByAddress(){
      console.log('getLocationByAddress')
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

