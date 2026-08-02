import {createRouter, createMemoryHistory, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SelfIntroductionView from '../views/SelfIntroductionView.vue';
import PhaseReviewView from '../views/PhaseReviewView.vue';

const routes = [
    { path: '/', component: HomeView, meta: { title: '首页 - 阿吉侬' } },
    // writing 路由已删除
    // algernon-agent 路由已删除
    { path: '/products', component: () => import('../views/ProductsView.vue'), meta: { title: '产品 - 阿吉侬' } },
    {
        path: '/rollingplan',
        component: () => import('../views/RollingPlanView.vue'),
        meta: {
            title: 'RollingPlan - 让长期目标持续向前',
            description: '把长期方向变成清晰的下一步，在每一次行动与回顾中持续校准、持续推进。',
            image: '/rollingplan-og.png',
            standalone: true
        }
    }
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

const setMeta = (selector, attribute, value) => {
    let element = document.head.querySelector(selector)

    if (!value) {
        element?.remove()
        return
    }

    if (!element) {
        element = document.createElement('meta')
        const [key, name] = attribute
        element.setAttribute(key, name)
        document.head.appendChild(element)
    }

    element.setAttribute('content', value)
}

router.afterEach((to) => {
    const description = to.meta.description || '阿吉侬 Algernon 的个人站与独立产品。'
    const image = to.meta.image ? `${window.location.origin}${to.meta.image}` : ''

    setMeta('meta[name="description"]', ['name', 'description'], description)
    setMeta('meta[property="og:title"]', ['property', 'og:title'], to.meta.title || '阿吉侬 | Algernon')
    setMeta('meta[property="og:description"]', ['property', 'og:description'], description)
    setMeta('meta[property="og:image"]', ['property', 'og:image'], image)
    setMeta('meta[name="twitter:card"]', ['name', 'twitter:card'], image ? 'summary_large_image' : '')
    setMeta('meta[name="twitter:image"]', ['name', 'twitter:image'], image)
})

export default router
