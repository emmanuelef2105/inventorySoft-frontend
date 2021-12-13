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
    path: '/loguina',
    name: 'Loguina',
    component: () => import(/* webpackChunkName: "about" */ '../views/Loguin/LoguinAu.vue')
  },
  {
    path: '/loguinv',
    name: 'Loguinv',
    component: () => import(/* webpackChunkName: "about" */ '../views/Loguin/LoguinV.vue')
  },
  {
    path: '/vista',
    name: 'Vista-uno',
    component: () => import(/* webpackChunkName: "about" */ '../views/vistas/Vista-uno.vue')
  },
  {
    path: '/vista2',
    name: 'Vista-dos',
    component: () => import(/* webpackChunkName: "about" */ '../views/vistas/Vista-dos.vue')
  },
  {
    path: '/vista3',
    name: 'Vista-tres',
    component: () => import(/* webpackChunkName: "about" */ '../views/vistas/Vista-tres.vue')
  },
  {
    path: '/vista4',
    name: 'Vista-cuatro',
    component: () => import(/* webpackChunkName: "about" */ '../views/vistas/Vista-cuatro.vue')
  },
  //vistas administrador
  {
    path: '/productos',
    name: 'aproductos',
    component: () => import(/* webpackChunkName: "about" */ '../views/VistaA/AProductos.vue')
  },
  {
    path: '/compras',
    name: 'acompras',
    component: () => import(/* webpackChunkName: "about" */ '../views/VistaA/ACompras.vue')
  },
  {
    path: '/ventas',
    name: 'aventas',
    component: () => import(/* webpackChunkName: "about" */ '../views/VistaA/AVentas.vue')
  },
  {
    path: '/usuarios',
    name: 'ausuarios',
    component: () => import(/* webpackChunkName: "about" */ '../views/VistaA/AUsuarios.vue')
  },//Vistas auxiliar
  {
    path: '/aucompras',
    name: 'aucompras',
    component: () => import(/* webpackChunkName: "about" */ '../views/VistaAu/AuCompras.vue')
  },
  {
    path: '/auproductos',
    name: 'auproductos',
    component: () => import(/* webpackChunkName: "about" */ '../views/VistaAu/AuProductos.vue')
  },
  //vistas vendedor
  {
    path: '/vventas',
    name: 'vventas',
    component: () => import(/* webpackChunkName: "about" */ '../views/VistaV/VVentas.vue')
  },
  {
    path: '/vproductos',
    name: 'vproductos',
    component: () => import(/* webpackChunkName: "about" */ '../views/VistaV/VProductos.vue')
  }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
