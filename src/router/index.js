import { createRouter, createWebHistory } from 'vue-router'
import Pinia from '../components/piniaTest.vue'
import login from '../components/login.vue'
import statistics from '../components/statistics.vue'
const routes = [
    { path: '/', component: Pinia },
    { path: '/login', component: login },
    { path: '/', component: statistics },
]

export default createRouter({
    history: createWebHistory(),
    routes
})