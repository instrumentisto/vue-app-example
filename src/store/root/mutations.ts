import { MutationTree } from 'vuex';

import RootState from 'store/root/state';

export const SET_LOADING = 'SET_LOADING';
export const SET_LOCALE = 'SET_LANGUAGE';

export default {
    [SET_LOADING]: (state: RootState, isLoading) => {
        state.loading = isLoading;
    },
    [SET_LOCALE]: (state: RootState, locale) => {
        state.locale = locale;
    },
} as MutationTree<RootState>;
