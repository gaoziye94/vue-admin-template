datasource.vue<template>
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
      <el-table-column label="数据集编码"  align="center" >
        <template slot-scope="scope">
          {{ scope.row.setCode }}
        </template>
      </el-table-column>
      <el-table-column label="数据集名称"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.setName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述"  align="center" >
        <template slot-scope="scope">
          {{ scope.row.setDesc }}
        </template>
      </el-table-column>
      <el-table-column label="数据源编码"  align="center" >
        <template slot-scope="scope">
          {{ scope.row.sourceCode }}
        </template>
      </el-table-column>
      <el-table-column label="数据集类型"  align="center" >
        <template slot-scope="scope">
          {{ scope.row.setType }}
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
          <el-dropdown >
            <span class="el-dropdown-link">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a" @click.native="handleClick(scope.$index, scope.row)">预览数据</el-dropdown-item>
              <el-dropdown-item command="b">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog
      title="编辑数据源"
      :visible.sync="dialogVisible"
      :before-close="handleClose">
<!--        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">-->
<!--          <el-form-item label="数据集类型" prop="setType" hidden>-->
<!--            <el-input v-model="ruleForm.setType"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="数据集编码" prop="setCode">-->
<!--            <el-input v-model="ruleForm.setCode"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="数据集名称" prop="setName">-->
<!--            <el-input v-model="ruleForm.setName"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="数据集描述" prop="setDesc">-->
<!--            <el-input v-model="ruleForm.setDesc"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
      <el-form :model="httpForm"  label-width="100px" class="demo-ruleForm">
        <el-form-item label="请求路径" prop="apiUrl">
          <el-input placeholder="请输入请求路径" v-model="httpForm.apiUrl" class="input-with-select">
            <el-select v-model="httpForm.method" slot="prepend" placeholder="请选择" style="width: 100px;">
              <el-option label="GET" value="GET"></el-option>
              <el-option label="POST" value="POST"></el-option>
              <el-option label="PUT" value="PUT"></el-option>
              <el-option label="DELETE" value="DELETE"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="请求头" prop="header">
          <el-input v-model="httpForm.header"></el-input>
        </el-form-item>
        <el-form-item label="请求体" prop="body">
          <el-input v-model="httpForm.body"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
<!--    <el-button @click="dialogVisible = false">取 消</el-button>-->
<!--    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
         <el-button type="primary" @click="testTransform">测试数据</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import { getListPage, testTransform } from '@/api/dataSet'

export default {
  name: 'DataSet',
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
      dictCode: '',
      dialogVisible: false,
      input3: '',
      methodType: '',
      httpForm: {
        apiUrl: 'https://www.bdsaas.com/api/companyCase/list?currentPage=1&pageSize=8',
        method: 'GET',
        header: '{"Content-Type":"application/json;charset=UTF-8"}',
        body: ''
      },
      ruleForm: {
        sourceCode: '',
        setType: 'http',
        setCode: '',
        setName: '',
        setDesc: ''
      },
      rules: {
        setCode: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        setName: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    //测试数据
    testTransform() {
      console.log('submit!')
      testTransform({ 'setType': this.ruleForm.setType,
        'dynSentence': JSON.stringify(this.httpForm) }).then(response => {
        console.log(response)
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
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
      if (this.dialogVisible === false) {
        this.dialogVisible = true
      }
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
