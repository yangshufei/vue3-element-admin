<template>
<content-body title="图标示例">
  <line-chart :chart-data="chartData"></line-chart>
</content-body>
</template>

<script>
import { onMounted, ref } from 'vue'
import lineChart from './lineChart'
import { selectTypeData } from 'api/mockChart'

export default {
  components: {
    lineChart
  },
  setup() {
    const chartData = ref([5, 20, 36, 10, 10, 20])

    const getChartData = async() => {
      const { data } = await selectTypeData()
      console.log(data, 'chart')
    }

    onMounted(() => {
      getChartData()
    })
    return {
      chartData
    }
  }
}
</script>
