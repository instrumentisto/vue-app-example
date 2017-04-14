<template>
  <section>
    <h1 class="title">{{ $t('sign_up.title') }}</h1>

    <vue-form :state="formstate" method="post" v-on:submit.prevent="onSubmit">
      <validate class="form-group" :class="fieldClassName(formstate.name)">
        <input v-model="user.name" name="name" type="text" required class="form-control" :placeholder="$t('user.name')">
      </validate>
      <validate class="form-group" :class="fieldClassName(formstate.email)">
        <input v-model="user.email" name="email" type="email" required class="form-control" :placeholder="$t('user.email')">
      </validate>
      <validate class="form-group" :class="fieldClassName(formstate.password)">
        <input v-model="user.password" name="password" type="password" required class="form-control" :placeholder="$t('user.password')">
      </validate>
      <validate class="form-group" :class="fieldClassName(formstate.passwordRepeat)">
        <input v-model="user.passwordRepeat" name="password_repeat" type="password" required class="form-control" :placeholder="$t('user.password_again')">
      </validate>
      <validate class="form-group" :class="fieldClassName(formstate.image)">
        <input @change="onImageChange" name="image" type="file" class="form-control">
      </validate>
      <button type="submit" class="btn btn-default">{{ $t('sign_up.sign_up_button') }}</button>
    </vue-form>

    <router-link to="/sign_in">{{ $t('sign_up.already_have_account') }}</router-link>
  </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Action, namespace } from 'vuex-class';

    import Page from '~/components/Page.vue';

    const UsersAction = namespace('users', Action);

    @Component
    export default class SignUp extends Page {

        @UsersAction('register')
        private register;

        private user = {
            name: '',
            email: '',
            password: '',
            passwordRepeat: '',
            image: '',
        };

        private formstate: object = {}; // TODO: add FormState type

        protected name: string = 'sign_up';

        private fieldClassName(field): string {
            if (!field) {
              return '';
            }
            if ((field.$touched || field.$submitted) && field.$invalid) {
              return 'has-error';
            }
        }

        private onImageChange(changeEvent) {
            const files = changeEvent.target.files || changeEvent.dataTransfer.files;
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

        private onSubmit(): void {
            if (this.formstate.$invalid) {
                return;
            }

            // TODO: check image
            this.register({ user: this.user }).then(() => {
                this.$router.push('/profile');
            }).catch((error) => {
                let errorMsg = this.$t('errors.common');
                switch (error) {
                    case 1:
                        errorMsg = this.$t('errors.email_already_taken');
                        break;
                }
                this.error = errorMsg;
            });
        }
    }
</script>
