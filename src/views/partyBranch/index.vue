<template>
<div class='app-container'>
  <el-row type="flex" justify="center">
        <el-button class="create_button" @click.native.prevent='createRow()' type="primary" icon="el-icon-edit"></el-button>
  </el-row>
  <el-table v-if="tableData.length" class='houses-table' :data='tableData' stripe border @selection-change="handleSelectionChange" highlight-current-row @current-change="handleCurrentChange">
        <!-- <el-table-column prop='ID' label='ID' width='100'></el-table-column> -->
        <!-- <el-table-column prop='resourceType' label='资源ID' width='180' :filters='resourceTypeFilersData' :filter-method='filterHandler'></el-table-column> -->
        <el-table-column prop='title' label='名称' width='180'></el-table-column>
        <el-table-column prop='address' label='地址'></el-table-column>
        <el-table-column prop='location' label='经纬度' width='60'></el-table-column>
        <el-table-column prop='thumbnailUrl' label='二维码图片' width='60'>
            <template slot-scope='scope'>
                <img :src="scope.row.thumbnailUrl" height="40">
            </template>
        </el-table-column>
        <el-table-column fixed='right' label='操作' width='220'>
          <template slot-scope='scope'>
            <el-button @click.native.prevent='detailRow(scope.$index, scope.row, scope.column, tableData)' type='info' size='mini'>详情</el-button>
            <el-button @click.native.prevent='editRow(scope.$index, scope.row, scope.column, tableData)' type='primary' size='mini'>编辑</el-button>
            <el-button @click.native.prevent='deleteRow(scope.$index, scope.row, scope.column, tableData)' type='primary' size='mini'>删除</el-button>
          </template>
        </el-table-column>
    </el-table>
    <div v-else >没有任何党支部数据, 请添加!</div>
    <el-dialog title="删除提示" :visible.sync="dialogVisible" width="30%">
      <span>是否删除 {{multipleSelection.length}}项数据?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false" @click.native.prevent='deleteRow()'>确 定</el-button>
      </span>
    </el-dialog>

</div>
</template>

 <script>
import { getHouses } from '@/api/houses'

export default {
  data() {
    return {
      tableData: [],
      resourceTypeFilersData: [
        {
          text: 'V01',
          value: 'V01'
        },
        {
          text: 'V02',
          value: 'V02'
        },
        {
          text: 'V03',
          value: 'V03'
        },
        {
          text: 'V4',
          value: 'V4'
        }
      ],
      multipleSelection: [],
      dialogVisible: false,
      currentRow: null
    }
  },
  created() {
    console.log('created')
    this.fetchData()
  },
  methods: {
    fetchData() {
      getHouses().then(response => {
        this.tableData = response.data.lists
      })
    },
    handleCurrentChange(val) {
      console.log(val)
      this.currentRow = val
      // TODO跳转 router
      this.$router.push({ path: '/houses/detail/' + this.currentRow.ID })
    },
    isShowDeleteDialog() {
      console.log('isShowDeleteDialog')
      if (this.multipleSelection.length !== 0) {
        this.dialogVisible = true
      }
    },
    handleSelectionChange(val) {
      console.log('---------')
      this.multipleSelection = val
    },
    filterHandler(value, row, column) {
      return row.resourceType === value
    },
    createRow() {
      console.log('create')
      // TODO: 跳转到创建页面
      this.$router.push({ path: '/houses/create' })
    },
    editRow(index, row, column, data) {
      console.log('edit')
      console.log(index)
      console.log(row)
      console.log(column)
      console.log(data)
    },
    detailRow(index, row, column, data) {
      console.log('detail')
      console.log(index)
      console.log(row)
      console.log(column)
      console.log(data)
    },
    deleteRow() {
      console.log('delete')
      // TODO:请求deletes接口
      const selectionData = this.multipleSelection
      this.tableData = this.tableData.filter(function(data) {
        return selectionData.map(function(selection) {
          return selection.ID
        }).indexOf(data.ID) === -1
      })
    }
  }
}
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  .el-row {
    background: #e5e9f2;
    height: 0.5rem;
    .create_button {
      height: 0.5rem;
    }
  }
  // .houses-table {
  //   top: 40px;
  // }
}
</style>
