export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}
// url处理
export function param(json) {
  if (!json) return ''
  return cleanArray(Object.keys(json).map(key => {
    if (json[key] === undefined) return ''
    return encodeURIComponent(key) + '=' +
      encodeURIComponent(json[key])
  })).join('&')
}

export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

// 日期处理
export function addYear(time, iYear) {
  const tmp = new Date(time.getTime())
  const year = tmp.getFullYear() + iYear
  tmp.setFullYear(year)
  return tmp
}
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10 && !('' + time).match(/[^\d]/g)) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  return format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
}

// 数组
export function deDuplication(arr) {
  const temp = {}
  for (let i = 0; i < arr.length; i++) {
    if (!temp[arr[i]]) {
      temp[arr[i]] = true
    }
  }
  return Object.keys(temp)
}
export function concatAndDeDuplication(arr1, arr2) {
  const arr = arr1.concat(arr2)
  return deDuplication(arr)
}

/**
 * @desc 遍历源数据，匹配与value数据，并返回其属性值
 * @param [srcArray] - 目标数组
 * @param [sValue] - 匹配条件
 * @param [sValueField] - key属性名
 * @param [sTextField] - 返回的属性名
 * @returns {string}
 */
export function getTextByValueField(srcArray, sValue, sValueField = 'value', sTextField = 'text') {
  const result = srcArray.find(curr => curr[sValueField] === sValue + '')
  return result ? result[sTextField] : ''
}
/**
 * @desc 根据传入的key，将ArrayObject数据组成一个单个格式的数组
 * @param [srcArray] - 目标数组
 * @param [sKey] - object对象的某个属性名
 * @returns {Array}
 */
export function aoTransformToArray(srcArray, sKey) {
  if (!sKey) {
    throw new Error('[aoTransformToArray] require sKey parameter')
  }
  return srcArray.reduce((acc, cur) => {
    acc.push(cur[sKey])
    return acc
  }, [])
}
/**
 * @desc 转换成树形结构
 * @param data
 * @param key
 * @param parentKey
 * @param childKey
 * @returns {Array}
 */
export function arrayTransformToTree(data, key = 'id', parentKey = 'parentId', childKey = 'children', parentNameKey = 'name') {
  const tree = []

  const tmp = {}
  for (let i = 0; i < data.length; i++) {
    tmp[data[i][key]] = data[i]
  }
  for (let i = 0; i < data.length; i++) {
    if (tmp[data[i][parentKey]] && data[i][key] !== data[i][parentKey]) {
      if (!tmp[data[i][parentKey]][childKey]) {
        tmp[data[i][parentKey]][childKey] = []
      }
      if (tmp[data[i][parentKey]][parentNameKey]) {
        data[i]['parentName'] = tmp[data[i][parentKey]][parentNameKey]
      }
      tmp[data[i][parentKey]][childKey].push(data[i])
    } else {
      tree.push(data[i])
    }
  }
  return tree
}

// 其他
export function scrollTo(element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = difference / duration * 10
  setTimeout(() => {
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}
export function resetModel(model, assignObject) {
  for (const m in model) {
    const mo = model[m]
    if (typeof mo === 'undefined') {
      model[m] = ''
    } else if (typeof mo === 'number') {
      model[m] = 0
    } else if (typeof mo === 'boolean') {
      model[m] = false
    } else if (Array.isArray(mo)) {
      model[m] = []
    } else if (mo === 'object') {
      model[m] = {}
    } else {
      model[m] = ''
    }
  }
  if (assignObject) {
    Object.assign(model, assignObject)
  }
}
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  for (const property in source) {
    if (source.hasOwnProperty(property)) {
      const sourceProperty = source[property]
      if (typeof sourceProperty === 'object') {
        target[property] = objectMerge(target[property], sourceProperty)
        continue
      }
      target[property] = sourceProperty
    }
  }
  return target
}
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp
    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }
    return result
  }
}

export function arrSort(array) {
  const len = array.length
  let d
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (Number(array[i].replace(/[^0-9|\\.]+/g, '')) < Number(array[j].replace(/[^0-9|\\.]+/g, ''))) {
        d = array[j]; array[j] = array[i]; array[i] = d
      }
    }
  }

  return array
}

export function generateStr(num = 5) {
  function getCharCode() {
    const charCode = Math.ceil(Math.random() * 74 + 48)

    if ((charCode >= 58 && charCode <= 64) || (charCode >= 91 && charCode <= 96)) {
      return getCharCode()
    } else {
      return charCode
    }
  }

  let str = ''
  for (let i = 0; i < num; i++) {
    str += String.fromCharCode(getCharCode())
  }

  return str
}

// 数字每三位加',' 并以字符串返回（比较节省时间的方法）
export function toThousands(param) {
  var num = (param || 0).toString()
  var result = ''
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result
    num = num.slice(0, num.length - 3)
  }
  if (num) { result = num + result }
  return result
}
