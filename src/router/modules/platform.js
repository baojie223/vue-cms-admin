// import Layout from '@/layout'
import BasicLayout from '@/layout/BasicLayout.vue'

const platformRouter = {
  path: '/platform',
  component: BasicLayout,
  redirect: '/platform/client-management',
  name: 'Platform',
  meta: {
    title: '平台',
    icon: 'home',
    app: ['Platform']
  },
  children: [
    {
      path: '/platform/tenant',
      component: () => import('@/views/platform/tenant'),
      name: 'Tenant',
      meta: {
        title: '租户',
        icon: 'user',
        permission: ['Platform.Tenant']
      }
    },
    {
      path: '/platform/client-management',
      component: () => import('@/views/platform/client-management'),
      redirect: '/platform/client-management/my-client',
      name: 'ClientManagement',
      meta: {
        title: '客户管理',
        icon: 'team',
        permission: ['Platform.Customers']
      },
      children: [
        {
          path: '/platform/client-management/my-client',
          component: () =>
            import('@/views/platform/client-management/my-client'),
          name: 'MyClient',
          meta: { title: '我的客户', permission: ['Platform.Customers.My'] }
        },
        {
          path: '/platform/client-management/client-request',
          component: () =>
            import('@/views/platform/client-management/client-request'),
          name: 'ClientRequest',
          meta: {
            title: '客户合作请求',
            permission: ['Platform.Customers.Apply']
          }
        },
        {
          path: '/platform/client-management/my-request',
          component: () =>
            import('@/views/platform/client-management/my-request'),
          name: 'MyRequest',
          meta: {
            title: '我的合作请求',
            permission: ['Platform.Customers.MyApply']
          }
        }
      ]
    },
    {
      path: '/platform/system',
      component: () => import('@/views/platform/system'),
      redirect: '/platform/system/theme',
      name: 'System',
      meta: { title: '系统', icon: 'code', permission: ['Platform.System'] },
      children: [
        {
          path: '/platform/system/theme',
          component: () => import('@/views/platform/system/theme'),
          name: 'Theme',
          meta: { title: '外观设置' }
        }
      ]
    }
  ]
}

export default platformRouter
