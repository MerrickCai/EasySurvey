import { createRouter, createWebHashHistory } from 'vue-router'

//主路由
const survey = () => import('../view/survey.vue')
const login = () => import('../view/login.vue')
const notFound = () => import('../view/notFound.vue')
const statistics = () => import('../view/statistics.vue')

//嵌套路由
const AccountLogin = () => import('../components/AccountLogin.vue')
const WechatLogin = () => import('../components/WechatLogin.vue')
const register = () => import('../components/register.vue')
const survey1 = () => import('../components/survey1.vue')
const survey2 = () => import('../components/survey2.vue')
const survey3 = () => import('../components/survey3.vue')

//路由数组
const routes = [
    {
        path: '/',
        component: survey,
        redirect: "/survey1",
        children: [
            {
                path: 'survey1',
                component: survey1,
            },
            {
                path: 'survey2',
                component: survey2,
            },
            {
                path: 'survey3',
                component: survey3,
            }
        ]
    },
    {
        path: '/login',
        component: login,
        redirect: "/login/AccountLogin",
        children: [
            {
                path: 'AccountLogin',
                component: AccountLogin,
            },
            {
                path: 'WechatLogin',
                component: WechatLogin,
            },
            {
                path: 'register',
                component: register,
            }
        ],
    },
    {
        path: '/statistics',
        component: statistics
    },
    {
        path: '/:path(.*)', //匹配不到以上路径：跳转404页面
        component: notFound
    },
]

export default createRouter({
    history: createWebHashHistory(),
    routes
})