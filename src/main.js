//全局CSS
import './style.css'

//创建Vue实例
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

//使用Pinia
import { createPinia } from 'pinia'
app.use(createPinia())

//挂载Vue实例
app.mount('#app')