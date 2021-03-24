require('normalize.css/normalize.css') // css resets
require('./styles/index.scss')
import 'font-awesome/scss/font-awesome.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

import './permission'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
app.use(ElementPlus, { size: 'small', locale })

import ImagePreview from './components/imagePreview/index'
app.use(ImagePreview)

import ContentBody from 'components/contentBody'
app.component('content-body', ContentBody)

// 初始化主题
store.dispatch('SwitchTheme', store.getters.theme)

// 获取baseURL
store.dispatch('GetBaseURL').then(() => {
  app.use(store).use(router).mount('#app')
})
