/**
 * Describes root Vuex state.
 */
export default class RootState {

    /**
     * Application loading flag.
     *
     * @type {boolean}
     */
    public loading: boolean;

    /**
     * Application locale.
     *
     * @type {string}
     */
    public locale: string;

    /**
     * Creates initial root store state.
     */
    constructor() {
        this.loading = false;
    }
}
