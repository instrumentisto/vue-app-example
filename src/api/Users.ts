import ApiHelper from 'api/Helper';

export default class Users {

    public static getAll(): Promise<any[]> {
        return ApiHelper.call('get', '/users');
    }

    public static register(user: any): Promise<any> {
        return ApiHelper.call('get', '/users', {
            email: user.email,
        }).then((users) => {
            if (users.length > 0) {
                return Promise.reject(1);
            }

            return ApiHelper.call('post', '/users', user).then((addedUser) => {
                return addedUser;
            });
        });
    }

    public static login(email: string, password: string): Promise<any> {
        return ApiHelper.call('get', '/users', {email, password}).then((users) => {
            if (users.length === 0) {
                return Promise.reject(1);
            }

            return users[0];
        });
    }
}
