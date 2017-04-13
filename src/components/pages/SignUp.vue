<template>
  <section>
    <h1 class="title">{{ $t('sign_up.title') }}</h1>

    <vue-form :state="formstate" method="post" v-on:submit.prevent="onSubmit">
      <validate class="form-group" :class="fieldClassName(formstate.name)">
        <input v-model="name" name="name" type="text" required class="form-control" :placeholder="$t('user.name')">
      </validate>
      <validate class="form-group" :class="fieldClassName(formstate.email)">
        <input v-model="email" name="email" type="email" required class="form-control" :placeholder="$t('user.email')">
      </validate>
      <validate class="form-group" :class="fieldClassName(formstate.password)">
        <input v-model="password" name="password" type="password" required class="form-control" :placeholder="$t('user.password')">
      </validate>
      <validate class="form-group" :class="fieldClassName(formstate.passwordRepeat)">
        <input v-model="passwordRepeat" name="password_repeat" type="password" required class="form-control" :placeholder="$t('user.password_again')">
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

    import Page from '~components/Page.vue';

    const UsersAction = namespace('users', Action);

    @Component({})
    export default class SignUp extends Page {

        @UsersAction('register')
        private register;

        private name: string = '';

        private email: string = '';

        private password: string = '';

        private passwordRepeat: string = '';

        private image: string = '';

        private formstate: object = {};

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
            const self = this;

            reader.onload = (loadedEvent) => {
                self.image = (loadedEvent.target as FileReader).result;
            };
            reader.readAsDataURL(files[0]);
        }

        private onSubmit(): void {
            if (this.formstate.$invalid) {
                return;
            }

            // TODO: check image and set default if it's empty
            this.register({
                user: {
                    email: this.email,
                    image: this.image,
                    name: this.name,
                    password: this.password,
                },
            }).then(() => {
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
