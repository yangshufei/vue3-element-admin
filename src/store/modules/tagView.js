const tagView = {
  state: {
    visitedViews: [],
    cachedViews: []
  },
  mutations: {
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) return

      if (state.visitedViews.length === 0 && view.path !== '/home') {
        state.visitedViews.push({
          name: 'home',
          path: '/home',
          title: '首页'
        })
        state.cachedViews.push('home')
      }
      state.visitedViews.push({
        name: view.name,
        path: view.path,
        title: view.meta.title || 'no-name'
      })
      if (!view.meta.noCache) {
        state.cachedViews.push(view.name)
      }
    },
    DEL_VISITED_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews.splice(index, 1)
          break
        }
      }
    },
    DEL_OTHERS_VIEWS: (state, view) => {
      // 获取首页
      const home = state.visitedViews[0]

      if (view.path === home.path) {
        state.visitedViews = [home]
        state.cachedViews = [home.name]
      } else {
        const visits = [home, view]
        const visitArr = visits.map(item => item.name)

        state.visitedViews = visits
        state.cachedViews = state.cachedViews.filter(item => visitArr.includes(item))
      }
    },
    DEL_ALL_VIEWS: (state, view) => {
      // 获取首页
      const home = state.visitedViews[0]
      if (view.path === home.path) {
        state.visitedViews = [home]
        state.cachedViews = [home.name]
      } else {
        state.visitedViews = []
        state.cachedViews = []
      }
    }
  },
  actions: {
    /** 添加缓存组件 */
    addVisitedViews({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delOthersViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_OTHERS_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delAllViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_ALL_VIEWS', view)
        resolve([...state.visitedViews])
      })
    }
  }
}
export default tagView
