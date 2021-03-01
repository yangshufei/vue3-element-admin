import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'

export default function() {
  const iframeHtml = ref(null)
  const showAllFilter = ref(true)
  const maxTableHeight = ref(0)
  const tableDom = ref(null)
  const otherElmHeight = ref(0)
  const searchHeight = ref(0)
  const searchElm = ref()

  function getElmHeight(elm) {
    const computedStyle = getComputedStyle(elm, null) || elm.currentStyle
    const marginBottom = Number(
      computedStyle.marginBottom.replace('px', '') || 0
    )
    const marginTop = Number(computedStyle.marginTop.replace('px', '') || 0)
    return (elm.clientHeight || 0) + marginBottom + marginTop
  }

  function setFilterForm() {
    showAllFilter.value = !showAllFilter.value
    nextTick().then(() => {
      winSize()
    })
  }

  function winSize() {
    // if (this.$refs.otherElm) {
    //   // v-if 场景
    //   this.otherElmHeight = this.getElmHeight(this.$refs.otherElm)
    // } else {
    //   this.otherElmHeight = 0
    // }

    if (searchElm.value) {
      searchHeight.value = getElmHeight(searchElm.value)
    }
    // searchHeight + 分页 + (herder)  + otherElmHeight
    maxTableHeight.value =
      document.body.clientHeight -
      (searchHeight.value + 30 + 72 + 50 + otherElmHeight.value)
  }

  function initPageHeight() {
    winSize()
    const appMain = document.querySelector('#table-container')
    iframeHtml.value = document.createElement('iframe')
    iframeHtml.value.style.cssText = `
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border: 0;
      margin: 0;
      display: block;
      z-index: -999;
    `
    if (appMain) {
      appMain.appendChild(iframeHtml.value)
    }
    const _iframeHtml = iframeHtml.value.contentWindow || iframeHtml.value
    _iframeHtml.addEventListener('resize', winSize)
  }

  function getScrollDire(e) {
    const scrollTop = tableDom.value.scrollTop
    // // 有刚好把筛选条件隐藏了就表格高度刚好的情况，然后scrollTop刚好变成0了，加个判断
    const tableBodyWrapperHeight = tableDom.value.clientHeight
    let tableBodyHeight = 0
    const elTableBody = document.querySelector('.el-table__body')
    if (elTableBody) {
      tableBodyHeight = elTableBody.clientHeight
    }
    const isLessThanTable = maxTableHeight.value + (searchHeight.value + otherElmHeight.value) > tableBodyHeight
    if (
      e.wheelDelta < 0 &&
      showAllFilter.value &&
      tableBodyWrapperHeight < tableBodyHeight
    ) {
      showAllFilter.value = false
      nextTick().then(() => {
        winSize()
      })
    }
    if (scrollTop === 0 && !showAllFilter.value) {
      if (!isLessThanTable) {
        showAllFilter.value = true
        nextTick().then(() => {
          winSize()
        })
      } else {
        if (e.wheelDelta > 0) {
          showAllFilter.value = true
          nextTick().then(() => {
            winSize()
          })
        }
      }
    }
  }
  async function _initPage() {
    await nextTick()
    searchElm.value = document.querySelector('.filter-content')
    tableDom.value = document.querySelector('.el-table__body-wrapper')
    tableDom.value && tableDom.value.addEventListener('mousewheel', getScrollDire, true)
    initPageHeight()
  }

  onMounted(() => {
    _initPage()
  })
  onBeforeUnmount(() => {
    tableDom.value && tableDom.value.removeEventListener('mousewheel', getScrollDire, true)
    iframeHtml.value && iframeHtml.value.removeEventListener('resize', winSize, true)
    iframeHtml.value.remove()
  })
  return {
    iframeHtml,
    showAllFilter,
    maxTableHeight,
    tableDom,
    otherElmHeight,
    searchHeight,
    getElmHeight,
    setFilterForm,
    initPageHeight,
    _initPage
  }
}
