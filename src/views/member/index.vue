<template>
<div class='app-container'>
  <div class="top_bar">
    <!-- <el-button class="create_button" @click.native.prevent='createRow()' type='primary' size='mini'>添加</el-button> -->
    <div class="search_address_page">
      <form class="search_form">
          <input type="search" name="search" placeholder="请输入党员姓名" v-model="searchValue">
          <el-button @click.prevent="searchMember()" type='primary' size='mini'>搜索</el-button>
      </form>
    </div>
  </div>
  <el-table v-if="tableData.length" class='table' :data='tableData' stripe border @selection-change="handleSelectionChange" highlight-current-row @current-change="handleCurrentChange">
        <!-- <el-table-column prop='ID' label='ID' width='100'></el-table-column> -->
        <el-table-column prop='name' label='姓名' width='200'></el-table-column>
        <el-table-column prop='phone' label='电话号码' width='200'></el-table-column>
        <el-table-column prop='type' label='党员类型' width='200'></el-table-column>
        <el-table-column prop='partyBranchTitle' label='所在党支部' width='200'></el-table-column>
        <el-table-column fixed='right' label='操作'>
          <template slot-scope='scope'>
            <el-button @click.stop='detailRow(scope.$index, scope.row, scope.column, tableData)' type='primary' size='mini'>详情</el-button>
          </template>
        </el-table-column>
    </el-table>
    <div class='no_data_div' v-else >无党员数据!</div>
</div>
</template>

 <script>
import { getMemberList } from '@/api/member'

export default {
  data() {
    return {
      searchValue: '',
      tableData: [],
      allData: [],
      multipleSelection: [],
      dialogVisible: false,
      currentRow: null
    }
  },
  mounted() {
    console.log('mounted')
    this.fetchData()
  },
  methods: {
    fetchData() {
      getMemberList().then(response => {
        const list = response.data.lists.map(function(member) {
          member.partyBranchTitle = member.partyBranch.title
          return member
        })
        this.tableData = list
        this.allData = list
      })
    },
    handleCurrentChange(val) {
      console.log(val)
      this.currentRow = val
      // TODO跳转 router
      this.$router.push({ path: '/member/detail/' + this.currentRow.ID })
    },
    searchMember(){
      console.log('searchMember, searchValue is ' + this.searchValue)
      if(this.searchValue === '') {
        this.tableData = this.allData
      }
      else {
        this.tableData = this.allData.filter(data => {
            console.log(data.name)
            return data.name.indexOf(this.searchValue) !== -1
        })
      }
    },
    handleSelectionChange(val) {
      console.log('---------')
      this.multipleSelection = val
    },
    detailRow(index, row, column, data) {
      console.log('detail')
      this.$router.push({ path: '/member/detail/' +  row.ID})
    }
  }
}
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  width: 13.5rem;
  .top_bar {
    background: #e5e9f2;
    height: 0.5rem;
    font-size: 0.2rem;
    .create_button {
      margin-top: 0.05rem;
      margin-left: 0.2rem;
      float: left;
      width: 1.5rem;
      height: 0.4rem;
    }
    .search_address_page{
      margin-left: 1.8rem;
      height: 0.5rem;
      .search_form {
        font-size: 0.2rem;
        button{
          margin-top: 0.05rem;
          width: 1.5rem;  
          height: 0.4rem;
        }
        input{
          margin-top: 0.05rem;
          width: 9.5rem;
          height: 0.4rem;
        }
      }
    }
  }
  .no_data_div{
    font-size: 1rem
  }
}
</style>
