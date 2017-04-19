import axios, {AxiosInstance} from 'axios';

import store from 'store';

const instance: AxiosInstance = axios.create({
    baseURL: 'http://vue-app-example.dev:3000/', // TODO: move API URL to the config file
});

instance.interceptors.request.use((config) => {
    store.state.loading = true;
    return config;
}, (error) => {
    return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
    store.state.loading = false;
    return response;
}, (error) => {
    return Promise.reject(error);
});

export default instance;
