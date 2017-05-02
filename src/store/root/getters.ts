/** @module store/root/getters */

import { GetterTree } from 'vuex';

import RootState from 'store/root/state';

/**
 * The name of loading getter.
 *
 * @type {string}
 */
export const LOADING = 'LOADING';

export default {
    /**
     * Returns loading state from root store.
     *
     * @param {RootState} state     Root Vuex state.
     * @returns {boolean}   Loading state.
     */
    [LOADING]: (state: RootState) => {
        return state.loading;
    },
} as GetterTree<RootState, any>;
