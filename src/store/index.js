import { createStore } from 'vuex'
import app from './modules/app'
import user from './modules/user'
import tagView from './modules/tagView'
import getters from './getters'

export default createStore({
  modules: {
    app,
    user,
    tagView
  },
  getters
})
