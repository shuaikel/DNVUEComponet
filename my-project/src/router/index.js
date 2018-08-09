import Vue from 'vue'
import Router from 'vue-router'
// import Recommend from '../components/recommend/recommend.vue'
Vue.use(Router)

const Recommend = (resolve) => {
  import('@/components/recommend/recommend').then((module) => {
    resolve(module)
  })
}

const Singer = (resolve)=>{
  import('@/components/singer/singer').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
     {
      // 默认跳转到 recommend
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },
    {
      path:'/singer',
      name:"Singer",
      component: Singer
    }
  ]
})
