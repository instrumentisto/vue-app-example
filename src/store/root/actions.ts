import { ActionContext, ActionTree } from 'vuex';

import * as mutations from 'store/root/mutations';
import RootState from 'store/root/state';

/**
 * The name of start loading action.
 */
export const START_LOADING: string = 'startLoading';

/**
 * The name of stop loading action.
 */
export const STOP_LOADING: string = 'stopLoading';

/**
 * Commits "true" to the store's loading state.
 *
 * @param store     Root Vuex store.
 */
export function startLoading(store: ActionContext<RootState, any>) {
    store.commit(mutations.SET_LOADING, true);
}
/**
 * Commits "false" to the store's loading state.
 *
 * @param store     Root Vuex store.
 */
export function stopLoading(store: ActionContext<RootState, any>) {
    store.commit(mutations.SET_LOADING, false);
}

export default {
    startLoading,
    stopLoading,
} as ActionTree<RootState, any>;
