import { createRouter, createWebHashHistory } from 'vue-router'

//统计数据页
const statistics = () => import('../view/statistics.vue')

//登录注册页
const login = () => import('../view/login.vue')

//填写问卷页+创建问卷页
const survey = () => import('../view/survey.vue')
const survey1 = () => import('../components/survey1.vue')
const survey2 = () => import('../components/survey2.vue')
const surveynew = () => import('../components/surveynew.vue')

//404页
const notFound = () => import('../view/notFound.vue')

const routes = [
    {
        path: '/',
        meta: { requireLogin: true },
        component: statistics
    },
    {
        path: '/login',
        meta: { requireLogin: false },
        component: login
    },
    {
        path: '/survey',
        meta: { requireLogin: true },
        component: survey,
        redirect: "/survey/survey1/1",
        children: [
            {
                path: 'survey1/:id',
                component: survey1,
            },
            {
                path: 'survey2/:id',
                component: survey2,
            },
            {
                path: 'surveynew',
                component: surveynew
            }
        ]
    },
    {
        path: '/:path(.*)', //匹配不到以上路径=>404页面
        meta: { requireLogin: false },
        component: notFound
    },
]

export default createRouter({
    history: createWebHashHistory(),
    routes
})