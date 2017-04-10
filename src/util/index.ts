export default class Util {

    public static randomString(length) {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = length; i > 0; --i) {
            result += possible[Math.floor(Math.random() * possible.length)];
        }
        return result;
    }

}
