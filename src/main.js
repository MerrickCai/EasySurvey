//全局CSS
import './assets/global.css'

// 引入createApp工厂函数
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// 引入element-plus库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)

//使用Pinia
import { createPinia } from 'pinia'
app.use(createPinia())

// 引入路由
import router from './router/index.js'
app.use(router)

app.mount('#app')