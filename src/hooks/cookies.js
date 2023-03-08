// cookies的获取删除和设置 封装cookies
import { useCookies } from '@vueuse/integrations/useCookies'

const token = 'token'
const cookies = useCookies();

export function setToken(value) {
    cookies.set(token,value)
}


export function getToken() {
    return cookies.get(token)
}

export function removeToken() {
    cookies.remove(token)
}