import { ref } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import { useCookies } from '@vueuse/integrations/useCookies';

export function useTabList() {
    const route = useRoute();
    const cookie = useCookies();
    const router = useRouter();
    const actionTab = ref(route.path);
    const tabLIst = ref([
        {
            title: '后台首页',
            path: '/',
        },
    ]);

    // 添加tab
    const addTab = tab => {
        let no = tabLIst.value.findIndex(item => item.path == tab.path) == -1;
        if (no) {
            tabLIst.value.push(tab);
        }
        cookie.set('tabList', tabLIst.value); //存储此时的tabList，防止刷新后打开的页面不存在了
    };

    // 切换tab时进行路由跳转
    const changTab = e => {
        router.push(e);
    };

    // 当路由跳转时设置tag并高亮此tag,侧边栏点击后，tags栏进行动态添加
    onBeforeRouteUpdate((to, from) => {
        actionTab.value = to.path;
        addTab({
            title: to.meta.title,
            path: to.path,
        });
    });

    // 删除tab
    const removeTab = e => {
        let cur = actionTab.value;
        let tabs = tabLIst.value;
        if (e == cur) {
            tabs.forEach((item, index) => {
                if (item.path == e) {
                    let next = tabs[index + 1] || tabs[index - 1];
                    if (next) {
                        cur = next.path;
                    }
                }
            });
        }
        actionTab.value = cur;
        tabLIst.value = tabLIst.value.filter(item => item.path != e);
        cookie.set('tabList', tabLIst.value);
    };

    // 初始化
    function initTabs() {
        let tabs = cookie.get('tabList');
        if (tabs) {
            tabLIst.value = tabs;
        }
    }
    initTabs();

    // 下拉按钮事件
    const closeTabs = e => {
        if (e == 'all') {
            actionTab.value = '/';
            tabLIst.value = [
                {
                    title: '后台首页',
                    path: '/',
                },
            ];
        } else if (e == 'other') {
            tabLIst.value = tabLIst.value.filter(
                item => item.path == actionTab.value || item.path == '/'
            );
        }
        cookie.set('tabList', tabLIst.value);
    };

    return {
        actionTab,tabLIst,changTab,removeTab,closeTabs
    }
}
