import { defineStore } from 'pinia';
import { getInfo } from '@/services/modules/userInfo.js';
import { login } from '@/services/modules/login.js';
import { setToken, removeToken } from '@/hooks/cookies';
import { logout } from '@/services/modules/logout';

const useUserInfo = defineStore('userInfo', {
    state: () => ({
        user: {},
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

        async fetchUserInfo() {
            const res = await getInfo();
            this.user = res;
        },
        async fetchLogout() {
            await logout();
        },
        logout() {
            removeToken();
            this.user = {};
        },
    },
});

export default useUserInfo;
