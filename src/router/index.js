import { createRouter, createWebHashHistory } from 'vue-router'

//统计数据页
const statistics = () => import('../view/statistics.vue')

//登录注册页
const login = () => import('../view/login.vue')

//填写问卷页+创建问卷页
const survey = () => import('../view/survey.vue')
const survey1 = () => import('../components/survey1.vue')
const survey2 = () => import('../components/survey2.vue')
const survey3 = () => import('../components/survey3.vue')
const survey4 = () => import('../components/survey4.vue')
const survey5 = () => import('../components/survey5.vue')



const surveynew = () => import('../components/surveynew.vue')
const matrixlist = () => import('../components/matrixlist.vue')

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
                path: 'survey3/:id',
                component: survey3,
            },
            {
                path: 'survey4/:id',
                component: survey4,
            },
            {
                path: 'survey5/:id',
                component: survey5,
            },
            {
                path: 'surveynew',
                component: surveynew,
                children: [
                    {
                        path: 'matrixlist',
                        component: matrixlist
                    }
                ]
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
    routes,
    scrollBehavior() {
        return {
            top: 0,
            left: 0,
            behavior: 'smooth'
        }
    },
})