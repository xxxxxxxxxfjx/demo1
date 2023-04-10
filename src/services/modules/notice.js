import Request from '../Request';

export function getNotices(page) {
    return Request.get({
        url: 'admin/notice/' + page,
    });
}

export function createNotice(title, content) {
    return Request.post({
        url: 'admin/notice',
        params: {
            title,
            content,
        },
    });
}
export function modifyNotice(id, title, content) {
    return Request.post({
        url: 'admin/notice/' + id,
        params: {
            title,
            content,
        },
    });
}
export function deleteNotice(id) {
    return Request.post({
        url: `admin/notice/${id}/delete`,
    });
}
