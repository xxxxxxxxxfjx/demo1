import { defineStore } from 'pinia';
import {
    getAccessList,
    createMenuAccess,
    updateMenuAccess,
    deleteMenuAccess,
    updateMenuState,
} from '@/services/modules/access';

const useAccessStore = defineStore('accessStore', {
    state: () => ({
        list: [],
        rules: [],
        totalCount: 0,
    }),
    actions: {
        async fetchAccessList() {
            const res = await getAccessList();
            this.handleList(res.list);
            this.rules = res.rules;
            this.totalCount = res.totalCount;
        },
        async fetchCreateMenuAccess(data) {
            const res = await createMenuAccess(data);
            console.log(res);
        },
        async fetchUpdateMenuAccess(data) {
            const res = await updateMenuAccess(data);
            console.log(res);
        },
        async fetchDeleteMenuAccess(id) {
            const res = await deleteMenuAccess(id);
            console.log(res);
        },
        async fetchUpdateMenuState(id, status) {
            const res = await updateMenuState(id, status);
            console.log(res);
        },
        handleList(data) {
            this.list = data.map(b => ({ ...b, isLoading: false }));
        },
    },
});
export default useAccessStore;
