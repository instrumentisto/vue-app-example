<template>
  <section>
    <h1>{{ $t('sign_in.title') }}</h1>

    <vue-form :state="formstate" method="post" v-on:submit.prevent="onSubmit">
      <validate class="form-group" :class="fieldClassName(formstate.email)">
          <input v-model="email" name="email" type="email" required class="form-control" :placeholder="$t('user.email')">
          <field-messages auto-label name="email" show="$submitted && $invalid">
            <span class="help-block" slot="required">{{ $t('validation.required') }}</span>
            <span class="help-block" slot="email">{{ $t('validation.email_format') }}</span>
          </field-messages>
      </validate>
      <validate class="form-group" :class="fieldClassName(formstate.password)">
        <input v-model="password" name="password" type="password" required class="form-control" :placeholder="$t('user.password')">
        <field-messages auto-label name="password" show="$submitted && $invalid">
          <span class="help-block" slot="required">{{ $t('validation.required') }}</span>
        </field-messages>
      </validate>
      <button type="submit" class="btn btn-default">{{ $t('sign_in.login') }}</button>
    </vue-form>

    <p>{{ error }}</p>

    <router-link to="/sign_up">{{ $t('sign_in.do_not_have_account') }}</router-link>
    <br/>
    <router-link to="/forgot_password">{{ $t('sign_in.forgot_password') }}</router-link>
  </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Action, namespace } from 'vuex-class';

    import HotApi from '~hot/api';

    const UsersAction = namespace('users', Action);

    @Component
    export default class SignIn extends Vue {

        @UsersAction('login')
        private login;

        private email: string = '';

        private password: string = '';

        private error: string = '';

        private formstate: object = {};

        private fieldClassName(field): string {
            if (!field) {
                return '';
            }
            if ((field.$touched || field.$submitted) && field.$invalid) {
                return 'has-error';
            }
        }

        private onSubmit(): void {
            if (this.formstate.$invalid) {
                return;
            }

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

    if (HotApi && module.hot) {
        HotApi.install(Vue);
        if (!module.hot.data) {
            HotApi.createRecord('SignIn', SignIn.options);
        } else {
            /*if (module.hot.data.cssModules && JSON.stringify(module.hot.data.cssModules) !== JSON.stringify(cssModules)) {
                delete Component.options._Ctor;
            }*/
            HotApi.reload('SignIn', SignIn.options);
        }
    }
</script>
