import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard'
  },

  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    children: [{
        path: 'index',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'home' }
    }]
  },
  {
    path: '/member',
    component: Layout,
    redirect: '/member/index',
    name: '党员',
    meta: { title: '党员', icon: 'partymember' },
    children: [
      {
        path: 'index',
        name: '党员管理',
        component: () => import('@/views/member/index'),
        meta: { title: '党员管理', icon: 'partymember' }
      },
      {
        path: 'detail/:id',
        name: '详情',
        hidden: true,
        component: () => import('@/views/member/detailMember') //有分析图
      },
    ]
  },

  {
    path: '/news',
    component: Layout,
    redirect: '/news/index',
    name: '党建新闻',
    meta: { title: '党建新闻', icon: 'news' },
    children: [
      {
        path: 'index',
        name: '党建新闻管理',
        component: () => import('@/views/news/index'),
        meta: { title: '党建新闻管理', icon: 'news' }
      },
      {
        path: 'create',
        name: '添加',
        hidden: true,
        component: () => import('@/views/news/createNews'),
      },
      {
        path: 'detail/:id',
        name: '详情',
        hidden: true,
        component: () => import('@/views/news/detailNews')
      },
      {
        path: 'edit/:id',
        name: '编辑',
        hidden: true,
        component: () => import('@/views/news/detailNews')
      }
    ]
  },

  {
    path: '/signOn/des',
    name: '签到详情',
    hidden: true,
    component: () => import('@/views/member/signOnDes') //有分析图
  },

  {
    path: '/news/des',
    name: '党建新闻详情页面',
    hidden: true,
    component: () => import('@/views/news/newsDes')
  },


  {
    path: '/branch',
    component: Layout,
    redirect: '/branch/index',
    name: '党支部',
    meta: { title: '党支部', icon: 'partyFlag' },
    children: [
      {
        path: 'index',
        name: '党支部管理',
        component: () => import('@/views/partyBranch/index'),
        meta: { title: '党支部管理', icon: 'partyFlag' }
      },
      {
        path: 'create',
        name: '添加',
        hidden: true,
        component: () => import('@/views/partyBranch/createPartyBranch'),
      },
      {
        path: 'detail/:id',
        name: '详情',
        hidden: true,
        component: () => import('@/views/partyBranch/detailPartyBranch')
      },
      {
        path: 'edit/:id',
        name: '编辑',
        hidden: true,
        component: () => import('@/views/partyBranch/detailPartyBranch')
      },
    ]
  },

  {
    path: '/branch/des',
    name: '党支部',
    hidden: true,
    component: () => import('@/views/partyBranch/branchDes')
  },

  {
    path: '/study',
    component: Layout,
    redirect: '/study/index',
    name: '教学资源',
    meta: { title: '教学资源', icon: 'study' },
    children: [
      {
        path: 'index',
        name: '教学资源管理',
        component: () => import('@/views/study/index'),
        meta: { title: '教学资源管理', icon: 'resources' }
      },
      {
        path: 'statistics',
        name: '统计',
        component: () => import('@/views/houses/index'),
        meta: { title: '统计', icon: 'statistics' }
      },

      {
        path: 'create',
        name: '添加',
        hidden: true,
        component: () => import('@/views/study/createStudy'),
      },
      {
        path: 'detail/:id',
        name: '详情',
        hidden: true,
        component: () => import('@/views/study/detailStudy')
      },
      {
        path: 'edit/:id',
        name: '编辑',
        hidden: true,
        component: () => import('@/views/study/detailStudy')
      },
    ]
  },

  {
    path: '/study/des',
    name: '学习资源',
    hidden: true,
    component: () => import('@/views/study/studyDes')
  },

  {
    path: '/studyTime',
    component: Layout,
    redirect: '/studyTime/index',
    name: '学习时长',
    meta: { title: '学习时长', icon: 'study' },
    children: [
      {
        path: 'index',
        name: '学习时长设置',
        component: () => import('@/views/studyTime/index'),
        meta: { title: '学习时长设置', icon: 'resources' }
      },
      {
        path: 'detail/:id',
        name: '详情',
        hidden: true,
        component: () => import('@/views/studyTime/detailStudyTime')
      },
      {
        path: 'edit/:id',
        name: '编辑',
        hidden: true,
        component: () => import('@/views/studyTime/detailStudyTime')
      }
    ]
  },

  {
    path: '/exam',
    component: Layout,
    redirect: '/exam/index',
    name: '试题库管理',
    meta: { title: '试题库管理', icon: 'exam' },
    children: [
      {
        path: 'index',
        name: '试题库管理',
        component: () => import('@/views/houses/index'),
        meta: { title: '试题库管理', icon: 'resources' }
      },
      {
        path: 'statistics',
        name: '统计',
        component: () => import('@/views/houses/index'),
        meta: { title: '统计', icon: 'statistics' }
      },
      {
        path: 'create',
        name: '添加',
        hidden: true,
        component: () => import('@/views/houses/createHouse'),
      },
      {
        path: 'detail/:id',
        name: '详情',
        hidden: true,
        component: () => import('@/views/houses/detailHouse')
      },
      {
        path: 'edit/:id',
        name: '编辑',
        hidden: true,
        component: () => import('@/views/houses/detailHouse')
      }
    ]
  },

  {
    path: '/examPaper',
    component: Layout,
    redirect: '/examPaper/index',
    name: '试卷管理',
    meta: { title: '试卷管理', icon: 'exam' },
    children: [
      {
        path: 'index',
        name: '试卷管理',
        component: () => import('@/views/houses/index'),
        meta: { title: '试卷管理', icon: 'resources' }
      },
      {
        path: 'create',
        name: '添加',
        hidden: true,
        component: () => import('@/views/houses/createHouse'),
      },
      {
        path: 'detail/:id',
        name: '详情',
        hidden: true,
        component: () => import('@/views/houses/detailHouse')
      },
      {
        path: 'edit/:id',
        name: '编辑',
        hidden: true,
        component: () => import('@/views/houses/detailHouse')
      }
    ]
  },

  {
    path: '/meeting',
    component: Layout,
    redirect: '/meeting/index',
    name: '三会一课',
    meta: { title: '三会一课', icon: 'meeting' },
    children: [
      {
        path: 'index',
        name: '三会一课管理',
        component: () => import('@/views/houses/index'),
        meta: { title: '三会一课管理', icon: 'meeting' }
      },
      {
        path: 'statistics',
        name: '统计',
        component: () => import('@/views/houses/index'),
        meta: { title: '统计', icon: 'statistics' }
      },

      {
        path: 'create',
        name: '添加',
        hidden: true,
        component: () => import('@/views/houses/createHouse'),
      },
      {
        path: 'detail/:id',
        name: '详情',
        hidden: true,
        component: () => import('@/views/houses/detailHouse')
      },
      {
        path: 'edit/:id',
        name: '编辑',
        hidden: true,
        component: () => import('@/views/houses/detailHouse')
      }
    ]
  },

  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    name: '我的',
    meta: { title: '我的', icon: 'meeting' },
    children: [
      {
        path: 'sendReview',
        name: '我发起的审批',
        component: () => import('@/views/houses/index'),
        meta: { title: '我发起的审批', icon: 'meeting' }
      },
      {
        path: 'receiveReview',
        name: '我收到的审批',
        component: () => import('@/views/houses/index'),
        meta: { title: '我收到的审批', icon: 'meeting' }
      },

      {
        path: 'meeting',
        name: '我的三会一课',
        component: () => import('@/views/houses/index'),
        meta: { title: '我的三会一课', icon: 'meeting' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

