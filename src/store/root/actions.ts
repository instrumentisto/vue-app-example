/** @module store/root/actions */

import { ActionContext, ActionTree } from 'vuex';

import * as mutations from 'store/root/mutations';
import RootState from 'store/root/state';

/**
 * The name of start loading action.
 *
 * @type {string}
 */
export const START_LOADING = 'START_LOADING';

/**
 * The name of stop loading action.
 *
 * @type {string}
 */
export const STOP_LOADING = 'STOP_LOADING';

export default {
    /**
     * Commits "true" to the store's loading state.
     *
     * @param {ActionContext<RootState, any>} store     Root Vuex store.
     */
    [START_LOADING]: (store: ActionContext<RootState, any>) => {
        store.commit(mutations.SET_LOADING, true);
    },
    /**
     * Commits "false" to the store's loading state.
     *
     * @param {ActionContext<RootState, any>} store     Root Vuex store.
     */
    [STOP_LOADING]: (store: ActionContext<RootState, any>) => {
        store.commit(mutations.SET_LOADING, false);
    },
} as ActionTree<RootState, any>;
