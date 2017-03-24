import Util from '../util/util'

export default class Users {

    static readonly STORAGE_KEY: string = 'vue-app-example-users';

    static readonly INITIAL_USERS = [
        {
            id: '05d9c73d841428dc8da1ec0151846445',
            name:'Roman Dragan',
            email:'roman@dragan.com.ua',
            password: '123123',
        },
        {
            id: '1aedb8d9dc4751e229a335e371db8058',
            name: 'Test User',
            email: 'test@gmail.com',
            password: '321321',
        },
    ]

    private static fetch(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let users = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
                if (!users) {
                    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.INITIAL_USERS));
                    users = this.INITIAL_USERS;
                }
                resolve(users);
            }, 1000);
        })
    }

    public static getAll(): Promise<any[]> {
        return this.fetch();
    }

    public static register(newUser: any): Promise<any> {
        return this.fetch().then((users: any[]) => {
            let existingUser = users.find(user => user.email === newUser.email);
            if (existingUser) {
                return Promise.reject('Email already taken');
            }

            newUser.id = Util.randomString(32);
            users.push(newUser);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));

            return newUser;
        });
    }

    public static login(email: string, password: string): Promise<any> {
        return this.fetch().then((users: any[]) => {
            let user = users.find(user => {
                return (user.email === email && user.password === password);
            });

            if (!user) {
                return Promise.reject('User not found');
            }

            return user;
        });
    }
}
