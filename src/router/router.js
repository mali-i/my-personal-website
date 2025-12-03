import {createRouter, createMemoryHistory, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WritingView from '../views/WritingView.vue'
import MindsetChainView from '../views/MindsetChainView.vue'
import SelfIntroductionView from '../views/SelfIntroductionView.vue';
import PhaseReviewView from '../views/PhaseReviewView.vue';

const routes = [
    { path: '/', component: HomeView, meta: { title: '首页 - 阿吉侬' } },
    {
        path: '/writing',
        component: WritingView,
        meta: { title: '写作 - 阿吉侬' },
        children: [
            {
                path: 'self-introduction',
                component: SelfIntroductionView,
                meta: { title: '自我介绍 - 阿吉侬' }
            },
            {
                path: 'phase-review',
                component: PhaseReviewView,
                meta: { title: '阶段复盘 - 阿吉侬' }
            }
        ]
    },
    { path: '/mindset-chain', component: MindsetChainView, meta: { title: '思维链 - 阿吉侬' } },
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