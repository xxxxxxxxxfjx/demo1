import { defineStore } from 'pinia';

const useMainStore = defineStore('mainStore', {
    state: () => ({
        asideWidth: '250px',
    }),
    actions: {
        changeAsideWidth() {
            this.asideWidth = this.asideWidth == '250px' ? '64px' : '250px';
        },
    },
});

export default useMainStore;
