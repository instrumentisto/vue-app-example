<template>
  <div>
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
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { Action, namespace } from 'vuex-class'
    import HotReloadApi from 'vue-hot-reload-api'

    const UsersAction = namespace('users', Action);

    @Component
    export default class SignIn extends Vue {

        @UsersAction('login') login;

        email: string = ''

        password: string = ''

        error: string = ''

        formstate: Object = {}

        fieldClassName(field): string {
            if (!field) {
                return ''
            }
            if ((field.$touched || field.$submitted) && field.$invalid) {
                return 'has-error'
            }
        }

        onSubmit(): void {
            if (this.formstate['$invalid']) {
                return;
            }

            this.login({ email: this.email, password: this.password })
                .then((user: any) => {
                    this.$router.push('/profile');
                })
                .catch((error) => {
                    this.error = this.$t('errors.access_denied');
                });
        }
    }

    if (module.hot) {
        HotReloadApi.install(Vue);
        if (!module.hot.data) {
            console.log(SignIn.toString());
            HotReloadApi.createRecord('SignIn', SignIn.options)
        } else {
            /*if (module.hot.data.cssModules && JSON.stringify(module.hot.data.cssModules) !== JSON.stringify(cssModules)) {
                delete Component.options._Ctor;
            }*/
            HotReloadApi.reload('SignIn', SignIn.options)
        }
    }
</script>

<style scoped>
</style>
