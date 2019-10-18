const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.user.avatar,
  name: state => state.user.user.name,
  permissionRoutes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  apps: state => state.user.apps,
  permissions: state => state.user.permissions,
  hasAbility: state => state.user.apps && state.user.apps.length > 0 && state.user.permissions && state.user.permissions.length > 0,
  logo: state => state.user.settings.logo
}
export default getters
