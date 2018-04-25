<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="createRules" label-width="120px">
      <el-form-item label="党支部名称" prop="title">
        <el-input v-model="form.title" :disabled="!isEdit"></el-input>
      </el-form-item>
      <el-form-item label="党支部类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择党支部类型" :disabled="!isEdit">
          <el-option label="党建示范点" value="01"></el-option>
          <el-option label="普通党支部" value="02"></el-option>
        </el-select>  
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-col :span="11">
          <el-input v-model="form.address" :disabled="!isEdit"></el-input>
        </el-col>
        <el-col v-if="isEdit" :span="2">
          <el-button type="primary" @click="getLocationByAddress()">生成经纬度</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="经纬度" prop="location">
        <el-input v-model="form.location" :disabled=true></el-input>
      </el-form-item>
      <el-form-item label="党支部详情介绍" prop="des">
        <!-- <el-input type="textarea" v-model="form.des"></el-input> -->
        <div id="editor"></div>
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
import { isValidTitle,} from '@/utils/validate'
import { getPartyBranch, editPartyBranch } from '@/api/partyBranch'
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
      isEdit: this.$route.path.split('/')[2] === 'edit' ? true : false,
      editor:null,
      form: {
        ID: this.$route.path.split('/')[3],
        title: '',
        type: '',
        address: '',
        location: null,
        des: '',
      },
      createRules: {
        title: [{ required: true, trigger: 'blur', validator: validateTitle }],
        type: [{required: true, trigger: 'blur', validator: validateType }],
        address: [{required: true, trigger: 'blur', validator: validateAddress }],
        location: [{ required: true, trigger: 'blur', validator: validateLocation }],
        des: [{required: true, trigger: 'blur', validator: validateDes }],
      }
    }
  },

  mounted() {
    console.log('mounted')
    console.log(this.isEdit)
    this.getPartyBranchData(this.form.ID)
    this.initEditor()
  },

  methods: {
    initEditor(){
      console.log('initEditor')
      this.editor = new WangEditor('#editor')  //这个地方传入div元素的id 需要加#号
      this.editor.change = function () { // 这里是change 不是官方文档中的 onchange
        // 编辑区域内容变化时，实时打印出当前内容
        console.log(this.txt.html())
      }
      this.editorConfigUploadImg(this.editor)
      this.editor.create()     // 生成编辑器
      console.log(this.isEdit)
      if(!this.isEdit) {
        console.log('---------------------------------')
        this.editor.$textElem.attr('contenteditable', false)
      }
      // this.editor.txt.html('<p>输入内容...</p>')   //注意：这个地方是txt  不是官方文档中的$txt
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
        const url = result.data.url
        insertImg(url)
      }
    }
},
    getPartyBranchData(ID) {
      getPartyBranch(ID).then(response => {
        console.log('get partyBranch success')
        console.log(response)
        this.form = response.data
        this.form.location = response.data.location + ''
        this.editor.txt.html(this.form.des) 
      })
    },

    editPartyBranchata(branch) {
      editPartyBranch(branch).then(response => {
        console.log('edit success')
        this.$router.push({ path: '/branch/index' })
      })
    },

    onSubmit() {
      this.form.des = this.editor.txt.html()
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log('--------')
          console.log(this.form)
          this.editPartyBranchata(this.form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    onCancel() {
      this.$router.push({ path: '/branch/index' })
    },

    getLocationByAddress(){
      console.log('getLocationByAddress')
      const address = this.form.address;
      console.log(address)
      getLocation(address).then(location => {
        console.log(location)
        this.form.location = location + ''
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

