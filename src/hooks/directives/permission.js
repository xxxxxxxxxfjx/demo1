import useUserInfo from '@/stores/modules/userInfo';

function hasAuth(el = false, arr) {
    const userInfo = useUserInfo();
    if (!Array.isArray(arr)) {
        throw new Error(`v-permission指令配置错误，v-permission="['getStatistics3,GET']"`);
    }
    const hasPermission = arr.some(item => userInfo.ruleName.includes(item));
    if (el && !hasPermission) {
        el.parentNode.removeChild(el);
    }
    return hasPermission;
}

export default function permission(app) {
    app.directive('permission', {
        mounted(el, bindings) {
            console.log(el,bindings);
            hasAuth(el, bindings.value);
        },
    });
}
