import Request from '../Request';
export function getAccessList() {
    return Request.get({
        url: 'admin/rule/1',
    });
}
export function createMenuAccess(data) {
    return Request.post({
        url: 'admin/rule',
        params: {
            ...data,
        },
    });
}
export function updateMenuAccess(data) {
    return Request.post({
        url: 'admin/rule/193',
        params: {
            ...data,
        },
    });
}
export function deleteMenuAccess(id) {
    return Request.post({
        url: `admin/rule/${id}/delete`,
    });
}
export function updateMenuState(id, status) {
    return Request.post({
        url: `admin/rule/${id}/update_status`,
        params: {
            status,
        },
    });
}
   