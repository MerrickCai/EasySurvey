//全局CSS
import './style.css'

// 引入createApp工厂函数
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// 引入element-plus库
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'


//使用Pinia
import { createPinia } from 'pinia'
app.use(createPinia())

// 引入less
import less from 'less'

// 引入路由
import router from './router'
app.use(less)
app.use(createPinia())
app.use(router);
app.use(ElementPlus);
app.mount('#app')