export const baseOption = () => ({
  color: [
    '#6FE975', '#E88080', '#4B98D6', '#F86B4F', '#B279FF',
    '#FF90C9', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
    '#C6E579', '#D7504B', '#F4E001', '#F0805A', '#26C0C0',
    '#F93C3C', '#9EF74E', '#FAEC4B', '#FEA965', '#3F8BFC'
  ],
  title: {
    show: true,
    left: 'center',
    textStyle: {
      color: '#848FA1'
    },
    subtextStyle: {
      color: '#848FA1'
    }
  },
  tooltip: {
    show: true,
    trigger: 'axis'
  },
  yAxis: {
    show: true,
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#848FA1'
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#848FA1',
      margin: 12
    },
    nameTextStyle: {
      color: '#848FA1'
    },
    splitLine: {
      show: false
    },
    splitArea: {}
  },
  xAxis: {
    show: true,
    type: 'category',
    axisLine: {
      lineStyle: {
        color: '#848FA1'
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#848FA1',
      margin: 12
    },
    nameTextStyle: {
      color: '#848FA1'
    }
  },
  legend: {
    show: true,
    left: 'right',
    orient: 'vertical',
    textStyle: {
      color: '#ffffff'
    },
    data: []
  }
})
