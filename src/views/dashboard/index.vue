<template>
  <div class="container">
    <div class="check_box_div"> 
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item in mapMarkerTypeList" :key="item.ID" :label="item.title" @change="changeTypeSelect()"></el-checkbox>
      </el-checkbox-group>
    </div>
    <div id="map" class="map"></div>  
    <div class="notice_container">
      <div class="right_div"> 
        <div class='list_title_div'> 他山之玉 </div>
        <div v-for="(item, index) in goodNewsList" :key="item.id" class="item_div" @click="goToDetailPage(item.id)">
          {{index+1}}. {{item.title}}
        </div> 
      </div> 
      <div class="right_div">
        <div class='list_title_div'> 新闻动态 </div>
        <div v-for="(item, index) in newsList" :key="item.id" class="item_div" @click="goToDetailPage(item.id)">
          {{index+1}}. {{item.title}}
        </div>  
       </div> 
      <div class="right_div"> 
        <div class='list_title_div'> {{department.name}}镇考试排行榜 </div>
        <div v-for="(item, index) in examScoreList" :key="item.ID" class="item_div">
          {{index+1}}. {{item.examination.name}}     {{item.examination.score}} 
        </div>  
      </div> 
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getLocation } from '@/api/map'
import { getPartyBranchList } from '@/api/partyBranch'
import { getSignOnList } from '@/api/member'
import { getNewsList } from '@/api/news'

