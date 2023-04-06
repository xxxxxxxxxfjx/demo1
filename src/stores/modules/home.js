import { defineStore } from 'pinia';
import { getStatistics1, getStatistics2, getStatistics3 } from '@/services/index';

const useHomeStore = defineStore('homeStore', {
    state: () => ({
        panels: [],
        goods: [],
        order: [],
    }),
    actions: {
        async fetchStatistics1() {
            const res = await getStatistics1();
            this.panels = res.panels;
        },
        async fetchStatistics3(type) {
            const res = await getStatistics3(type);
            return Promise.resolve(res);
        },
        async fetchStatistics2() {
            const res = await getStatistics2();
            this.goods = res.goods;
            this.order = res.order;
        },
    },
});
export default useHomeStore;
