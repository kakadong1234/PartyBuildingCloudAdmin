<template>
  <div id="branch_des_container" class="container">
  </div>
</template>

<script>
export default {
  data() {
    return {
      des: `<h1 style="text-align: center;"><span style="font-weight: bold;">钟山区党支部简介</span></h1><h2><span style="font-weight: 700;">一. 概述</span></h2><div><p>&nbsp; &nbsp;&nbsp;<font face="宋体" size="4">中国共产党徐州建筑职业技术学院体育部支部委员会成立于2006年,现有正式</font><span style="font-family: 宋体; font-size: large;">党员</span><span style="font-family: 宋体; font-size: large;">7名,</span><span style="font-family: 宋体; font-size: large;">入党积极分子1名。多年来,党支部在学院党委的正确领导下,全体党员</span><font size="4"><font face="宋体">通过大力</font></font><font size="4"><font face="宋体">加强</font></font><font size="4"><font face="宋体">党支部建设,紧紧依靠全体党员和干部群众,团结进取,开拓创新,</font></font><font size="4"><font face="宋体">充</font></font><font size="4"><font face="宋体">分发挥党支部</font></font><font size="4"><font face="宋体">的战</font></font><font size="4"><font face="宋体">斗堡垒作用和党员的先锋模范作用,使体育部各项工作得到,</font></font><font size="4"><font face="宋体">了</font></font><font size="4"><font face="宋体">全</font></font><font size="4"><font face="宋体">面协调发展,较好</font></font><font size="4"><font face="宋体">地完</font></font><font size="4"><font face="宋体">成了上级党组织所赋予基层党组织的基本任务。</font></font></p><p>&nbsp; &nbsp;&nbsp;<font face="宋体" size="4">中国共产党徐州建筑职业技术学院体育部支部委</font><font size="4"><font face="宋体">加强</font></font><font size="4"><font face="宋体">党支部建设,紧紧依靠全体党员和干部群众,团结进取,开拓创新,</font></font><font size="4"><font face="宋体">充</font></font><font size="4"><font face="宋体">分发挥党支部</font></font><font size="4"><font face="宋体">的战</font></font><font size="4"><font face="宋体">斗堡垒作用和党员的先锋模范作用.</font></font><font size="4"><font face="宋体"><br></font></font></p><p><img src="http://orw37xxpx.bkt.clouddn.com/prod/easylive/1524632013001.png" style="max-width:100%;"><font size="4"><font face="宋体"><br></font></font></p><p><font size="4"><font face="宋体"><br></font></font></p><h2><span style="font-family: 宋体; font-size: large;">二.党支部书记介绍</span></h2></div><div><p>&nbsp; &nbsp;&nbsp;<font face="宋体" size="4">中国共产党徐州建筑职业技术学院体育部支部委员会成立于2006年,现有正式</font>党员7名,入党积极分子1名。多年来,党支部在学院党委的正确领导下,全体党员<font size="4"><font face="宋体">通过大力</font></font><font size="4"><font face="宋体">加强</font></font><font size="4"><font face="宋体">党支部建设,紧紧依靠全体党员和干部群众,团结进取,开拓创新,</font></font><font size="4"><font face="宋体">充</font></font><font size="4"><font face="宋体">分发挥党支部</font></font><font size="4"><font face="宋体">的战</font></font><font size="4"><font face="宋体">斗堡垒作用和党员的先锋模范作用,使体育部各项工作得到,</font></font><font size="4"><font face="宋体">了</font></font><font size="4"><font face="宋体">全</font></font><font size="4"><font face="宋体">面协调发展,较好</font></font><font size="4"><font face="宋体">地完</font></font><font size="4"><font face="宋体">成了上级党组织所赋予基层党组织的基本任务。</font></font></p><p>&nbsp; &nbsp;&nbsp;<font face="宋体" size="4">中国共产党徐州建筑职业技术学院体育部支部委</font><font size="4"><font face="宋体">加强</font></font><font size="4"><font face="宋体">党支部建设,紧紧依靠全体党员和干部群众,团结进取,开拓创新,</font></font><font size="4"><font face="宋体">充</font></font><font size="4"><font face="宋体">分发挥党支部</font></font><font size="4"><font face="宋体">的战</font></font><font size="4"><font face="宋体">斗堡垒作用和党员的先锋模范作用.</font></font></p><p><img src="http://orw37xxpx.bkt.clouddn.com/prod/easylive/1524632264115.png" style="max-width:100%;"><font size="4"><font face="宋体"><br></font></font></p><p>大发送到发大所发生的</p></div>`
    }
  },
  mounted() {
    console.log('mounted')
    //添加 富文本 html
    const div = document.getElementById('branch_des_container')
    console.log(div)
    div.innerHTML = this.des 
    const video = document.getElementsByTagName("video") //只允许一个 video 标签
    if(video.length) {
        //有 video
        // 设置开始播放时间
        // 开启定时器 -- 每隔一段1秒记录播放 time, 并存储到 store 中
    }
  },
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .container {
    font-size: 20px;
  }
</style>