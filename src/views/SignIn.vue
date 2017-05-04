<template>
  <section id="signIn">
    <h1 class="title">{{ $t('sign_in.title') }}</h1>

    <form id="signInForm" method="post" v-on:submit.prevent="onSubmit">
      <div class="form-group">
          <input v-model="email"
                 :placeholder="$t('validation.attributes.email')"
                 name="email" type="text" class="form-control">
      </div>
      <div class="form-group">
        <input v-model="password"
               :placeholder="$t('validation.attributes.password')"
               name="password" type="password" class="form-control">
      </div>
      <button type="submit" class="btn btn-default">
        {{ $t('sign_in.login') }}
      </button>
    </form>

    <error-block :error="error"></error-block>

    <router-link to="/sign_up">
      {{ $t('sign_in.do_not_have_account') }}
    </router-link>
    <br/>
    <router-link to="/forgot_password">
      {{ $t('sign_in.forgot_password') }}
    </router-link>
  </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Action, namespace } from 'vuex-class';

    import ErrorBlock from 'components/error-block/ErrorBlock.vue';
    import HMRApi from 'HMRApi';
    import Page from 'Page.vue';
    import { LOGIN } from 'store/modules/user/actions';

    const UserAction = namespace('user', Action);

    /**
     * Describes user authorization page.
     */
    @Component({
        components: {
            ErrorBlock,
        },
    })
    export default class SignIn extends Page {

        /**
         * Specifies name of the page. It's required if we want to show
         * correct page title with i18n support.
         */
        public name: string = 'sign_in';

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
            (data: {email: string, password: string}) => object;

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
                let errorMsg = this.$t('errors.common');
                switch (error) {
                    case 1:
                        errorMsg = this.$t('errors.access_denied');
                        break;
                }
                this.error = errorMsg;
            });
        }
    }

    if (HMRApi && module.hot) {
        HMRApi.install(Vue);
        if (!module.hot.data) {
            HMRApi.createRecord('SignIn', SignIn.options);
        } else {
            HMRApi.reload('SignIn', SignIn.options);
        }
    }
</script>
