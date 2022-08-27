import { createRouter, createWebHashHistory } from 'vue-router'

//统计数据页
const statistics = () => import('../view/statistics.vue')
//登录注册页
const login = () => import('../view/login.vue')
//创建问卷页
const surveynew = () => import('../view/surveynew.vue')
//填写问卷页
const survey = () => import('../view/survey.vue')
//404页
const notFound = () => import('../view/notFound.vue')
const test = () => import('../components/surveyTemplate/survey6.vue');
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
        path: '/surveynew',
        meta: { requireLogin: true },
        component: surveynew
    },
    {
        path: '/survey/:questionnaireId',
        meta: { requireLogin: true },
        component: survey
    },
    {
        path: '/:path(.*)', //匹配不到以上路径=>404页面
        meta: { requireLogin: false },
        component: notFound
    },
    {
        path: '/test', //匹配不到以上路径=>404页面
        meta: { requireLogin: false },
        component: test
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