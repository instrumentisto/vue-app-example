import Component from 'vue-class-component';
import { Action, namespace } from 'vuex-class';

import ErrorBlock from 'components/error-block/ErrorBlock.vue';
import Page from 'Page';
import { SIGN_UP } from 'store/modules/user/actions';

const UserAction = namespace('user', Action);

/**
 * Describes user registration page.
 */
@Component({
    components: {
        ErrorBlock,
    },
})
export default class SignUp extends Page {

    /**
     * Returns localized page title.
     *
     * @return   Localized page title, that was calculated.
     */
    public get title(): string {
        return this.$t('sign_up.title').toString();
    }

    /**
     * Executes user sign up action of the root Vuex store.
     */
    @UserAction(SIGN_UP)
    public signUp: (user) => Promise<object>;

    /**
     * User object, that contains all information, specified by user.
     */
    public user = {
        email: '',
        image: '',
        name: '',
        password: '',
        password_confirm: '',
    };

    /**
     * Error message, that will be shown if user with specified email
     * already exists.
     */
    public error: string = '';

    /**
     * Sign up form user image change event handler.
     *
     * It takes image, specified by user and converts it to the base64
     * hash, which stores to the 'user' property.
     */
    public onImageChange(changeEvent) {
        const files = (changeEvent.target.files
                       || changeEvent.dataTransfer.files);
        if (!files.length) {
            return;
        }

        const reader = new FileReader();
        const component = this;

        reader.onload = (loadedEvent) => {
            component.user.image = (loadedEvent.target as FileReader).result;
        };
        reader.readAsDataURL(files[0]);
    }

    /**
     * Sign up form submit event handler.
     *
     * Executes sign up form validation, sign up function and redirects
     * to the profile page.
     * If validation was failed or user with specified email already exists,
     * it prints localized error message.
     */
    public onSubmit(): void {
        this.error = '';
        this.$validator.validateAll().then(() => {
            this.signUp(this.user).then(() => {
                this.$router.push('/profile');
            }).catch((error) => {
                let errorMsg: string = this.$t('errors.common').toString();
                switch (error) {
                  case 1:
                    errorMsg = this.$t('errors.email_already_taken').toString();
                    break;
                }
                this.error = errorMsg;
            });
        });
    }
}
