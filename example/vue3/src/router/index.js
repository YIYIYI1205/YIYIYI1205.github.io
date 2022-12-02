import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../view/index.vue'
import Home from '../view/home.vue'
import Pinia from '../view/pinia.vue'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/index',
      component: Index
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/pinia',
      component: Pinia
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    console.log(to.path)
    if (to.path === '/home') {
      // 始终在元素 #main 上方滚动 10px
      return {
        // 也可以这么写
        // el: document.getElementById('main'),
        el: '#main',
        top: -10
      }
    }
  }
})
export default router
