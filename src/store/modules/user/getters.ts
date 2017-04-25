import { GetterTree } from 'vuex';

import UserState from 'store/modules/user/state';

export const AUTHORIZED = 'AUTHORIZED';
export const TOTAL_COUNT = 'TOTAL_COUNT';

export default {
    [AUTHORIZED]: (state: UserState) => {
        return state.authorized;
    },
    [TOTAL_COUNT]: (state: UserState) => {
        return state.all.length;
    },
} as GetterTree<UserState, any>;
