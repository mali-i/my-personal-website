import {createRouter, createMemoryHistory, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SelfIntroductionView from '../views/SelfIntroductionView.vue';
import PhaseReviewView from '../views/PhaseReviewView.vue';

const routes = [
    { path: '/', component: HomeView, meta: { title: '首页 - 阿吉侬' } },
    // writing 路由已删除
    // algernon-agent 路由已删除
    { path: '/products', component: () => import('../views/ProductsView.vue'), meta: { title: '产品 - 阿吉侬' } }
]
// 创建路由实例，并传递 `routes` 配置
const router = createRouter({
    // history: createMemoryHistory(), // 用这个url不会变
    history:createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    } else {
        document.title = '阿吉侬 | Algernon';
    }
    next();
});

export default router