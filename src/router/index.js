import { createRouter, createWebHistory } from 'vue-router'
import Pinia from '../components/piniaTest.vue'
import login from '../components/login.vue'
const routes = [
    { path: '/', component: Pinia },
    { path: '/login', component: login },
]

export default createRouter({
    history: createWebHistory(),
    routes
})