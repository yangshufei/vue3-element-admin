
import { getToken, setToken, removeToken } from 'utils/auth'
import { asyncRoutes } from 'router'
const user = {
  state: {
    token: getToken(),
    user: '', // loginName
    name: '', // userName
    routers: asyncRoutes
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_NAME: (state, name) => {
      state.name = name
    }
  },

  actions: {
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        setToken('token')
        commit('SET_TOKEN', 'token')
        resolve()
      })
    },
    // 获取用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_NAME', 'realName')
        commit('SET_USER', 'loginName')
      })
    },
    // 前端 退出
    LogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    // 前端 退出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
