<template>
  <div class="container">
    <el-checkbox-group v-model="checkList" class="map_marker_type_check_box">
      <el-checkbox label="复选框 A"></el-checkbox>
      <el-checkbox label="复选框 B"></el-checkbox>
      <el-checkbox label="复选框 C"></el-checkbox>
      <el-checkbox label="禁用"></el-checkbox>
      <el-checkbox label="选中且禁用"></el-checkbox>
    </el-checkbox-group>
    <div id="map" class="map"></div>  
    <div class="notice_container">

      <div class='good_news_list_title'> 他山之玉 </div>
      <div v-for="(item, index) in goodNewsList" :key="item.ID" class="good_news_item" @click="goToDetailPage(item.ID)">
        {{index+1}}. {{item.title}}
      </div>  

      <div class='all_news_list_title'> 新闻动态 </div>
      <div v-for="(item, index) in newsList" :key="item.ID" class="news_item" @click="goToDetailPage(item.ID)">
        {{index+1}}. {{item.title}}
      </div>  

      <div class='exam_score_rangking_list_title'> {{department.name}}镇考试排行榜 </div>
      <div v-for="(item, index) in examScoreList" :key="item.ID" class="exam_score_item">
        {{index+1}}. {{item.examination.name}}     {{item.examination.score}} 
      </div>  
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
   data() {
    return {
      checkList: ['复选框 A'],
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
      const map = new AMap.Map('map',{
        zoom: 10,
        center: [116.39,39.9]
      });
      const marker = new AMap.Marker({
        position: [116.480983, 39.989628],//marker所在的位置
        map:map//创建时直接赋予map属性
      });
    },

    fetchPartyBranchList(){
      //获取党支部列表
    },

    fetchPartyMemberList(){
      //获取党员列表
    },

    //他山之玉列表
    fetchGoodNewsList(){
    },

    //新闻动态列表
    fetchNewsList(){
    },

    //考试排行榜
    fetchExamScoreList(){
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  margin:1.5rem;
  display:flex;
  display: -webkit-flex;
  justify-content:space-between;
  .map_marker_type_check_box {
    margin-left:1rem;
    width: 8rem;
    height: 10rem; 
    display:flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content:space-between;
  }
  .map{
    width: 50rem;
    height: 30rem; 
  }  
  .notice_container{
     margin-left:1rem;
     width: 9rem;
     height: 18rem; 
     .good_news_item{
       margin-left:0.8rem;
     };
     .all_news_list_title{
       margin-top:1rem;
     }
     .news_item{
       margin-left:0.8rem;
     };
     .exam_score_rangking_list_title{
       margin-top:1rem;
     }
     .exam_score_item{
       margin-left:0.8rem;
     };
  }
}
</style>
