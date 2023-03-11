import Request from '../Request/index';
export function changepwd(oldpassword, password, repassword) {
    return Request.post({
        url: 'admin/updatepassword',
        params: {
            oldpassword,
            password,
            repassword,
        },
    });
}
