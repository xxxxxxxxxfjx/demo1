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
        fetchLogin({ username, passward }) {
            return new Promise((resolve, reject) => {
                login(username, passward)
                    .then(res => {
                        setToken(res.token);
                        resolve(res);
                    })
                    .catch(err => reject(err));
            });
        },

        fetchUserInfo() {
            return new Promise((resolve, reject) => {
                getInfo().then(res => {
                    this.user = res;
                    this.getMenus(res.menus);
                    this.getRuleNames(res.ruleNames);
                    resolve(res)
                }).catch(err=>reject(err));
            });
        },
        async fetchLogout() {
            await logout();
        },
        async changePassword({ oldPassword, password, rePassword }) {
            console.log({ oldPassword, password, rePassword });
            await changepwd(oldPassword, password, rePassword);
        },
        logout() {
            removeToken();
            this.user = {};
        },
        getMenus(payloads) {
            this.menus = payloads;
        },
        getRuleNames(payloads) {
            this.ruleName = payloads;
        },
    },
});

export default useUserInfo;
