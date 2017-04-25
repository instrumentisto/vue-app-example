import { MutationTree } from 'vuex';

import RootState from 'store/root/state';

export const SET_LOADING = 'SET_LOADING';

export default {
    [SET_LOADING]: (state: RootState, isLoading) => {
        state.loading = isLoading;
    },
} as MutationTree<RootState>;
