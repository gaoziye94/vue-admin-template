<template>
  <div class="app-container">
    <!--数据字典-->
    <el-header class="header-container">
      <el-form :inline="true" class="demo-form-inline" :model="formData">
        <!--搜索-->
        <el-form-item label="字典名称" size="mini">
          <el-input ref="formDataByName" v-model.trim="formData.formDataByName" placeholder="请输入" @change="getDataByName" />
        </el-form-item>
        <el-form-item label="字典编码" size="mini">
          <el-input v-model="formData.formDataByCode" placeholder="请输入" @change="getDataByCode" />
        </el-form-item>
        <!--重置 + 查询-->
        <el-form-item size="mini" style="float: right">
          <el-button @click="resetFormData">重置</el-button>
        </el-form-item>
        <el-form-item size="mini" style="float: right">
          <el-button type="primary" @change="getDataByNameAndCode">查询</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <!--操作按钮-->
    <el-header class="header-container-button">
      <el-button size="mini" type="primary" icon="el-icon-edit" @click="updataTableData">刷新字典项</el-button>
      <el-button size="mini" icon="el-icon-plus" @click="addInputForm">新增</el-button>
      <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteDataByIdArr">删除</el-button>
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
        width="80"
        label="序号"
      />
      <el-table-column
        prop="dictName"
        label="字典名称"
        width="180"
        align="center"
      />
      <el-table-column
        prop="dictCode"
        label="字典编码"
        width="180"
        align="center"
      />
      <el-table-column
        prop="remark"
        label="描述"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column
        prop="createdTime"
        label="创建时间"
        width="180"
        align="center"
      >
        <template slot-scope="scope">{{ $moment(scope.row.createdTime).format('YYYY-MM-DD') }}</template>
      </el-table-column>
      <el-table-column
        prop="createdBy"
        label="创建人"
        width="180"
        align="center"
      />
      <el-table-column
        prop="updatedTime"
        label="更新时间"
        width="180"
        align="center"
      >
        <template slot-scope="scope">{{ $moment(scope.row.updatedTime).format('YYYY-MM-DD') }}</template>
      </el-table-column>
      <el-table-column
        prop="updatedBy"
        label="更新人"
        width="180"
        align="center"
      />
      <el-table-column
        prop="operation"
        label="操作"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="editInputForm(scope.row)"
          >编辑</el-button>
          <el-dropdown>
            <span class="el-dropdown-link">
              更多<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="jumpDictionariesItem(scope.$index,scope.row)">编辑字典项</el-dropdown-item>
              <el-dropdown-item @click.native="deleteDataById(scope.row.id)">删除</el-dropdown-item>
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
    <!--新增/编辑dialog-->
    <el-dialog :title="changeFormStatus?'新增字典':'编辑字典'" :visible.sync="formAdd">
      <!--表单区域-->
      <el-form ref="addFormData" label-width="80px" :model="ruleAddFormData" :rules="rulesAddForm">
        <el-form-item label="字典名称" prop="dictName">
          <el-input v-model="ruleAddFormData.dictName" />
        </el-form-item>
        <el-form-item label="字典编码" prop="dictCode">
          <el-input v-model="ruleAddFormData.dictCode" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="ruleAddFormData.remark" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formAdd = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPagingData, deleteDataByIdArr, addOneData, editOneData, deleteDataById } from '@/api/dict1'
