
import axios from 'axios'
import { ElNotification, ElMessageBox } from 'element-plus'
import store from '../store'
import { parseTime, aesEncrypt, aesDecrypt } from 'utils'

// axios.defaults.timeout = 5000 // 超时 5 秒

// request拦截器
axios.interceptors.request.use(
  config => {
    if (store.getters.token) {
      const decrypted = aesDecrypt(store.getters.token)
      config.headers['xtoken'] = aesEncrypt(decrypted + ',' + parseTime(Date.now(), '{y}{m}{d}{h}{i}{s}'))
    }
    // if (!config.headers.sys) {
    //   config.headers.sys = store.getters.system_key
    // }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response拦截器
axios.interceptors.response.use(
  response => {
    const result = response.data
    const reqConfig = response.config
    let requestURL = reqConfig.url

    // 校验请求是否为本地配置文件
    if (requestURL.indexOf('config.json') > -1) {
      return result
    }

    // No permission
    if (response.headers.exceptioncode === '4') {
      requestURL = requestURL.replace(reqConfig.baseURL, '')
      ElNotification({
        title: '错误',
        message: requestURL + '没有权限,请联系管理员!',
        type: 'error',
        duration: 5 * 1000
      })
      Promise.reject(response.headers.exceptionmessage)
      return
    }

    // Session time out
    if (response.headers.exceptioncode === '5') {
      ElMessageBox.alert('会话已超时，请重新登录！', '提示', {
        confirmButtonText: '确定',
        callback: () => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()
          })
        }
      })
      return new Promise(() => {})
    }
    if (result.code === 1) { // success
      return result
    } else if (result.status === 0) {
      // 丰景台
      return result
    } else {
      return Promise.reject(result.msg || result.errMsg || `暂无数据`)
    }
  },
  error => {
    console.log('err' + error) // for debug
    ElNotification({
      title: '错误',
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default axios
