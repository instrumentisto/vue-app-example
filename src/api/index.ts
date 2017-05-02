/** @module api */

import axios, { AxiosInstance } from 'axios';

import store from 'store';

const instance: AxiosInstance = axios.create({
    baseURL: process.env.API_URL,
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

/**
 * Axios instance with pre-configured base API url,
 * that will make requests to the API server.
 *
 * @return {AxiosInstance}   Axios instance.
 */
export default instance;
