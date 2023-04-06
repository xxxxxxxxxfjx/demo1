import Request from '../Request';

// 默认获取的都是10页
export function getImageList(page) {
    return Request.get({
        url: 'admin/image_class/' + page,
    });
}

export function addImageCategory(name, order) {
    console.log(order);
    return Request.post({
        url: 'admin/image_class',
        params: {
            name,
            order,
        },
    });
}
export function editImageCategory(id, name, order) {
    return Request.post({
        url: 'admin/image_class/' + id,
        params: {
            name,
            order,
        },
    });
}
export function deleteImageCategory(id) {
    return Request.post({
        url: `admin/image_class/${id}/delete`,
    });
}
export function getImages(id, page) {
    return Request.get({
        url: `admin/image_class/${id}/image/${page}?limit=10`,
    });
}
export function changeImageName(id, name) {
    return Request.post({
        url: `admin/image/${id}`,
        params: {
            name,
        },
    });
}
export function deleteImage(ids) {
    const arr = [ids];
    return Request.post({
        url: `admin/image/delete_all`,
        params: {
            ids: arr,
        },
    });
}

export const  uploadActionUrl = '/api/admin/image/upload';
