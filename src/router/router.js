import {createRouter, createMemoryHistory, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WritingView from '../views/WritingView.vue'
import MindsetChainView from '../views/MindsetChainView.vue'

const routes = [
    {path:'/', component: HomeView},
    {path:'/writing', component: WritingView},
    {path:'/mindset-chain', component: MindsetChainView},
    {path:'/products', component: () => import('../views/ProductsView.vue')}
]
// 创建路由实例，并传递 `routes` 配置
const router = createRouter({
    // history: createMemoryHistory(), // 用这个url不会变
    history:createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router