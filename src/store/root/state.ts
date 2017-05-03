/**
 * Describes root Vuex state.
 */
export default class RootState {

    /**
     * Application loading flag.
     */
    public loading: boolean;

    /**
     * Application locale.
     */
    public locale: string;

    /**
     * Creates initial root store state.
     */
    constructor() {
        this.loading = false;
    }
}
