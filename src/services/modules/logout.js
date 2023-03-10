import Request from '@/services/Request/index'

export function logout() {
    return Request.post({
        url: 'admin/logout',
    })
}