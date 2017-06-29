import Vue from 'vue';
import Component from 'vue-class-component';
import { Action, namespace } from 'vuex-class';

import HMRApi from 'HMRApi';
import { LOGIN } from 'store/modules/user/actions';

import ErrorBlock from 'components/error-block/ErrorBlock.vue';


const UserAction = namespace('user', Action);

/**
 * Describes user authorization page.
 */
@Component({
    components: {
        ErrorBlock,
    },
})
export default class SignIn extends Vue {

    /**
     * Executes user login action of the root Vuex store.
     */
    @UserAction(LOGIN)
    public login:
        /**
         * @param data   User login info with required email and password
         *               properties.
         *
         * @return   User object with authorized user info.
         */
        (data: {email: string, password: string}) => Promise<object>;

    /**
     * Email of the user, that is signing in.
     *
     * It binds to the email input, of the sign in form.
     */
    public email: string = '';

    /**
     * Password of the user, that is signing in.
     *
     * It binds to the password input, of the sign in form.
     */
    public password: string = '';

    /**
     * Error message, that will be shown if entered user credentials
     * were invalid.
     */
    public error: string = '';

    /**
     * Returns meta information of page, such as:
     * title, meta tags content etc.
     *
     * @return    Object, that contains page meta info.
     */
    public metaInfo(): any {
        return {title: this.$t('sign_in.title')};
    }

    /**
     * Sign in form submit event handler.
     *
     * Executes login function and redirects to the profile page on
     * success. Otherwise, it shows localized error message.
     */
    public onSubmit(): void {
        this.error = '';
        this.login({
            email: this.email,
            password: this.password,
        }).then(() => {
            this.$router.push('/profile');
        }).catch((error) => {
            let errorMsg: string = this.$t('errors.common').toString();
            switch (error) {
                case 1:
                    errorMsg = this.$t('errors.access_denied').toString();
                    break;
            }
            this.error = errorMsg;
        });
    }
}

if (HMRApi && module.hot) {
    HMRApi.install(Vue);
    if (!module.hot.data) {
        HMRApi.createRecord('SignIn', (SignIn as any).options);
    } else {
        HMRApi.reload('SignIn', (SignIn as any).options);
    }
}
