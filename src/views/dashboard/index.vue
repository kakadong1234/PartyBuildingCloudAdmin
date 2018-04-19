<template>
  <div class="container">
    <el-checkbox-group v-model="checkList">
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
  margin:0.5rem;
  display:flex;
  display: -webkit-flex;
  justify-content:space-between;
  background-color: #F5F5F5;
  .el-checkbox-group {
    width: 2.5rem;
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
  .map{
    width: 10rem;
    height: 7rem; 
  }  
  .notice_container{
     margin-left:0.2rem;
     margin-top:0.25rem;
     width: 2.5rem;
     height: 4rem; 
     font-size: 0.2rem;
     .good_news_item{
       margin-left:0.3rem;
     };
     .all_news_list_title{
       margin-top:0.5rem;
     }
     .news_item{
       margin-left:0.3em;
     };
     .exam_score_rangking_list_title{
       margin-top:0.5rem;
     }
     .exam_score_item{
       margin-left:0.3rem;
     };
  }
}
</style>
