import request from '@/utils/request'
// 这里用mock数据

/**
 *  获取销售种类    模拟数据，这里year属性就不用了
 *  @param {string}  abcode  城市code
 *  @param {number}  year    年份
 *  @returns {Array}
 */

export function selectTypeData(params) {
  return request.post('/bar/selectTypeData', params)
}

