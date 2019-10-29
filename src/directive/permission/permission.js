import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    // console.log(el, binding, vnode)
    const { value } = binding
    const apps = store.getters && store.getters.apps
    const permissions = store.getters && store.getters.permissions

    if (value && value instanceof Array && value.length > 0) {
      const permission = value
      const hasAbility = () => {
        const hasApp = apps.some(app => {
          return permission.includes(app)
        })
        const hasPermission = permissions.some(p => {
          return permission.includes(p)
        })
        return hasApp || hasPermission
      }
      // console.log(hasAbility)
      if (!hasAbility()) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['Platform']"`)
    }
  }
}
