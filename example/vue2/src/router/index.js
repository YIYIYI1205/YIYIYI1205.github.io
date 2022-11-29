import Vue from 'vue'
import Router from 'vue-router'
import IndexVue from '../view/index.vue'
import Home from '../view/home.vue'
Vue.use(Router)
const router = new Router({
    routes: [{
        path: '/index',
        component: IndexVue
    },
    {
        path: '/home',
        component: Home
    }]
})
export default router