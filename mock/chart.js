module.exports = [
  {
    url: '/bar/selectTypeData',
    type: 'post',
    response: (config) => {
      return {
        code: 200,
        data: [
          {
            name: '电脑',
            value: (Math.random() * 1500).toFixed(2)
          },
          {
            name: '手机',
            value: (Math.random() * 1500).toFixed(2)
          },
          {
            name: '汽车',
            value: (Math.random() * 1500).toFixed(2)
          },
          {
            name: '空调',
            value: (Math.random() * 1500).toFixed(2)
          },
          {
            name: '冰箱',
            value: (Math.random() * 1500).toFixed(2)
          },
          {
            name: '电视',
            value: (Math.random() * 1500).toFixed(2)
          }
        ]
      }
    }
  }
]
