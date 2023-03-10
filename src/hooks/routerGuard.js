// 全局路由前置守卫 全局前置守卫
import router from '@/router/index';
import { getToken } from '@/hooks/cookies';
import { notification } from '@/hooks/notice';
import useUserInfo from '@/stores/modules/userInfo';
import { openLoading, closeLoading } from '@/hooks/loading';

router.beforeEach((to, from, next) => {
    // 开启loading加载
    openLoading();

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

    if (token) {
        const userInfo = useUserInfo();
        userInfo.fetchUserInfo();
    }

    // 设置动态标题
    let title = (to.meta.title ? to.meta.title : '') + '-冯某璇的后台商城';
    document.title = title;
    next();
});
router.afterEach((to, from) => {
    // 关闭loading加载
    closeLoading();
});
