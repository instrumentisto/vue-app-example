import { GetterTree } from 'vuex';

import RootState from 'store/root/state';


/**
 * The name of loading getter.
 */
export const LOADING: string = 'loading';

/**
 * Returns loading state from root store.
 *
 * @param state     Root Vuex state.
 *
 * @return   Loading state.
 */
export function loading(state: RootState) {
    return state.loading;
}

export default {
    loading,
} as GetterTree<RootState, any>;
