import { createRouter, createWebHashHistory } from 'vue-router'

import home from '../view/home.vue'
import pinia from '../view/pinia.vue'
import login from '../view/login.vue'
import notFound from '../view/notFound.vue'

const routes = [
    {
        path: '/',
        name:'home',
        component: home
    },
    {
        path: '/pinia',
        name:'pinia',
        component: pinia
    },
    {
        path: '/login/:account?',
        name:'login',
        component: login
    },
    {
        path: '/:path(.*)',
        name:'notFound',
        component: notFound
    },
]

export default createRouter({
    history: createWebHashHistory(),
    routes
})