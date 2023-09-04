import { defineStore } from 'pinia';
import { getInfo, logout, login, changepwd } from '@/services/index.js';
import { setToken, removeToken } from '@/hooks/cookies';

const useUserInfo = defineStore('userInfo', {
    state: () => ({
        user: {},
        menus: [],
        ruleName: [],
    }),
    actions: {
        async fetchLogin({ username, passward }) {
            const res = await login(username, passward);
            setToken(res.token);
        },
        async fetchUserInfo() {
            const res = await getInfo();
            this.user = res;
            this.menus = res.menus;
            this.ruleName = res.ruleNames;
            console.log(res);
            return res;
        },
        async fetchLogout() {
            await logout();
        },
        async changePassword({ oldPassword, password, rePassword }) {
            await changepwd(oldPassword, password, rePassword);
        },
        logout() {
            removeToken();
            this.user = {};
        },
    },
});

export default useUserInfo;
