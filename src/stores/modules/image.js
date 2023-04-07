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
        imageCategoryList: [],
        images: [],
        currentId: 0,
        categoryTotalCount: 0,
        imagesTotalCount: 0,
    }),
    actions: {
        async fetchImageCategoryList(page) {
            const res = await getImageList(page);
            this.imageCategoryList = res.list;
            this.categoryTotalCount = res.totalCount;
            return res.list[0];
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
            this.imagesTotalCount = res.totalCount;
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
