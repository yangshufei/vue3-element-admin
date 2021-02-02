import router from './router'
import { getToken } from 'utils/auth'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import store from './store'

const whiteList = ['/login']// 不重定向白名单
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  const token = getToken()
  if (token) {
    // console.log(1)
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // console.log(2)
      next()
      // if (store.getters.name) {
      // next()
      // NProgress.done()
      // } else {
      // try {
      //   await store.dispatch('GetUserInfo')
      //   await store.dispatch('GetPermissionMenu', { sysKey: store.getters.system_key })
      //   router.addRoutes(store.getters.accessedRouters)
      //   next({ ...to })
      // } catch {
      //   await store.dispatch('FedLogOut')
      //   next({ name: 'login', params: { sourcePath: to.path }})
      // }
      // }
    }
  } else {
    // console.log(3)
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next({ name: 'login', params: { sourcePath: to.path }}) // 否则全部重定向到登录页
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
