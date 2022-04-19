<template>
  <div class="app-container">
    <!--数据字典-->
    <el-header class="header-container">
      <el-form :inline="true" class="demo-form-inline">
        <!--搜索-->
        <el-form-item label="字典名称" size="mini">
          <el-input placeholder="请输入" />
        </el-form-item>
        <el-form-item label="字典编码" size="mini">
          <el-input placeholder="请输入" />
        </el-form-item>
        <!--重置 + 查询-->
        <el-form-item size="mini" style="float: right">
          <el-button>重置</el-button>
        </el-form-item>
        <el-form-item size="mini" style="float: right">
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <!--操作按钮-->
    <el-header class="header-container-button">
      <el-button size="mini" type="primary" icon="el-icon-edit">刷新字典项</el-button>
      <el-button size="mini" icon="el-icon-plus">新增</el-button>
      <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
    </el-header>
    <!--表格-->
    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        type="index"
        align="center"
        width="190"
      />
      <el-table-column
        prop="dictName"
        label="字典名称"
        width="190"
        align="center"
      />
      <el-table-column
        prop="dictCode"
        label="描述"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column
        prop="createdTime"
        label="创建时间"
        width="190"
        align="center"
      >
        <template slot-scope="scope">{{ $moment(scope.row.createdTime).format('YYYY-MM-DD') }}</template>
      </el-table-column>
      <el-table-column
        prop="createdBy"
        label="创建人"
        width="190"
        align="center"
      />
      <el-table-column
        prop="updatedTime"
        label="更新时间"
        width="190"
        align="center"
      >
        <template slot-scope="scope">{{ $moment(scope.row.updatedTime).format('YYYY-MM-DD') }}</template>
      </el-table-column>
      <el-table-column
        prop="updatedBy"
        label="更新人"
        width="190"
        align="center"
      />
      <el-table-column
        prop="operation"
        label="操作"
        width="190"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
          >编辑</el-button>
          <el-dropdown>
            <span class="el-dropdown-link">
              更多<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">编辑字典项</el-dropdown-item>
              <el-dropdown-item command="b">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <el-pagination
      style="margin-top: 15px"
      align="center"
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { getDictionariesData, getPagingData, getPaginDataById } from '@/api/dict1'
export default {
  name: 'Dictionaries',
  data() {
    return {
      tableData: [], // 表格的数据
      listLoading: true, // 表格的loading
      companyId: this.$store.state.user.company, // 公司的id
      page: 1, // 当前页
      pagesize: 10, // 每页多少条数据
      total: '', // 总条数
      pages: '' // 总页数
    }
  },
  mounted() {
    // this.getAllData()
    this.getPagingData()
  },
  methods: {
    // 表格的方法
    handleSelectionChange() {
      return false
    },
    // 获取全部表格数据
    // getAllData() {
    //   getDictionariesData().then(response => {
    //     this.tableData = response.data
    //     this.listLoading = false
    //   }).catch(error => {
    //     console.log('错误原因', error)
    //     this.listLoading = false
    //   })
    // },
    // 获取分页表格的数据
    getPagingData() {
      getPagingData({ 'companyId': this.companyId, 'page': this.page, 'pagesize': this.pagesize }).then(response => {
        this.tableData = response.data.records
        this.total = response.data.total
        this.listLoading = false
      }).catch(error => {
        this.listLoading = false
      })
    },
    // 当前页面请求
    handleCurrentChange(val) {
      this.page = val
      this.getPagingData()
    },
    // 根据id获取数据
    getDataById(id) {
      getPaginDataById(id).then(response => {
        console.log('-------------------根据id获取的数据', response)
      })
    }
  }
}
</script>

<style scoped>
.demo-form-inline{
  margin-top: 15px;
  margin-left: 15px;
}
/deep/ .el-input__inner{
  width: 360px;
}
.header-container-button{
  border-top: 1px solid #999;
  padding-top: 15px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF !important;
  font-size: 12px !important;
  margin-left: 10px !important;
}
</style>
