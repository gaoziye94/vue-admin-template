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
      <el-table-column label="字典名称"  align="center" >
        <template slot-scope="scope">
          {{ scope.row.dictName }}
        </template>
      </el-table-column>
      <el-table-column label="字典编码"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dictCode }}</span>
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
      <el-table-column label="操作"  align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a" @click.native="handleClick(scope.$index, scope.row)">编辑字典项</el-dropdown-item>
              <el-dropdown-item command="b">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getListPage } from '@/api/dict'

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
      dictCode: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleClick(index, row) {
      console.log(index, row)
      this.dictCode = row.dictCode
    },
    handleCommand(command) {
      if ('a' === command) {
        let that = this
        setTimeout(function() {
          that.$router.push({
            path: '/system/dictItem',
            query: {
              dictCode: that.dictCode
              // project: this.$store.state.user.project
            }
          })
        }, 3)
      }
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
      getListPage().then(response => {
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
