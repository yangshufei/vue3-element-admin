<template>
<div class="table-container" id="table-container">
  <div class="filter-content" ref="searchElm" :style="showAllFilter ? '' : 'padding:12px 10px'">
    <div class="more-label" @click="setFilterForm()">
      <span v-show="!showAllFilter">
        <i class="el-icon-caret-bottom"></i>
      </span>
      <span v-show="showAllFilter">
        <i class="el-icon-caret-top"></i>
      </span>
    </div>
    <el-form inline v-show="showAllFilter">
      <el-form-item label="条件一：">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="条件二：">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="条件三：">
        <el-input></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table-content public-table">
    <el-table :data="tableData"  style="width: 100%" border stripe :max-height="maxTableHeight">
      <el-table-column prop='one' label='序号' type="index" width='50px'></el-table-column>
      <el-table-column prop='name' label='姓名'></el-table-column>
    </el-table>
  </div>
  <div class="fiexd-pagination">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :currentPage="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, sizes,"
      :total="1000">
    </el-pagination>
  </div>
</div>
</template>

<script>
import tableHeight from './tableHeight'
import { ref } from 'vue'
export default {
  name: 'TableOne',
  setup() {
    const { showAllFilter, maxTableHeight, setFilterForm } = tableHeight()
    const tableData = ref([])
    const currentPage = ref(1)
    const pageSize = ref(10)
    for (let i = 1; i < 100; i++) {
      tableData.value.push({})
    }
    function handleSizeChange(size) {
      pageSize.value = size
    }
    function handleCurrentChange(page) {
      currentPage.value = page
    }
    return {
      showAllFilter,
      maxTableHeight,
      setFilterForm,
      tableData,
      currentPage,
      pageSize,
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>

<style lang="scss">
.table-container {
  padding: 15px;
  background: #fff;
}
.filter-content{
  background-color: #f5f5f5;
  padding: 20px 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  position: relative;
  transition: 0.3s all;
  .more-label {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border: 1px #eee solid;
    box-shadow: 0 0 25px rgba(100, 100, 100, 0.17);
    font-size: 12px;
    color: #666;
    height: 22px;
    line-height: 22px;
    text-align: center;
    border-radius: 8px 8px 0 0;
    background: #fdfdfd;
    padding-left: 5px;
    padding-right: 5px;
    &:hover{
      cursor: pointer;
    }
  }
}
.fiexd-pagination{
  position: fixed;
  bottom: 0px;
  width: 100%;
  margin-left: -15px;
  margin-right: 15px;
  background-color: #f5f5f5;
  padding: 20px 10px;
  z-index: 20;
}
</style>
