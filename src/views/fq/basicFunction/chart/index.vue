<template>
<content-body title="图标示例">
  <line-chart :chart-data="chartData"></line-chart>
</content-body>
</template>

<script>
import { ref } from 'vue'
import lineChart from './lineChart'

export default {
  components: {
    lineChart
  },
  setup() {
    const chartData = ref([5, 20, 36, 10, 10, 20])
    return {
      chartData
    }
  }
}
</script>
