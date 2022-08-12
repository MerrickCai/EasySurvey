import './style.css'


import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)


import { createPinia } from 'pinia'
app.use(createPinia())


app.mount('#app')