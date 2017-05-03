import { AxiosPromise, AxiosResponse } from 'axios';

import API from 'api';

/**
 * Implementation of /users API endpoint.
 *
 * Note, that passwords are sent and received in plain format,
 * even in GET requests. It's because of default json-server configuration, that
 * don't support POST requests for filtering data.
 * It's very not secure, but it's OK for PoC app.
 */
export default class Users {

    /**
     * Fetches all users.
     *
     * @returns     AxiosPromise with all users array.
     */
    public static getAll(): AxiosPromise {
        return API.get('/users').then((response: AxiosResponse) => {
            return response.data;
        });
    }

    /**
     * Registers new user in the system.
     * It also checks if user with same email already exists.
     *
     * @param user   User object with all info, required for registration.
     *
     * @returns     Resolved AxiosPromise with created user object
     *                      on success, or rejected Promise with "1" error code,
     *                      if user with given email already exists.
     */
    public static register(user: any): Promise<any> {
        return API.get('/users', {
            params: {
                email: user.email,
            },
        }).then((response: AxiosResponse) => {
            const users = response.data;

            if (users.length > 0) {
                return Promise.reject(1);
            }

            return API.post('/users', user)
                .then((postResponse: AxiosResponse) => {
                    return postResponse.data;
                });
        });
    }

    /**
     * Does login action, that checks if user with given email/password exists
     * in the system.
     *
     * @param email      User email, that does login.
     * @param password   User password, that does login.
     *
     * @returns     Resolved AxiosPromise with user object on success,
     *              or rejected Promise with "1" error code,
     *              if login was failed.
     */
    public static login(email: string, password: string): Promise<any> {
        return API.get('/users', {
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
