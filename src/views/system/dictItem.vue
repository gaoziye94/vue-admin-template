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
      <el-table-column label="字典编码"  align="center" >
        <template slot-scope="scope">
          {{ scope.row.dictCode }}
        </template>
      </el-table-column>
      <el-table-column label="字典项名称"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.itemName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提交值"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.itemValue }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注"  align="center" >
        <template slot-scope="scope">
          {{ scope.row.remark }}
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
    </el-table>
  </div>
</template>

<script>
import { getListPage } from '@/api/dictItem'

export default {
  name: 'DictItem',
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
      dictCode: this.$route.query.dictCode
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    insertDict() {

    },
    deleteDict() {

    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    fetchData() {
      this.listLoading = true
      getListPage({ 'dictCode': this.dictCode }).then(response => {
        this.list = response.data.records
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
