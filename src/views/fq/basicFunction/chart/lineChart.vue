<template>
  <div class="chartEl" ref="lineChart" style="height:700px;"></div>
</template>

<script>
import * as echarts from 'echarts'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { debounce } from 'utils'
export default {
  props: {
    chartData: [Object, Array]
  },
  setup(props) {
    const lineChart = ref(null)
    let myChart = null

    onMounted(() => {
      myChart = echarts.init(lineChart.value || lineChart)
      setChart(props.chartData)
      window.addEventListener('resize', resizeHandler)
    })

    onUnmounted(() => {
      if (!myChart) return
      if (resizeHandler) {
        window.removeEventListener('resize', resizeHandler)
      }
      myChart.dispose()
      myChart = null
    })

    watch(props.chartData, (data) => {
      setChart(data)
    })

    const resizeHandler = debounce(() => {
      if (myChart) {
        myChart.resize()
      }
    }, 100)

    const setChart = (data) => {
      let option = {}
      if (handleOption && data) {
        option = handleOption(option, data)
      }

      myChart.setOption(option, true)
    }

    const handleOption = (option, data) => {
      option.title = {
        text: 'ECharts 入门示例'
      }
      option.tooltip = {}
      option.legend = {
        data: ['销量']
      }
      option.yAxis = {}
      option.xAxis = {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      }
      option.series = [{
        name: '销量',
        type: 'bar',
        data
      }]
      return option
    }

    return {
      lineChart
    }
  }
}
</script>
