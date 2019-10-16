import Layout from '@/layout'

const platformRouter = {
  path: '/platform',
  component: Layout,
  redirect: '/platform/client-management',
  name: 'Platform',
  meta: {
    title: '平台',
    icon: 'home'
  },
  children: [
    {
      path: '/platform/client-management',
      component: () => import('@/views/platform/client-management'),
      redirect: '/platform/client-management/my-client',
      name: 'ClientManagement',
      meta: { title: '客户管理', icon: 'team' },
      children: [
        {
          path: '/platform/client-management/my-client',
          component: () =>
            import('@/views/platform/client-management/my-client'),
          name: 'MyClient',
          meta: { title: '我的客户' }
        },
        {
          path: '/platform/client-management/my-request',
          component: () =>
            import('@/views/platform/client-management/my-request'),
          name: 'MyRequest',
          meta: { title: '我的合作请求' }
        }
      ]
    }
  ]
}

export default platformRouter
