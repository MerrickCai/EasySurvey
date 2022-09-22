// Vue 实例
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// Pinia状态管理
import { createPinia } from 'pinia'
app.use(createPinia())

// 路由
import router from './router/router.js'
app.use(router)

// 懒加载插件
import lazyPlugin from 'vue3-lazy'
app.use(lazyPlugin, {
    loading: '',
    error: ''
})

// 挂载 Vue 实例
app.mount('#app')