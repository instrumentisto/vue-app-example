import Vue from 'vue';
import Component from 'vue-class-component';
import { Action, Getter, namespace } from 'vuex-class';

import HMRApi from 'HMRApi';
import { RESET_AUTHORIZATION } from 'store/modules/user/actions';
import { AUTHORIZED } from 'store/modules/user/getters';

const UserGetter = namespace('user', Getter);
const UserAction = namespace('user', Action);

/**
 * Describes user profile page.
 */
@Component
export default class Profile extends Vue {

    /**
     * Returns meta information of page, such as:
     * title, meta tags content etc.
     *
     * @return    Object, that contains page meta info.
     */
    public metaInfo(): any {
        return {title: this.$t('profile.title')};
    }

    /**
     * Returns global application authorization state.
     *
     * It uses root Vuex getter under the hood.
     */
    @UserGetter(AUTHORIZED)
    public user: any;

    /**
     * Resets global application authorization state.
     *
     * It executes root Vuex action under the hood.
     */
    @UserAction(RESET_AUTHORIZATION)
    public resetAuthorization: () => void;

    /**
     * Vue component 'created' hook, that executes when component instance
     * was created.
     */
    public created(): void {
        if (!this.user.image) {
            this.user.image = require('~assets/img/default_user_photo.jpg');
        }
    }

    /**
     * Resets user authorization state and redirects to the login page.
     */
    public logout(): void {
        this.resetAuthorization();
        this.$router.push('/login');
    }
}

if (HMRApi && module.hot) {
    HMRApi.install(Vue);
    if (!module.hot.data) {
        HMRApi.createRecord('Profile', (Profile as any).options);
    } else {
        HMRApi.reload('Profile', (Profile as any).options);
    }
}
