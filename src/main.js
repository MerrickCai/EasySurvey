// Vue 实例
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)

// Pinia状态管理
import { createPinia } from 'pinia'
app.use(createPinia())

// 路由
import router from './router/index.js'
app.use(router)

// 懒加载插件
import lazyPlugin from 'vue3-lazy'
app.use(lazyPlugin, {
    loading: '/assets/compare.png',
    error: '/assets/compare.png'
})

// 挂载 Vue 实例
app.mount('#app')