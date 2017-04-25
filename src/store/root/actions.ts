import { ActionContext, ActionTree } from 'vuex';

import * as mutations from 'store/root/mutations';
import RootState from 'store/root/state';

export const START_LOADING = 'START_LOADING';
export const STOP_LOADING = 'STOP_LOADING';

export default {
    [START_LOADING]: (store: ActionContext<RootState, any>) => {
        store.commit(mutations.SET_LOADING, true);
    },
    [STOP_LOADING]: (store: ActionContext<RootState, any>) => {
        store.commit(mutations.SET_LOADING, false);
    },
} as ActionTree<RootState, any>;
