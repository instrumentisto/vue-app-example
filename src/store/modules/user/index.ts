import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from 'vuex';

import actions from 'store/modules/user/actions';
import getters from 'store/modules/user/getters';
import mutations from 'store/modules/user/mutations';
import UserState from 'store/modules/user/state';

export default class User implements Module<UserState, any> {

    public namespaced: boolean = true;

    public state: UserState;

    public getters: GetterTree<UserState, any> = getters;

    public actions: ActionTree<UserState, any> = actions;

    public mutations: MutationTree<UserState> = mutations;

    public constructor() {
        this.state = new UserState();
    }
}
