
// import axios from 'axios'
// import { constantRouterMap, accessedRouterMap } from 'router'
const themeKey = 'THEME'

const app = {
  state: {
    baseURL: '',
    theme: localStorage.getItem(themeKey) || 'light'
  },

  mutations: {
    SET_BASE_URL: (state, baseURL) => {
      state.baseURL = baseURL
    },
    SET_THEME: (state, theme) => {
      state.theme = theme
    }
  },
  actions: {
    GetBaseURL({ commit }) {
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line
        commit('SET_BASE_URL', CONFIG.BASE_URL)
        resolve()
      })
    },
    SwitchTheme({ commit }, theme) {
      window.document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem(themeKey, theme)
      commit('SET_THEME', theme)
    }
  }
}
export default app
