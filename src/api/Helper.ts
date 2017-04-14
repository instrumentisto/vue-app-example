import Vue from 'vue';

export default class Helper {

    public static call(method: string, name: string, params?: any): Promise<any[]> {
        if (!params) {
            params = {};
        }
        if (method === 'get') {
            params = { params };
        }
        return Vue.http[method](this.SERVER + name, params).then((response) => {
            return response.data;
        }).catch((response) => {
            console.log('error', response);
            return response;
        });
    }

    private static readonly SERVER: string = 'http://vue-app-example.dev:3000';
}
