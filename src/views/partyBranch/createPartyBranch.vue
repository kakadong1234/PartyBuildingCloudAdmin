<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="createRules" label-width="120px">
      <el-form-item label="党支部名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="党支部类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择党支部类型">
          <el-option label="党建示范点" value="01"></el-option>
          <el-option label="普通党支部" value="02"></el-option>
        </el-select>  
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-col :span="11">
          <el-input v-model="form.address"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="getLocationByAddress()">生成经纬度</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="经度" prop="longitude">
        <el-input v-model="form.longitude" :disabled=true></el-input>
      </el-form-item>
      <el-form-item label="纬度" prop="latitude"> 
        <el-input v-model="form.latitude" :disabled=true></el-input>
      </el-form-item>
      <el-form-item label="党支部详情介绍" prop="details">
        <!-- <el-input type="textarea" v-model="form.des"></el-input> -->
        <div id="editor"></div>
      </el-form-item>
      <el-form-item>
        <el-button @click="openBranchDesPage">党支部详情页面</el-button>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { isValidTitle} from '@/utils/validate'
import { createPartyBranch } from '@/api/partyBranch'
import { getLocation } from '@/api/map'
import WangEditor from 'wangeditor'
// import '@/utils/custom-menu'

export default {
  data() {
    const validateTitle = (rule, value, callback) => {
      console.log('-----------------123')
      if (!isValidTitle(value)) {
        callback(new Error('请输入正确的党支部名称'))
      } else {
        callback()
      }
    }

    const validateType = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请选择正确的党支部类型'))
      } else {
        callback()
      }
    }

    const validateAddress = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入正确的地址'))
      } else {
        callback()
      }
    }

    const validateLocation = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请先点击生成经纬度按钮,获取经纬度'))
      } else {
        callback()
      }
    }

    const validateDes = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入正确的党支部详情'))
      } else {
        callback()
      }
    }

    return {
      editor:null,
      form: {
        name: '',
        type: '',
        address: '',
        longitude: '', 
        latitude: '', 
        details: '',
      },
      createRules: {
        name: [{ required: true, trigger: 'blur', validator: validateTitle }],
        type: [{required: true, trigger: 'blur', validator: validateType }],
        address: [{required: true, trigger: 'blur', validator: validateAddress }],
        longitude: [{ required: true, trigger: 'blur', validator: validateLocation }],
        latitude: [{ required: true, trigger: 'blur', validator: validateLocation }],
        details: [{required: true, trigger: 'blur', validator: validateDes }],
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
      this.editor = new WangEditor('#editor')
      this.editor.change = function () { 
        console.log(this.txt.html())// 编辑区域内容变化时，实时打印出当前内容
      }
      this.editorConfigUploadImg(this.editor)
      this.editor.create()     // 生成编辑器
    },

    editorConfigUploadImg(editor) {
      editor.customConfig.debug = true
      console.log(editor)
      editor.customConfig.showLinkImg = false
      //editor.customConfig.uploadImgServer = 'http://picture-system-live.ejudata.com/qiniu/image/single'  // 上传图片到服务器
      editor.customConfig.uploadImgServer = process.env.BASE_API + '/fileUpload'  // 上传图片到服务器
      // // 图片上传限制
      // editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024
      // editor.customConfig.uploadImgMaxLength = 1
      // header和 body 配置
      editor.customConfig.uploadFileName = 'file'
      // editor.customConfig.uploadImgParams = {
      //   bizType:2
      // },
      // editor.customConfig.uploadImgHeaders = {
      //     ts: 1524539752494,
      //     token: 'd4c349f09cc2dd8d5b2c2da3347c1497',
      //     platform: 'WEB'
      // }
      editor.customConfig.uploadImgTimeout = 15000
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
            const isLt = file.size / 1024 / 1024 < 5
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
      timeout: function (xhr, editor) {
         alert('请求超时')
      },
      customInsert: function (insertImg, result, editor) {
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
        console.log(result)
        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        const url = result.data[0]
        insertImg(url)
      }
    }
},
    createPartyBranchData(branch) {
      createPartyBranch(branch).then(response => {
        console.log('create success')
        this.$router.push({ path: '/branch/index' })
      })
    },

    onSubmit() {
      this.form.details = this.editor.txt.html()
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.flag = this.form.type === "01" ? true : false
          console.log(this.form)
          this.createPartyBranchData(this.form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    onCancel() {
      this.$router.push({ path: '/branch/index' })
    },

    openBranchDesPage() {
      window.open(window.location.origin + '#/branch/des')
    },

    getLocationByAddress(){
      console.log('getLocationByAddress')
      const address = this.form.address;
      console.log(address)
      getLocation(address).then(location => {
        console.log(location)
        this.form.longitude = location.longitude + ''
        this.form.latitude = location.latitude + ''
      })
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

