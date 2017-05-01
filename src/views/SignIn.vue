<template>
  <section id="signIn">
    <h1 class="title">{{ $t('sign_in.title') }}</h1>

    <form id="signInForm" method="post" v-on:submit.prevent="onSubmit">
      <div class="form-group">
          <input v-model="email" :placeholder="$t('validation.attributes.email')"
                 name="email" type="text" class="form-control">
      </div>
      <div class="form-group">
        <input v-model="password" :placeholder="$t('validation.attributes.password')"
               name="password" type="password" class="form-control">
      </div>
      <button type="submit" class="btn btn-default">{{ $t('sign_in.login') }}</button>
    </form>

    <p v-show="error" class="error">{{ error }}</p> <!-- TODO convert to vue component -->

    <router-link to="/sign_up">{{ $t('sign_in.do_not_have_account') }}</router-link>
    <br/>
    <router-link to="/forgot_password">{{ $t('sign_in.forgot_password') }}</router-link>
  </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Action, namespace } from 'vuex-class';

    import HMRApi from 'HMRApi';
    import Page from 'Page.vue';
    import { LOGIN } from 'store/modules/user/actions';

    const UserAction = namespace('user', Action);

    @Component
    export default class SignIn extends Page {

        protected name: string = 'sign_in';

        @UserAction(LOGIN)
        private login;

        private email: string = '';

        private password: string = '';

        private error: string = '';

        private onSubmit(): void {
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
            /*if (module.hot.data.cssModules && JSON.stringify(module.hot.data.cssModules) !== JSON.stringify(cssModules)) {
                delete Component.options._Ctor;
            }*/
            HMRApi.reload('SignIn', SignIn.options);
        }
    }
</script>
