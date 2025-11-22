import { createApp } from 'vue'
import {createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router/router.js' // 导入路由配置

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router) // 在Vue应用中使用路由，需要将路由注册为插件
app.mount('#app')
