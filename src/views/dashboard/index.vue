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
      PartyMemberList: [],
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
    this.fetchPartyBranchList();
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
        map = new AMap.Map('map',{
              zoom: 10,
              center: location
        });
        const marker = new AMap.Marker({
              position: location,//marker所在的位置
              map:map//创建时直接赋予map属性
        });
      })
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
