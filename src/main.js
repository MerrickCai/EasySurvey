// 全局 CSS
import './assets/global.css'

// Vue 实例
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)

// Pinia
import { createPinia } from 'pinia'
app.use(createPinia())

// 路由
import router from './router/index.js'
app.use(router)

// 挂载实例
app.mount('#app')