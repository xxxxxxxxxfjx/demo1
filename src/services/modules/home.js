import Request from "@/services/Request/index";

export function getStatistics1() {
    return Request.get({
        url:'admin/statistics1'
    })
}
export function getStatistics3(type) {
    return Request.get({
        url: 'admin/statistics3',
        params: {
            type
        }
    })
}