// import Vue from 'vue';
import Component from 'vue-class-component';
import { Action, Getter, namespace } from 'vuex-class';

import Page from 'Page';
import { RESET_AUTHORIZATION } from 'store/modules/user/actions';
import { AUTHORIZED } from 'store/modules/user/getters';

const UserGetter = namespace('user', Getter);
const UserAction = namespace('user', Action);

/**
 * Describes user profile page.
 */
@Component
export default class Profile extends Page {

    /**
     * Returns localized page title.
     *
     * @return   Localized page title, that was calculated.
     */
    public get title(): string {
        return this.$t('profile.title').toString();
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
