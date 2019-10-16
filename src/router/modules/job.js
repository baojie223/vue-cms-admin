import Layout from '@/layout'

const jobRouter = {
  path: '/job',
  component: Layout,
  redirect: '/job/production-plan',
  name: 'Job',
  meta: {
    title: '工单',
    icon: 'copy'
  },
  children: [
    {
      path: '/job/production-plan',
      component: () => import('@/views/job/production-plan'),
      name: 'ProductionPlan',
      meta: { title: '生产计划', icon: 'file-text' }
    }
  ]
}

export default jobRouter
