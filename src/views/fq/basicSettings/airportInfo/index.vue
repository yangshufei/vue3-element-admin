<template>
  <content-body title="基础信息">
    <template v-slot:filter>
      <div class="float-right">
        <el-button type="primary" icon="el-icon-fa fa-search" @click="search">查询</el-button>
        <el-button type="info" icon="el-icon-fa fa-refresh" @click="reset">清空</el-button>
        <el-button type="primary" icon="el-icon-fa fa-download" @click="exportData" :loading="exportLoading" disabled>导出</el-button>
      </div>
      <el-form :inline="true" :model="form" ref="form" label-width="90px">
        <el-form-item label="活动名称：" prop="aptIcao">
          <el-input v-model="form.aptIcao" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="活动区域：" prop="aptCName">
          <el-input v-model="form.aptCName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="活动类别：" prop="dOri">
          <el-select v-model="form.dOri" placeholder="请选择" clearable>
            <el-option v-for="(item, index) in dOriList" :key="index" :value="item.code" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <div>
          <el-form-item label="活动性质：" prop="altiplanoList">
            <el-checkbox-group v-model="form.altiplanoList">
              <el-checkbox v-for="(item, index) in altiplanoList" :key="index" :label="item"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="特殊资源：" prop="flagList">
            <el-checkbox-group v-model="form.flagList">
              <el-checkbox v-for="(item, index) in flagList" :key="index" :label="item.code">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
      </el-form>
    </template>

    <public-table :pageOptions="initPagination" :tableList="tableData" @reload="tableReload" v-loading="tableLoading">
      <el-table-column prop="aptIcao" label="活动名称" align="center" />
      <el-table-column prop="aptCName" label="活动区域" align="center" />
      <el-table-column prop="dOri" label="活动类别" align="center">
         <template v-slot="{row}">
          <span>{{dOriMap[row.dOri]}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="altiplano" label="活动性质" align="center" />
      <el-table-column prop="flag" label="特殊资源" align="center">
        <template v-slot="{row}">
          <span>{{flagMap[row.flag]}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" align="center">
        <template v-slot="{row}">
          <el-button type="text" @click="dialogHandle(row)">编辑</el-button>
        </template>
      </el-table-column> -->
    </public-table>

    <!-- <edit-dialog v-if="dialogShow" v-model:show="dialogShow" :detailRow="detailRow" @reload="getList"></edit-dialog> -->
  </content-body>
</template>

<script>
import publicTable from 'components/publicTable'
// import editDialog from './editDialog'
import { fetchPostData } from 'api'
import { AIRPORT_INFO } from 'api/url'
export default {
  name: 'airportInfo',
  components: { publicTable },
  data() {
    return {
      dOriList: [{ name: '国际', code: 'I' }, { name: '国内', code: 'D' }, { name: '地区', code: 'R' }],
      altiplanoList: ['线下主题活动', '地推活动', '单纯品牌曝光'],
      flagList: [{ name: '线上品牌商赞助', code: '0' }, { name: '线下场地免费', code: '1' }, { name: '美食/餐厅线上活动', code: '2' }],
      form: {
        aptIcao: '',
        aptCName: '',
        flagList: [],
        altiplanoList: [],
        dOri: ''
      },
      tableData: [],
      tableLoading: false,
      initPagination: {
        pageNum: 1,
        pageSize: 10,
        total: 10
      },
      dialogShow: false,
      detailRow: {},
      exportLoading: false
    }
  },
  computed: {
    dOriMap() {
      return this.dOriList.reduce((result, cur) => {
        result[cur.code] = cur.name
        return result
      }, {})
    },
    flagMap() {
      return this.flagList.reduce((result, cur) => {
        result[cur.code] = cur.name
        return result
      }, {})
    }
  },
  methods: {
    dialogHandle(row) {
      this.detailRow = row
      this.dialogShow = true
    },
    tableReload(options) {
      this.initPagination.pageSize = options.pageSize
      this.initPagination.pageNum = options.pageNum
      this.getList()
    },
    getList() {
      this.tableLoading = true
      fetchPostData(AIRPORT_INFO.GET_LIST, {
        data: this.form,
        pageNum: this.initPagination.pageNum,
        pageSize: this.initPagination.pageSize
      }).then(res => {
        const { data, totalSize } = res.data
        this.tableData = data
        this.initPagination.total = totalSize
        this.tableLoading = false
      }).catch(err => {
        this.$notify({
          type: 'error',
          message: err
        })
        this.tableLoading = false
      })
    },
    search() {
      this.initPagination.pageNum = 1
      this.detailRow = {}
      this.getList()
    },
    reset() {
      this.$refs.form.resetFields()
    },
    exportData() {
      this.exportLoading = true
      // fetchPostData(CLASS_TWO_QUALI.EXPORT_DATA, this.form).then(res => {
      //   saveFile(res.data.fileName, res.data.content, 'application/vnd.ms-excel')
      //   this.exportLoading = false
      // }).catch(err => {
      //   this.$notify({
      //     type: 'error',
      //     message: err
      //   })
      //   this.exportLoading = false
      // })
    }
  },
  created() {
    // this.getList()
  }
}
</script>
