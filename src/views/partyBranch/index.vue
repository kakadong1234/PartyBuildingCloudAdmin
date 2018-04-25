<template>
<div class='app-container'>
  <div class="top_bar">
    <el-button class="create_button" @click.native.prevent='createRow()' type='primary' size='mini'>添加</el-button>
    <div class="search_address_page">
      <form class="search_form">
          <input type="search" name="search" placeholder="请输入党支部名称" v-model="searchValue">
          <el-button @click.prevent="searchPartyBranch()" type='primary' size='mini'>搜索</el-button>
      </form>
    </div>
  </div>
  <el-table v-if="tableData.length" class='party_branch_table' :data='tableData' stripe border @selection-change="handleSelectionChange" highlight-current-row @current-change="handleCurrentChange">
        <!-- <el-table-column prop='ID' label='ID' width='100'></el-table-column> -->
        <el-table-column prop='title' label='名称' width='180'></el-table-column>
        <el-table-column prop='address' label='地址'></el-table-column>
        <el-table-column prop='location' label='经纬度' width='60'></el-table-column>
        <el-table-column prop='qrcodeUrl' label='二维码图片' width='60'>
            <template slot-scope='scope'>
                <img :src="scope.row.qrcodeUrl" height="40">
            </template>
        </el-table-column>
        <el-table-column fixed='right' label='操作' width='220'>
          <template slot-scope='scope'>
            <el-button @click.stop='detailRow(scope.$index, scope.row, scope.column, tableData)' type='primary' size='mini'>详情</el-button>
            <el-button @click.stop='editRow(scope.$index, scope.row, scope.column, tableData)' type='primary' size='mini'>编辑</el-button>
            <el-button @click.stop='isShowDeleteDialog(scope.$index, scope.row, scope.column, tableData)' type='danger' size='mini'>删除</el-button>
          </template>
        </el-table-column>
    </el-table>
    <div class='no_data_div' v-else >无党支部数据!</div>
    <el-dialog title="删除提示" :visible.sync="dialogVisible" width="30%" center>
      <span>是否删除该数据?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click.stop='deleteRow()'>确 定</el-button>
      </span>
    </el-dialog>

</div>
</template>

 <script>
import { getPartyBranchList, deletePartyBranch } from '@/api/partyBranch'

export default {
  data() {
    return {
      searchValue: '',
      tableData: [],
      allBranchData: [],
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
      getPartyBranchList().then(response => {
        this.tableData = response.data.lists
        this.allBranchData = response.data.lists
      })
    },

    deleteData(ID) {
      deletePartyBranch(ID)
    },

    handleCurrentChange(val) {
      console.log(val)
      this.currentRow = val
      // TODO跳转 router
      this.$router.push({ path: '/branch/detail/' + this.currentRow.ID })
    },
    isShowDeleteDialog(index, row, column, data) {
      console.log('isShowDeleteDialog')
      this.currentRow = row
      this.dialogVisible = true
    },
    searchPartyBranch(){
      console.log('searchPartyBranch, searchValue is ' + this.searchValue)
      if(this.searchValue === '') {
        this.tableData = this.allBranchData
      }
      else {
        this.tableData = this.allBranchData.filter(branch => {
            console.log(branch.title)
            return branch.title.indexOf(this.searchValue) !== -1
        })
      }
    },
    handleSelectionChange(val) {
      console.log('---------')
      this.multipleSelection = val
    },
    createRow() {
      console.log('create')
      // TODO: 跳转到创建页面
      this.$router.push({ path: '/branch/create' })
    },
    editRow(index, row, column, data) {
      console.log('edit')
      this.$router.push({ path: '/branch/edit/' +  row.ID})
    },
    detailRow(index, row, column, data) {
      console.log('detail')
      this.$router.push({ path: '/branch/detail/' +  row.ID})
    },
    deleteRow() {
      console.log('delete')
      this.deleteData(this.currentRow.ID)
      this.dialogVisible = false
      this.fetchData()
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
