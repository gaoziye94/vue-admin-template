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
      v-loading="listLoading"
      ref="multipleTable"
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
        prop="index"
        label="序号"
        width="190"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="字典名称"
        width="190"
        align="center"
      />
      <el-table-column
        prop="describe"
        label="描述"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column
        prop="createdTime"
        label="创建时间"
        width="190"
        align="center"
      />
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
      />
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
      />
    </el-table>
    <!--分页-->
    <el-pagination
      align="center"
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
</template>

<script>
import { getDictionariesData } from '../../api/dict1'
export default {
  name: 'Dictionaries',
  data() {
    return {
      listLoading: true // 表格的loading
    }
  },
  methods: {
    // 表格的方法
    handleSelectionChange() {
      return false
    },
    // 获取表格数据
    async getAllData() {
      const result = await getDictionariesData()
      console.log('---------------请求的结果', result)
    }
  },
  mounted() {
    this.getAllData()
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
</style>
