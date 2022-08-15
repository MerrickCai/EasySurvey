import { createRouter, createWebHashHistory } from 'vue-router'

//主路由(懒加载=>提高性能)
const survey = () => import('../view/survey.vue')
const pinia = () => import('../view/pinia.vue')
const login = () => import('../view/login.vue')
const notFound = () => import('../view/notFound.vue')
const statistics = () => import('../view/statistics.vue')

//嵌套路由
import AccountLogin from '../components/AccountLogin.vue'
import WechatLogin  from '../components/WechatLogin.vue'
import register  from '../components/register.vue'

const routes = [
    {
        path: '/',
        name: 'survey',
        component: survey
    },
    {
        path: '/pinia',
        name: 'pinia',
        component: pinia
    },
    {
        path: '/login',
        name:'login',
        redirect:"/login/AccountLogin",
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
]

export default createRouter({
    history: createWebHashHistory(),
    routes
})