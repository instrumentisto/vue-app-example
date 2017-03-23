export default class Util {

    public static randomString(length) {
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
            result = '';
        for (var i = length; i > 0; --i) result += possible[Math.floor(Math.random() * possible.length)];
        return result;
    }

}
