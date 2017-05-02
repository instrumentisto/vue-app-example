/**
 * Describes user module state.
 */
export default class UserState {

    /**
     * List of all users, that exists in system.
     *
     * @type {object[]}
     */
    public all: object[];

    /**
     * User authorization state.
     *
     * @type {object|null}
     */
    public authorized: object;

    /**
     * Creates initial user module state.
     */
    constructor() {
        this.all = [];
        this.authorized = null;
    }
}
