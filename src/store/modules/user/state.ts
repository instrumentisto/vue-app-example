export default class UserState {

    public all: any[];

    public authorized: object;

    constructor() {
        this.all = [];
        this.authorized = null;
    }
}
