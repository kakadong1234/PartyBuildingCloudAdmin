<template>
  <div class="container">
    <div id="map" class="map"></div>  
    <div class='other_div'>
        <div>姓名: {{name}}</div>
        <div>签到时间: {{time}}</div>
        <div>签到位置: {{address}}</div>
        <div>描述: {{remark}}</div>
        <div class="imgArr">
            <div  v-for="imgObject in imageList" :key="imgObject.index">
                <img :src=imgObject.url>
            </div>
        </div>

    </div>
</div>
</template>

<script>
export default {
   data() {
    return {
      map: null,
      name: '晓伟',
      address: '六盘水钟山区',
      time: '2018-05-02 18:20',
      remark: 'helloWorld, 阿道夫撒发的helloWorld, 阿道夫撒发的helloWorld, 阿道夫撒发的helloWorld, 阿道夫撒发的helloWorld, 阿道夫撒发的helloWorld, 阿道夫撒发的helloWorld, 阿道夫撒发的',
      imageList: [
        {index: 0, url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3477974115,2819249668&fm=27&gp=0.jpg'},
        {index: 1, url: 'http://7xrsfo.com1.z0.glb.clouddn.com/star.png'}
      ],
      longitude: '104.843555',
      latitude: '26.574979',
    }
  },
  mounted: function () {
    console.log('mounted')
    this.initMap()
  },
  computed: {
  },
  methods: {
    initMap(){
        const mapLocation =  [this.longitude, this.latitude]
        this.map = new AMap.Map('map',{
              zoom: 9,
              center: mapLocation 
        });
        //添加中心点标记
        const markerData = {
          position: mapLocation,//marker所在的位置
          map: this.map//创建时直接赋予map属性
        }
        const marker = new AMap.Marker(markerData);
    },
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.container{
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    .map{
        width: 15rem;
        height: 5rem; 
    } 
    .other_div{
        margin-top: 0.25rem;
        font-size:20px;
        .imgArr{
            display:flex;
            justify-content:flex-start;
            img{
                width: 1.5rem;
                height: 1.5rem; 
            }
        }
    }
}
</style>