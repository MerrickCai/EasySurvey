import { createRouter, createWebHistory } from 'vue-router'

//统计数据页
const Statistics = () => import('../view/Statistics.vue')
//登录注册页
const Login = () => import('../view/Login.vue')
//创建问卷页
const SurveyNew = () => import('../view/SurveyNew.vue')
//填写问卷页
const Survey = () => import('../view/Survey.vue')
//404页
const NotFound = () => import('../view/NotFound.vue')
//个人信息页
const User = () => import('../components/user/User.vue')

const routes = [
    {
        path: '/',
        meta: { requireLogin: true },
        component: Statistics,
    },
    {
        path: '/login',
        meta: { requireLogin: false },
        component: Login
    },
    {
        path: '/surveynew',
        meta: { requireLogin: true },
        component: SurveyNew
    },
    {
        path: '/survey/:questionnaireId',
        meta: { requireLogin: true },
        component: Survey
    },
    {
        path: '/:path(.*)', //匹配不到以上路径=>404页面
        meta: { requireLogin: false },
        component: NotFound
    },
    {
        path: '/user/:userId',
        meta: { requireLogin: true },
        component: User
    },
]

export default createRouter({
    history: createWebHistory(),
    routes
})