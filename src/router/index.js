import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'layout',
        component: () => import('@/components/Layout/layout.vue'),
        children: [],
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
];

// 动态路由配置
const asyncRoutes = [
    {
        path: '/',
        name: '/',
        component: () => import('@/views/home/home.vue'),
        meta: {
            title: '后台首页',
        },
    },
    {
        path: '/user/list',
        name: '/user/list',
        component: () => import('@/views/user/list.vue'),
        meta: {
            title: '用户管理',
        },
    },
    {
        name: '/level/list',
        path: '/level/list',
        component: () => import('@/views/level/list.vue'),
        meta: {
            title: '会员等级',
        },
    },
    {
        path: '/goods/list',
        name: '/goods/list',
        component: () => import('@/views/goods/list.vue'),
        meta: {
            title: '商品管理',
        },
    },
    {
        path: '/category/list',
        name: '/category/list',
        component: () => import('@/views/category/list.vue'),
        meta: {
            title: '分类列表',
        },
    },
    {
        path: '/order/list',
        name: '/order/list',
        component: () => import('@/views/order/list.vue'),
        meta: {
            title: '订单管理',
        },
    },
    {
        path: '/comment/list',
        name: '/comment/list',
        component: () => import('@/views/comment/list.vue'),
        meta: {
            title: '评价管理',
        },
    },
    {
        path: '/image/list',
        name: '/image/list',
        component: () => import('@/views/gallery/list.vue'),
        meta: {
            title: '图库管理',
        },
    },{
        path: '/notice/list',
        name: '/notice/list',
        component: () => import('@/views/notice/list.vue'),
        meta: {
            title: '公告管理',
        },
    },{
        path: '/setting/base',
        name: '/setting/base',
        component: () => import('@/views/setting/base.vue'),
        meta: {
            title: '基础配置',
        },
    },{
        path: '/coupon/list',
        name: '/coupon/list',
        component: () => import('@/views/coupon/list.vue'),
        meta: {
            title: '优惠券管理',
        },
    },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

// 动态路由
export function addRoutes(menus) {
    let hasAddNewRoutes = false;
    const findAndAddRoutes = arr => {
        arr.forEach(item => {
            // 判断是否存在该路由
            let route = asyncRoutes.find(v => v.path == item.frontpath);
            if (route && !router.hasRoute(route.path)) {
                router.addRoute('layout', route);
                hasAddNewRoutes = true;
            }

            // 判断当前遍历的对象是否存在子路由，不用route的原因是route可能不存在子路由但是item有（就是还没生成的）
            if (item.child && item.child.length > 0) {
                findAndAddRoutes(item.child);
            }
        });
    };
    findAndAddRoutes(menus);
    return hasAddNewRoutes;
}
