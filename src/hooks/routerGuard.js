// 全局路由前置守卫 全局前置守卫
import { router, addRoutes } from '@/router/index';
import { getToken } from '@/hooks/cookies';
import { notification } from '@/hooks/notice';
import useUserInfo from '@/stores/modules/userInfo';
import { openLoading, closeLoading } from '@/hooks/loading';

let hasGetInfo = false; //防止页面重复加载，导致加载时间过长

router.beforeEach(async (to, from, next) => {
    // 开启loading加载
    openLoading();

    const userInfo = useUserInfo();
    let hasAddNewRoutes = false;
    const token = getToken();
    // 没登录，强制跳转到登录页面
    if (!token && to.path != '/login') {
        notification('请先登录！', 'error');
        return next({ path: '/login' });
    }

    // 禁止重复登录
    if (token && to.path == '/login') {
        notification('请勿重复登录！', 'error');
        return next({ path: from.path ? from.path : '/' });
    }

    if (token && !hasGetInfo) {
        let { menus } = await userInfo.fetchUserInfo();
        hasAddNewRoutes = addRoutes(menus);
        hasGetInfo = true;
    }

    // 设置动态标题
    let title = (to.meta.title ? to.meta.title : '') + '-冯某璇的后台商城';
    document.title = title;

    hasAddNewRoutes ? next(to.fullPath) : next();
});
router.afterEach((to, from) => {
    // 关闭loading加载
    closeLoading();
});
