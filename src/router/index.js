import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import(/* webpackChunkName: "about" */ '../views/Registro.vue')
  },
  {
    path: '/loguin',
    name: 'Loguin',
    component: () => import(/* webpackChunkName: "about" */ '../views/Loguin.vue')
  },
  {
    path: '/vista',
    name: 'Vista-uno',
    component: () => import(/* webpackChunkName: "about" */ '../views/vistas/Vista-uno.vue')
  },
  {
    path: '/vista',
    name: 'Vista-dos',
    component: () => import(/* webpackChunkName: "about" */ '../views/vistas/Vista-dos.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
