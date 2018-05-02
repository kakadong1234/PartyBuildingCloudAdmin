<template>
  <div v-else class="container">
    <div class="check_box_div"> 
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item in mapMarkerTypeList" :key="item.ID" :label="item.title" @change="changeTypeSelect()"></el-checkbox>
      </el-checkbox-group>
    </div>
    <div id="map" class="map"></div>  
    <div class="notice_container">
      <div class="right_div"> 
        <div class='list_title_div'> 他山之玉 </div>
        <div v-for="(item, index) in goodNewsList" :key="item.ID" class="item_div" @click="goToDetailPage(item.ID)">
          {{index+1}}. {{item.title}}
        </div> 
      </div> 
      <div class="right_div">
        <div class='list_title_div'> 新闻动态 </div>
        <div v-for="(item, index) in newsList" :key="item.ID" class="item_div" @click="goToDetailPage(item.ID)">
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
      goodNewsList: [
        {
          title: 'ta1',
          url: 'http://www.baidu.com?q=ta1'
        },
        {
          title: 'ta2',
          url: 'http://www.baidu.com?q=ta2'
        }
      ],
      //新闻动态
      newsList: [
        {
          title: 'dongtai1',
          url: 'http://www.baidu.com?q=dongtai1'
        },
        {
          title: 'dongtai2',
          url: 'http://www.baidu.com?q=dongtai2'
        }
      ],
      //考试排行榜
      examScoreList: [
        {
          examination: {
            name: '112'
          },
          score: 90
        },
        {
          examination: {
            name: '113'
          },
          score: 82
        }
      ]

    }
  },
  mounted: function () {
    console.log('mounted')
    this.initMap()
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
              zoom: 10,
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
        // const title= '<span style="font-size:11px;color:#F00;">价格:318</span>',
        const content=[];
        content.push("<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>地址：北京市朝阳区阜通东大街6号院3号楼 东北 8.3 公里");
        content.push("电话：010 64733333")
          // content.push("<a href='" + window.location.origin + '#/branch/des'  + "' target='_blank'>详细信息</a>");
        content.push("<a href='http://ditu.amap.com/detail/B000A8URXB?citycode=110105' target='_blank'>详细信息</a>");
        const infoWindow = new AMap.InfoWindow({
            content: content.join("<br/>")  //使用默认信息窗体框样式，显示信息内容
        });
        infoWindow.open(this.map, this.map.getCenter());
        // if(type === 'branch') {
        //   const title= '<span style="font-size:11px;color:#F00;">价格:318</span>',
        //   const content=[];
        //   content.push("<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>地址：北京市朝阳区阜通东大街6号院3号楼 东北 8.3 公里");
        //   content.push("电话：010 64733333")
        //   // content.push("<a href='" + window.location.origin + '#/branch/des'  + "' target='_blank'>详细信息</a>");
        //   content.push("<a href='http://ditu.amap.com/detail/B000A8URXB?citycode=110105' target='_blank'>详细信息</a>");
        //   content.join("<br>")
        // }
        // else {
        //   const title = ''
        //   const content = ''
        // }
        //   let content=[];
        //   content.push("<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>地址：北京市朝阳区阜通东大街6号院3号楼 东北 8.3 公里 <br>");
        //   content.push("电话：010 64733333 <br>")
        //   // content.push("<a href='" + window.location.origin + '#/branch/des'  + "' target='_blank'>详细信息</a>");
        //   content.push("<a href='http://ditu.amap.com/detail/B000A8URXB?citycode=110105' target='_blank'>详细信息</a> <br>");
        //   // content.join("<br>")
        // const location = [data.longitude, data.latitude] 
        // this.showInfoWindow(location, content)
        // window.open(window.location.origin + '#/branch/des')
      }
      AMap.event.addListener(marker, 'click', _onClick);
    },

    showInfoWindow(location, content){
      // const infoWindow = new AMap.InfoWindow({
      //   content
      // });
      // infoWindow.open(this.map, [location.longitude, location.latitude]);
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
              this.addMarker(location, 'http://7xrsfo.com1.z0.glb.clouddn.com/circle.png', {width: 10, height: 10}, member, 'member')
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
              longitude,
              latitude
            })
      }
      return mockList
    },
    fetchPartyBranchList(){
      //获取党支部列表
    },

    fetchPartyMemberList(){
      //获取党员签到列表
    },

    //他山之玉列表
    fetchGoodNewsList(){
    },

    //新闻动态列表
    fetchNewsList(){
    },

    //考试排行榜
    fetchExamScoreList(){
    },

    goToDetailPage(ID){
      console.log('detail')
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
          margin-left:0.1rem;
          font-size: 0.12rem;
        }
     }
  }
}
</style>
