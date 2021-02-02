
<template>
  <div class="public-table">
    <el-table
      v-if="tableshow"
      ref="table"
      :data="tableList"
      stripe
      @row-click="rowClick"
      @selection-change="selectionChange"
      @sort-change="sortChange"
      :max-height="height"
      :row-class-name="rowClassName"
      :show-summary="showSummary"
      :summary-method="summaryMethod"
      :span-method="spanMethod"
      @cell-mouse-enter="cellMouseEnter"
      @cell-mouse-leave="cellMouseLeave"
    >
      <slot></slot>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      style="marginTop:15px;"
      v-if="tableList.length && showPagination"
      @current-change="currentChange"
      @size-change="sizeChange"
      :current-page="innerOption.pageNum"
      :page-sizes="pages.pageSizes"
      :page-size="innerOption.pageSize"
      :total="innerOption.total"
      :layout="pages.layout" background>
      <span class="el-pagination__show">
        显示 {{(innerOption.pageNum - 1) * innerOption.pageSize + 1}} 到
        {{(innerOption.pageNum - 1) * innerOption.pageSize + innerOption.pageSize}} 记录</span>
    </el-pagination>
  </div>
</template>

<script>

export default {
  name: 'publicTable',
  props: {
    // 表格数据
    tableList: {
      type: Array,
      default: () => ([])
    },
    // 分页选项
    pageOptions: {
      type: Object,
      default: () => ({})
    },
    // 表格高度
    height: {
      type: Number,
      default: 530
    },
    rowClassName: {
      type: Function,
      default: () => {}
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    showSummary: {
      type: Boolean,
      default: false
    },
    summaryMethod: {
      type: Function,
      default: null
    },
    spanMethod: {
      type: Function,
      default: null
    }
  },
  watch: {
    pageOptions: {
      handler(val) {
        this.innerOption = { ...val }
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      innerOption: {},
      pages: {
        layout: 'slot, total, sizes, prev, pager, next, jumper',
        pageSizes: [5, 10, 20, 30, 50, 100]
      },
      tableshow: false
    }
  },
  methods: {
    sortChange(i) {
      let orderBy = ''
      if (i.prop) {
        if (i.order === 'ascending') {
          orderBy = `\`${i.prop}\` asc`
        } else {
          orderBy = `\`${i.prop}\` desc`
        }
      }
      this.$emit('sort-change', orderBy)
    },
    currentChange(current) {
      this.innerOption.pageNum = current

      this.$emit('reload', {
        pageNum: current,
        pageSize: this.innerOption.pageSize
      })
    },
    sizeChange(size) {
      this.innerOption.pageNum = 1
      this.innerOption.pageSize = size

      this.$emit('reload', {
        pageNum: this.innerOption.pageNum,
        pageSize: size
      })
    },
    rowClick(row) {
      this.$refs.table.toggleRowSelection(row)
      this.$emit('row-click', row)
    },
    selectionChange(val) {
      this.$emit('selection-change', val)
    },
    clearSort() {
      this.$refs.table && this.$refs.table.clearSort()
    },
    cellMouseEnter(row) {
      this.$emit('cell-mouse-enter', row)
    },
    cellMouseLeave(row) {
      this.$emit('cell-mouse-leave', row)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.tableshow = true
    })
  }
}
</script>
