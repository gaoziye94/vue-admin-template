<template>
  <div class="app-container">
    <el-button @click="insertDict">新增</el-button>
    <el-button @click="deleteDict">删除</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column align="center" label="ID" >
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="数据源编码"  align="center" >
        <template slot-scope="scope">
          {{ scope.row.sourceCode }}
        </template>
      </el-table-column>
      <el-table-column label="数据源名称"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sourceName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数据源描述"  align="center" >
        <template slot-scope="scope">
          {{ scope.row.sourceDesc }}
        </template>
      </el-table-column>
      <el-table-column label="数据源类型"  align="center" >
        <template slot-scope="scope">
          {{ scope.row.sourceType }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="创建人" align="center">
        <template slot-scope="scope">
          {{ scope.row.createdBy }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createdTime }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="修改人"  align="center">
        <template slot-scope="scope">
          {{ scope.row.updatedBy }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="修改时间"  >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.updatedTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"  align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            type="text"
            size="mini"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>


  </div>
</template>

<script>
import { getListPage } from '@/api/datasource'

export default {
  name: 'Dict',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      multipleSelection: [],
      companyId: this.$store.state.user.company,
      page: 1,
      pagesize: 10,
      total: '',
      dataSource: {}

    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.page = val
      this.fetchData()
    },
    // 编辑字典项
    editItem(val) {
      this.$router.push({
        path: '/system/dictItem',
        query: {
          dictCode: val.msg.dictCode,
          project: this.$store.state.user.project
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    insertDataSource() {

    },
    deleteDataSource() {

    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    fetchData() {
      this.listLoading = true
      getListPage({ 'companyId': this.companyId, 'page': this.page, 'pagesize': this.pagesize }).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
<style scoped="scoped">
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF !important;
  font-size: 12px !important;
  margin-left: 10px !important;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
