import { defineStore } from 'pinia';
import { getAccessList } from '@/services/modules/access';
const useAccessStore = defineStore('accessStore', {
    state: () => ({
        accessList: [],
    }),
    actions: {
        async fetchAccessList() {
            const res = await getAccessList();
            console.log(res);
        },
    },
});
export default useAccessStore;
