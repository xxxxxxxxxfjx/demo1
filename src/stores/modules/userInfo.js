import { defineStore } from 'pinia';
import { getInfo,logout,login,changepwd } from '@/services/index.js';
import { setToken, removeToken } from '@/hooks/cookies';

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
        async changePassword({ oldPassword, password, rePassword }) {
            console.log({ oldPassword, password, rePassword });
            await changepwd(oldPassword, password, rePassword)
        }
    },
});

export default useUserInfo;
