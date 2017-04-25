import { GetterTree } from 'vuex';

import RootState from 'store/root/state';

export const LOADING = 'LOADING';

export default {
    [LOADING]: (state: RootState) => {
        return state.loading;
    },
} as GetterTree<RootState, any>;
