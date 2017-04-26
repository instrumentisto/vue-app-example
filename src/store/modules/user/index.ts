import { Module } from 'vuex';

import actions from 'store/modules/user/actions';
import getters from 'store/modules/user/getters';
import mutations from 'store/modules/user/mutations';
import UserState from 'store/modules/user/state';

export default class User implements Module<UserState, any> {

    public namespaced = true;

    public state: UserState;

    public getters = getters;

    public actions = actions;

    public mutations = mutations;

    public constructor() {
        this.state = new UserState();
    }
}
