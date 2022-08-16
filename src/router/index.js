import { createRouter, createWebHashHistory } from 'vue-router'

//主路由(懒加载=>提高性能)
const survey = () => import('../view/survey.vue')
const login = () => import('../view/login.vue')
const notFound = () => import('../view/notFound.vue')
const statistics = () => import('../view/statistics.vue')

//嵌套路由
import AccountLogin from '../components/AccountLogin.vue'
import WechatLogin from '../components/WechatLogin.vue'
import register from '../components/register.vue'
import survey1 from '../components/survey1.vue'
import survey2 from '../components/survey2.vue'
import survey3 from '../components/survey3.vue'

const routes = [
    {
        path: '/',
        name: 'survey',
        redirect: "/survey1",
        component: survey,
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
        name: 'login',
        redirect: "/login/AccountLogin",
        component: login,
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