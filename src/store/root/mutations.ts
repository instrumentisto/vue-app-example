/** @module store/root/mutations */

import { MutationTree } from 'vuex';

import RootState from 'store/root/state';

/**
 * The name of set loading mutation.
 *
 * @type {string}
 */
export const SET_LOADING = 'SET_LOADING';

/**
 * The name of set locale mutation.
 *
 * @type {string}
 */
export const SET_LOCALE = 'SET_LOCALE';

export default {
    /**
     * Sets application loading state.
     *
     * @param {RootState} state     Root Vuex state.
     * @param {boolean} isLoading   Loading state, that will be set to the state.
     */
    [SET_LOADING]: (state: RootState, isLoading: boolean) => {
        state.loading = isLoading;
    },
    /**
     * Sets application locale state.
     *
     * @param {RootState} state     Root Vuex state.
     * @param {string} locale       Locale key string, that will be set
     *                              to the state.
     */
    [SET_LOCALE]: (state: RootState, locale: string) => {
        state.locale = locale;
    },
} as MutationTree<RootState>;
