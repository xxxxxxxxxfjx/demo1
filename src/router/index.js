import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            component: () => import('@/views/home/home.vue'),
            meta: {
                title:'后台首页'
            }
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
                title:'登录页'
            }
        },
    ],
});
export default router;
