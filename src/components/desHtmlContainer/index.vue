<template>
  <div id="des_container" class="container">
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: ['des'],
  mounted() {
    console.log('mounted---------123')
    //添加 富文本 html
    // const div = document.getElementById('des_container')
    // console.log(div)
    // console.log(this.des)
    //  console.log('mounted---------46')
    // div.innerHTML = this.des 
    // const video = document.getElementsByTagName("video") //只允许一个 video 标签
    // if(video.length) {
    //     //有 video
    //     // 设置开始播放时间
    //     // 开启定时器 -- 每隔一段1秒记录播放 time, 并存储到 store 中
    // }
  },
   watch: {
    des: function (val) {
      this.des = val
      const div = document.getElementById('des_container')
      console.log(div)
      console.log(this.des)
      console.log('mounted---------46')
      div.innerHTML = this.des 
    }
   }
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .container {
    font-size: 20px;
    margin-left: 0.5rem;
  }
</style>