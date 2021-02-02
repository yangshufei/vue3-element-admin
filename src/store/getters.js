const getters = {
  baseURL: state => state.app.baseURL,
  theme: state => state.app.theme,

  token: state => state.user.token,
  user: state => state.user.user,
  name: state => state.user.name,
  permission_routers: state => state.user.routers,

  visitedViews: state => state.tagView.visitedViews,
  cachedViews: state => state.tagView.cachedViews
}
export default getters
