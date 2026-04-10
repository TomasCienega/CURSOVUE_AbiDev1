import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
    },
    {
    path: '/tareas',
    name: 'tareas',
    component: () => import('../views/TareasView.vue')
    },
    {
    path: '/tareas-formulario/:id?',
    name: 'tareas-formulario',
    component: () => import('../views/TareaFormularioView.vue')
  }  
],
})

export default router
