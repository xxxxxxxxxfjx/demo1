import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/components/Layout/layout.vue'),
            children: [
                {
                    path: '/',
                    component: () => import('@/views/home/home.vue'),
                    meta: {
                        title: '后台首页',
                    },
                },
                {
                    path: '/user/list',
                    component: () => import('@/views/user/list.vue'),
                    meta: {
                        title: '用户管理',
                    },
                },
                {
                    path: '/level/list',
                    component: () => import('@/views/level/list.vue'),
                    meta: {
                        title: '会员等级',
                    },
                },
            ],
        },
        {
            path: '/about',
            component: () => import('@/views/about/about.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            component: () => import('@/views/404/404.vue'),
        },
        {
            path: '/login',
            component: () => import('@/views/login/login.vue'),
            meta: {
                title: '登录页',
            },
        },
    ],
});
export default router;
