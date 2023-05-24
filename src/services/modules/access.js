import Request from "../Request";
export function getAccessList() {
    return Request.get({
        url:'admin/rule/1'
    })
}