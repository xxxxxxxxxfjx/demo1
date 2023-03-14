import { defineStore } from 'pinia';
import { getStatistics1 } from '@/services/index';

const useHomeStore = defineStore('homeStore', {
    state: () => ({
        panels: [],
    }),
    actions: {
        async fetchStatistics1() {
            const res = await getStatistics1();
            this.panels = res.panels;
        },
    },
});
export default useHomeStore;