export default {
  name: 'Dictionaries',
  data() {
    return {
      formData: {
        formDataByName: '',
        formDataByCode: ''
      }, // 输入框数据
      tableData: [], // 表格的数据
      listLoading: true, // 表格的loading
      companyId: this.$store.state.user.company, // 公司的id
      page: 1, // 当前页
      pagesize: 10, // 每页多少条数据
      total: null, // 总条数
      pages: '', // 总页数
      formAdd: false, // 控制新增表单
      formLabelWidth: 80,
      ruleAddFormData: {
        companyId: this.$store.state.user.company || 0,
        dictCode: '',
        dictName: '',
        remark: ''
      }, // 新增表单数据
      rulesAddForm: {
        dictName: [
          { required: true, message: '请输入字典名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        dictCode: [
          { required: true, message: '请输入字典编码', trigger: 'blur' }
        ]
      }, // 表单校验
      idArr: [], // id的数组
      changeFormStatus: true
    }
  },
  mounted() {
    // this.getAllData()
    this.getPagingData()
  },
  methods: {
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
      const params = {
        'companyId': this.companyId,
        'page': this.page,
        'pagesize': this.pagesize,
        'dictName': this.tableData.formDataByName,
        'dictCode': this.tableData.formDataByCode
      }
      getPagingData(params).then(response => {
        console.log('------------------------数据', response)
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
      this.resetFormData()
      this.getPagingData()
    },
    // 根据id/名称获取数据
    getDataByName() {
      getPagingData({
        dictName: this.formData.formDataByName
      }).then(result => {
        this.tableData = result.data.records
      })
    },
    // 根据code获取数据
    getDataByCode() {
      getPagingData({
        dictCode: this.formData.formDataByCode
      }).then(result => {
        this.tableData = result.data.records
      })
    },
    // 查询
    getDataByNameAndCode() {
      getPagingData({
        dictCode: this.formData.formDataByCode,
        dictName: this.formData.formDataByName
      }).then(result => {
        this.tableData = result.data.records
      })
    },
    // 刷新字典数据
    updataTableData() {
      this.resetFormData()
      this.getPagingData()
      this.$message({
        message: '刷新成功',
        type: 'success'
      })
    },
    // 重置数据
    resetFormData() {
      this.formData.formDataByName = ''
      this.formData.formDataByCode = ''
      this.idArr = []
      this.getPagingData()
    },
    // 新增
    addInputForm() {
      this.changeFormStatus = true
      this.formAdd = !this.formAdd
      // 清空数据
      this.ruleAddFormData = {
        companyId: this.$store.state.user.company || 0,
        dictCode: '',
        dictName: '',
        remark: ''
      }
    },
    // 编辑
    editInputForm(obj) {
      this.changeFormStatus = false
      this.formAdd = !this.formAdd
      // 处理compayId
      for (const key in obj) {
        if (key === 'companyId') {
          obj[key] = 0
        }
      }
      this.ruleAddFormData = obj
    },
    // 触发表格的单选框
    handleSelectionChange(val) {
      this.idArr = []
      val.forEach(item => {
        this.idArr.push(item.id)
      })
    },
    // 删除多个/单个数据
    deleteDataByIdArr() {
      if (this.idArr.length < 1) {
        this.$message({
          message: '至少选择一个',
          type: 'warning'
        })
        return false
      }
      // 删除确认
      this.$confirm('确定删除该字段吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDataByIdArr(this.idArr).then(result => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getPagingData()
        })
      })
    },
    // 提交表单数据
    submitForm() {
      this.$refs.addFormData.validate((valid) => {
        if (valid) {
          // 判断是新增还是编辑
          if (this.changeFormStatus) {
            // 此时是新增一条数据
            addOneData(this.ruleAddFormData).then(result => {
              this.$message({
                message: '新增成功',
                type: 'success'
              })
              this.getPagingData()
              this.formAdd = !this.formAdd
            })
          } else {
            // 此时是修改一条数据
            editOneData(this.ruleAddFormData).then(result => {
              this.$message({
                message: '编辑成功',
                type: 'success'
              })
              this.getPagingData()
              this.formAdd = !this.formAdd
            })
          }
        } else {
          this.$message({
            message: '输入有误,请检查',
            type: 'error'
          })
        }
      })
    },
    // 根据id删除数据
    deleteDataById(id) {
      this.$confirm('确定删除此数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDataById(id).then(result => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getPagingData()
        })
      })
    },
    // 跳转到字典项路由
    jumpDictionariesItem(index, row) {
      // 跳转到编辑字典项
      this.$router.push({
        path: '/system/dictItem',
        query: {
          dictCode: row.dictCode
        }
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
