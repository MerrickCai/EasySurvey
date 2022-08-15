import { createRouter, createWebHashHistory } from 'vue-router'

//路由懒加载
const home = () => import('../view/home.vue')
const pinia = () => import('../view/pinia.vue')
const login = () => import('../view/login.vue')
const notFound = () => import('../view/notFound.vue')
const AccountLogin = () => import('../components/AccountLogin.vue')
const WechatLogin = () => import('../components/WechatLogin.vue')
const register = () => import('../components/register.vue')
const statistics = () => import('../components/statistics.vue')

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
        path: '/login',
        name: 'login',
        component: login,
        children: [
            {
                path: 'AccountLogin',
                name: 'AccountLogin',
                component: AccountLogin,
            },
            {
                path: 'WechatLogin',
                name: 'WechatLogin',
                component: WechatLogin,
            },
            {
                path: 'register',
                name: 'register',
                component: register,
            },
            { // 配置默认路由(默认显示的子路由组件)
                path: "/login", // 路由地址
                redirect: "/login/AccountLogin" // 重定向
            }

        ],
    },
    {
        path: '/statistics',
        name: 'statistics',
        component: statistics
    },
    {
        path: '/:path(.*)', //404页面
        name: 'notFound',
        component: notFound
    },
];

export default createRouter({
    history: createWebHashHistory(),
    routes
})