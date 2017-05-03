import { MutationTree } from 'vuex';

import RootState from 'store/root/state';

/**
 * The name of set loading mutation.
 */
export const SET_LOADING: string = 'setLoading';

/**
 * The name of set locale mutation.
 */
export const SET_LOCALE: string = 'setLocale';

/**
 * Sets application loading state.
 *
 * @param state         Root Vuex state.
 * @param isLoading     Loading state, that will be set to the state.
 */
export function setLoading(state: RootState, isLoading: boolean) {
    state.loading = isLoading;
}

/**
 * Sets application locale state.
 *
 * @param  state    Root Vuex state.
 * @param  locale   Locale key string, that will be set to the state.
 */
export function setLocale(state: RootState, locale: string) {
    state.locale = locale;
}

export default {
    setLoading,
    setLocale
} as MutationTree<RootState>;
