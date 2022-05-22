import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Splash from '../views/Splash.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Splash',
    component: Splash
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/composers/:name',
    name: 'Composer',
    component: Home
  },
  {
    path: '/pages/:page',
    name: 'Page',
    component: Home
  },
  // and finally the default route, when none of the above matches:
  {
    path: "/:pathMatch(.*)*", 
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

export default router