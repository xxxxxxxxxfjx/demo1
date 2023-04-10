import Request from '@/services/Request/index';
export function login(username, password) {
    return Request.post({
        url: 'admin/login',
        params: {
            username,
            password,
        },
    });
}
