import axios from 'axios';
import { baseURL, timeout } from './config.js';
// import { useCookies } from '@vueuse/integrations/useCookies';
import {getToken} from '@/hooks/cookies'
import { notification } from '@/hooks/notice'

class Request {
    constructor(baseURL, timeout) {
        this.instance = axios.create({
            baseURL,
            timeout,
        });

        this.instance.interceptors.request.use(
            config => {
                // const cookies = useCookies();
                // const token = cookies.get('token');
                const token = getToken()
                if (token) {
                    config.headers['token'] = token;
                }
                return config;
            },
            err => {
                return Promise.reject(err);
            }
        );

        this.instance.interceptors.response.use(res => {
            return res.data.data;
        }, err => {
            // ElNotification({
            //     message: err.response.data.msg || '请求失败',
            //     type: 'error',
            //     duration:3000
            // })
            notification(err.response.data.msg || '请求失败','error')
            return Promise.reject(err);
        })
    }

    request(config) {
        return new Promise((resolve, reject) => {
            this.instance
                .request(config)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    get(config) {
        return this.request({ ...config, method: 'get' });
    }

    post(config) {
        return this.request({ ...config, method: 'post' });
    }
}
export default new Request(baseURL, timeout);
