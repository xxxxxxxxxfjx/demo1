import Request from "@/services/Request/index";

export function getStatistics1() {
    return Request.get({
        url:'admin/statistics1'
    })
}