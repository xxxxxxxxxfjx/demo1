import Request from '@/services/Request/index';
export function getInfo() {
    return Request.post({
        url: 'admin/getinfo',
    });
}
