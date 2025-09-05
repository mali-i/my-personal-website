import {createRouter, createMemoryHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WritingView from '../views/WritingView.vue'

const routes = [
    {path:'/', component: HomeView},
    {path:'/writing', component: WritingView}
]
// 创建路由实例，并传递 `routes` 配置
const router = createRouter({
    history: createMemoryHistory(), // 使用内存历史模式
    routes
})

export default router