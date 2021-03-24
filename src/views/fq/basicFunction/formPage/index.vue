<template>
<content-body title="表单查询">
  <template #filter>
    <div class="float-right">
      <el-button type="primary" icon="el-icon-fa fa-search" @click="search">查询</el-button>
      <el-button type="info" icon="el-icon-fa fa-refresh" @click="reset">清空</el-button>
      <el-button type="primary" icon="el-icon-fa fa-download" @click="exportData" :loading="exportLoading" disabled>导出</el-button>
    </div>
    <el-form ref="formRef" inline :model="form" label-width="80px">
      <el-form-item label="活动名称：" prop="name">
        <el-input v-model="form.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="活动区域：" prop="region">
         <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <div>
         <el-form-item label="活动性质：" prop="type">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
    </el-form>
  </template>

  <public-table :pageOptions="initPagination" :tableList="tableData" @reload="tableReload" v-loading="tableLoading">
    <el-table-column prop="name" label="活动名称" align="center" />
    <el-table-column prop="region" label="活动区域" align="center" />
    <el-table-column prop="type" label="活动性质" align="center" />
    <el-table-column prop="img" label="图片" align="center">
      <template v-slot>
        <img :src="imageUrl" width="100" height="100" @click="ctx.$ImagePreview({src:imageUrl})" />
      </template>
    </el-table-column>
     <el-table-column label="操作" align="center">
        <template v-slot="{row}">
          <el-button type="text" @click="dialogHandle(row)">编辑</el-button>
        </template>
      </el-table-column>
  </public-table>

  <edit-dialog v-if="dialogShow" v-model:show="dialogShow" :detailRow="detailRow"></edit-dialog>
</content-body>
</template>

<script>
import { ref, reactive, toRefs, onMounted, getCurrentInstance } from 'vue'
import publicTable from 'components/publicTable'
import editDialog from './editDialog'
export default {
  components: {
    publicTable,
    editDialog
  },
  setup() {
    const formRef = ref(null)
    const state = reactive({
      form: {
        name: '',
        region: '',
        type: []
      },
      tableData: [],
      tableLoading: false,
      initPagination: {
        pageNum: 1,
        pageSize: 10,
        total: 10
      },
      exportLoading: false,
      detailRow: {},
      dialogShow: false,
      imageShow: false,
      imageUrl: 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2676935521,922112450&fm=11&gp=0.jpg'
    })

    const { ctx } = getCurrentInstance()

    const dialogHandle = (row) => {
      state.detailRow = row
      state.dialogShow = true
    }

    const tableReload = (options) => {
      state.initPagination.pageSize = options.pageSize
      state.initPagination.pageNum = options.pageNum
      getList()
    }

    const getList = () => {
      state.tableData = [
        { name: '活动一', region: '区域一', type: '美食/餐厅线上活动' },
        { name: '活动二', region: '区域二', type: '地推活动' },
        { name: '活动一', region: '区域一', type: '线下主题活动' }
      ]
    }

    const search = () => {
      state.initPagination.pageNum = 1
      getList()
    }
    const reset = () => {
      formRef.value.resetFields()
    }
    const exportData = () => {
    }

    onMounted(() => {
      getList()
    })

    return {
      ...toRefs(state),
      tableReload,
      search,
      reset,
      exportData,
      dialogHandle,
      ctx
    }
  }
}
</script>
