export default class Domain {

    private static readonly INITIAL_USERS = {
        '05d9c73d841428dc8da1ec0151846445': {
            id: '05d9c73d841428dc8da1ec0151846445',
            name:'Roman Dragan',
            email:'roman@dragan.com.ua',
            password: '123123',
        },
        '1aedb8d9dc4751e229a335e371db8058': {
            id: '1aedb8d9dc4751e229a335e371db8058',
            name: 'Test User',
            email: 'test@gmail.com',
            password: '321321',
        }
    };

    private static fetchUsers(cb) {
        setTimeout(() => {
            cb(localStorage.getItem('users'));
        }, 1000);
    }

    public static getAll() {
        this.fetchUsers((users) => {
            if (users === null) {
                localStorage.setItem('users', JSON.stringify(this.INITIAL_USERS));
                return this.INITIAL_USERS;
            }

            return JSON.parse(users);
        });
    }
}