export default {
   data() {
    return {
      isFullScreen: false,
      map: {},
      checkList: ['党建示范点','党支部分布', '驻村干部分布'],
      mapMarkerTypeList: [
        {
          type: 1,
          title: '党建示范点'
        },
        {
          type: 2,
          title: '党支部分布'
        },
        {
          type: 3,
          title: '驻村干部分布'
        },
        {
          type: 4,
          title: '党建扶贫产业带'
        },
        {
          type: 5,
          title: '党员教育示范基地'
        }
      ],
      department: {
        name: 'aa',
        type: '镇'
      },
      //党支部列表
      partyBranchList: [],
      //党员列表
      partyMemberList: [],
      //他山之玉
      goodNewsList: [],
      //新闻动态
      newsList: [],
      //考试排行榜
      examScoreList: [
        {
          examination: {
            name: '张富裕'
          },
          score: 90
        },
        {
          examination: {
            name: '李青峰'
          },
          score: 82
        }
      ]

    }
  },
  mounted: function () {
    console.log('mounted')
    this.initMap()
    this.fetchNewsList()
    this.fetchGoodNewsList()
    this.fetchExamScoreList()
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  methods: {
    initMap(){
      const city = process.env.CITY_NAME
      console.log(city)
      //获取六盘水市的经纬度
      getLocation(city).then(location => {
        // 生成 map
        const mapLocation = [location.longitude, location.latitude]
        this.map = new AMap.Map('map',{
              zoom: 9,
              center: mapLocation
        });
        //添加中心点标记
        this.addMarker(mapLocation)
        //添加党支部列表标记
        this.addPartyBranchListMarkers()
        //添加党员签到标记
        this.addPartyMemberListMarkers()
      })
    },

    addMarker(location, imageUrl, imageSize, data, type){
      const markerData = {
          position: location,//marker所在的位置
          map: this.map//创建时直接赋予map属性
      }
      if(imageUrl) {
        const content= "<img src=" + imageUrl + " style='width:" + imageSize.width + "px; height=" + imageSize.height + "px'>";
        markerData.content = content
      }
      const marker = new AMap.Marker(markerData);
      marker.data = data
      marker.type = type
      const _onClick = e => {
        console.log(e.target)
        const type = e.target.type
        const data = e.target.data
        // content.push("<a href='" + window.location.origin + '#/branch/des'  + "' target='_blank'>详细信息</a>");
        const content=[];
        if(type === 'branch') {
          const title = data.name
          const address = data.address
          const detailUrl = window.location.origin + '#/branch/des/' + data.id
          content.push('<div style="font-size:10px;"> <div>党支部名称:'+ title +'</div> <div>地址：' + address + '</div> <a href="' + detailUrl  + '" target="_blank" style="color:blue">图文详情</a> </div>');
        }
        else {
          const title = data.name
          const detailPlace = data.detailPlace
          const date = new Date(data.timestamp)
          const time = date.getHours() + ':' + date.getMinutes()
          const detailUrl = window.location.origin + '#/signOn/des'
          content.push('<div style="font-size:10px"> <div>姓名:'+ title +'</div> <div>签到时间:' + time  + '</div> <div>签到地址：' + detailPlace + '</div> <a href="' + detailUrl  + '" target="_blank" style="color:blue">签到详情</a> </div>');
        }
        this.showInfoWindow(data, content)
      }
      AMap.event.addListener(marker, 'click', _onClick);
    },

    showInfoWindow(location, content){
      const infoWindow = new AMap.InfoWindow({
          content: content.join("<br>"),
      });
      infoWindow.open(this.map, [location.longitude, location.latitude]);
    }, 


    addPartyBranchListMarkers(){
        getPartyBranchList().then(response => {
          this.partyBranchList = response.data
          this.partyBranchList.map(branch => {
              const location = [branch.longitude, branch.latitude]  
              const imgUrl = branch.flag ? 'http://7xrsfo.com1.z0.glb.clouddn.com/party_yellow.png' : 'http://7xrsfo.com1.z0.glb.clouddn.com/party.png'
              this.addMarker(location, imgUrl, {width: 20, height: 20}, branch, 'branch')
          })
      })
    },

    addPartyMemberListMarkers(){
        getSignOnList().then(response => {
          // this.partyMemberList = response.data
          const mockList = this.getMockList()
          this.partyMemberList = mockList
          this.partyMemberList.map(member => {
              const location = [member.longitude, member.latitude]
              this.addMarker(location, 'http://7xrsfo.com1.z0.glb.clouddn.com/star.png', {width: 15, height: 15}, member, 'member')
          })
      })
    },

    getMockList() {
      const mockList = []
      for(let i=1; i<1000; i++) {
        const longitude = Math.floor(Math.random()*1000+10000) * 1.0 / 100 
        const latitude = Math.floor(Math.random()*1000+2000) * 1.0 / 100 
            mockList.push({
              name: '晓伟' + i,
              detailPlace: '六盘水' + i,
              longitude,
              userId: i,      
              timestamp: Date.now(), 
              latitude,
              imageList: [
                'http://d.lanrentuku.com/down/png/1712/14meiweishiwu/14meiweishiwu_09.png',
                'http://d.lanrentuku.com/down/png/1712/14meiweishiwu/14meiweishiwu_09.png'
              ]
            })
      }
      return mockList
    },
    // fetchPartyBranchList(){
    //   //获取党支部列表
    // },

    // fetchPartyMemberList(){
    //   //获取党员签到列表
    // },

    //他山之玉列表
    fetchGoodNewsList(){
      getNewsList().then(response => {
        const list = response.data.map(function(news) {
          news.isPublicTxt = '已公布'
          news.isGoodTxt = '普通'
          news.reviewStatusTxt = '完成审核'
          news.author = 'xiaowei'
          return news
        })
        this.goodNewsList = list.filter(function(news){
          return news.id % 2 === 0
        })
      })
    },

    //新闻动态列表
    fetchNewsList(){
       getNewsList().then(response => {
        const list = response.data.map(function(news) {
          news.isPublicTxt = '已公布'
          news.isGoodTxt = '普通'
          news.reviewStatusTxt = '完成审核'
          news.author = 'xiaowei'
          return news
        })
        this.newsList = list
      })
    },

    //考试排行榜
    fetchExamScoreList(){
    },

    goToDetailPage(ID){
      console.log('detail')
      window.open(window.location.origin + '#/news/des/' + ID)
    },

    changeTypeSelect(){
      console.log('changeTypeSelect')
      console.log(this.checkList)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  margin:0.2rem;
  display:flex;
  display: -webkit-flex;
  justify-content:space-between;
  background-color: #F5F5F5;
  .check_box_div{
    height: 8em; 
    border: 1px solid black;
    border-radius: 5px;
    background-color: white;
    .el-checkbox-group {
      width: 2rem;
      height: 4rem; 
      display:flex;
      display: -webkit-flex;
      flex-direction: column;
      justify-content:flex-start;
      .el-checkbox {
        margin-left:0.2rem;
        margin-top:0.25rem;
      }
    }
  }
  .map{
    width: 8.6rem;
    height: 8rem; 
  }  
  .notice_container{
     width: 2.5rem;
     height: 8rem; 
     font-size: 0.18rem;
     color: blue;
     .right_div{
        margin-top:0.2rem;
        border: 1px solid black;  
        border-radius: 5px;
        background-color: white;
        .list_title_div{
          margin-left:0.1rem;
        }
        .item_div{
          margin-top:0.05rem;
          margin-left:0.1rem;
          font-size: 0.12rem;
        }
     }
  }
}
</style>
