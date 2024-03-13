import { Injectable } from "@angular/core";
import axios, { AxiosInstance } from 'axios';
import { environment as env} from '../../../../environments/environment';

@Injectable({
    providedIn: "root"
})
export class AxiosHttpClient {

    Instance: AxiosInstance;

    constructor() {
        this.Instance = this.getInstance()
        this.Instance.interceptors.request.use((config) =>  {
            // Do something before request is sent
            config.headers['Content-Type'] = 'application/json';
            config.headers['Authorization'] = this.getAccessToken();
            // console.log('interceptor config headers : ', config.headers)
            return config;
          }, (error) =>  {
            console.log('interceptor error: ', error)
            // Do something with request error
            return Promise.reject(error);
          });
    }

    getInstance() {
        const instance = axios.create({
            baseURL: env.base_url,
            timeout: 8000,
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            }
        });
        return instance;
    }

    getAccessToken() {
        const token = localStorage.getItem('accessToken')
        return token ? token : undefined
    }
}
