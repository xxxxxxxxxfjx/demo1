import { defineStore } from 'pinia';
import { getNotices, createNotice, modifyNotice, deleteNotice } from '@/services/modules/notice';
const useNoticeStore = defineStore('noticeStore', {
    state: () => ({
        notices: [],
        noticeCount: 0,
    }),
    actions: {
        async fetchNotices(page) {
            const res = await getNotices(page);
            this.notices = res.list;
            this.noticeCount = res.totalCount;
        },
        async fetchCreateNotice(title, content) {
            const res = await createNotice(title, content);
        },
        async fetchModifyNotice(id, title, content) {
            const res = await modifyNotice(id, title, content);
        },
        async fetchDeleteNotice(id) {
            const res = await deleteNotice(id);
            console.log(res);
        },
    },
});
export default useNoticeStore;
