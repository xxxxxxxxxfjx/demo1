import { defineStore } from 'pinia';
import {
    getImageList,
    addImageCategory,
    editImageCategory,
    deleteImageCategory,
    getImages,
    changeImageName,
    deleteImage,
} from '@/services/modules/image.js';
const useImageStore = defineStore('imageStore', {
    state: () => ({
        imgList: [],
        images: [],
        totalCount: 0,
        currentId: 0,
    }),
    actions: {
        async fetchImageList(page) {
            const res = await getImageList(page);
            this.imgList = res.list;
            this.totalCount = res.totalCount;
            return res;
        },
        async fetchAddImgCategory(name, order) {
            return await addImageCategory(name, order);
        },
        async fetchEditImgCategory(id, name, order) {
            return await editImageCategory(id, name, order);
        },
        async fetchDeleteImgCategory(id) {
            return await deleteImageCategory(id);
        },
        async fetchImages(id, page) {
            const res = await getImages(id, page);
            this.images = res.list;
            return res;
        },
        getCurrentId(id) {
            this.currentId = id;
        },
        async fetchChangeImageName(id, name) {
            return await changeImageName(id, name);
        },
        async fetchDeleteImage(id) {
            return await deleteImage(id);
        },
    },
});
export default useImageStore;
