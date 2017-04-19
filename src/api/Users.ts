import {AxiosPromise, AxiosResponse} from 'axios';

import API from 'api';

export default class Users {

    public static getAll(): AxiosPromise {
        return API.get('users').then((response: AxiosResponse) => {
            return response.data;
        });
    }

    public static register(user: any): AxiosPromise {
        return API.get('users', {
            params: {
                email: user.email,
            },
        }).then((response: AxiosResponse) => {
            const users = response.data;

            if (users.length > 0) {
                return Promise.reject(1);
            }

            return API.post('users', {
                params: user,
            }).then((postResponse: AxiosResponse) => {
                return postResponse.data;
            });
        });
    }

    public static login(email: string, password: string): AxiosPromise {
        // Sending password by GET request - is not safe way.
        // But in default son-server configuration we can filter data only by using GET requests.
        // So for test app it might be OK.
        return API.get('users', {
            params: {
                email,
                password,
            },
        }).then((response: AxiosResponse) => {
            const users = response.data;

            if (users.length === 0) {
                return Promise.reject(1);
            }

            return users[0];
        });
    }
}
