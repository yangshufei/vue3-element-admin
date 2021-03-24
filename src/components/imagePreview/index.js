import { createApp } from 'vue'
import dialog from './index.vue'
import { ElDialog } from 'element-plus'

function mountContent(option) {
  const dom = document.createElement('div')
  document.body.appendChild(dom)
  const app = createApp(dialog, {
    close: () => { app.unmount(dom); document.body.removeChild(dom) },
    ...option
  })
  app.use(ElDialog).mount(dom)
}

export default {
  install(app) {
    app.config.globalProperties.$ImagePreview = mountContent
  }
}
