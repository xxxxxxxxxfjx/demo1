import { defineStore } from 'pinia';
import {
    getManagers,
    updateState,
    createManager,
    updateManager,
    deleteManager,
} from '@/services/modules/manager.js';

const useManagerStore = defineStore('managerStore', {
    state: () => ({
        managerLists: [],
        roles: [],
        totalCount: 0,
    }),
    actions: {
        async fetchManagers(page, limit, keyword) {
            const res = await getManagers(page, limit, keyword);
            this.totalCount = res.totalCount;
            this.roles = res.roles;
            this.handleManagerList(res.list);
        },
        async fetchUpdateState(id, status) {
            const res = await updateState(id, status);
        },
        handleManagerList(list) {
            this.managerLists = list.map(item => ({ ...item, isLoading: false }));
        },
        async fetchCreateManager(data) {
            const res = await createManager(data);
        },
        async fetchUpdateManager(id,data) {
            const res = await updateManager(id,data);
            console.log(res);
        },
        async fetchDeleteManager(id) {
            const res = await deleteManager(id);
            console.log(res);
        },
    },
});
export default useManagerStore;
