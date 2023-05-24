import Request from '../Request';

export function getManagers(page, limit = 10, keyword = '') {
    return Request.get({
        url: `admin/manager/${page}`,
        params: {
            limit,
            keyword,
        },
    });
}

export function updateState(id, status) {
    return Request.post({
        url: `admin/manager/${id}/update_status`,
        params: {
            status,
        },
    });
}
export function createManager(data) {
    return Request.post({
        url: `admin/manager`,
        params: {
            ...data,
        },
    });
}

export function updateManager(id,data) {
    return Request.post({
        url: `admin/manager/${id}`,
        params: {
            ...data,
        },
    });
}

export function deleteManager(id) {
    return Request.post({
        url: `admin/manager/${id}/delete`,
    });
}
