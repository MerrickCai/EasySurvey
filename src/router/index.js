import { createRouter, createWebHashHistory } from 'vue-router'

//路由懒加载
const home = () => import('../view/home.vue')
const pinia = () => import('../view/pinia.vue')
const login = () => import('../view/login.vue')
const notFound = () => import('../view/notFound.vue')

const routes = [
    {
        path: '/',
        name: 'home',
        component: home
    },
    {
        path: '/pinia',
        name: 'pinia',
        component: pinia
    },
    {
        path: '/login/:account?',
        name: 'login',
        component: login
    },
    {
        path: '/:path(.*)', //404页面
        name: 'notFound',
        component: notFound
    },
]

export default createRouter({
    history: createWebHashHistory(),
    routes
})