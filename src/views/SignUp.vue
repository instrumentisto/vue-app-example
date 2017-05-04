<template>
  <section id="signUp">
    <h1 class="title">{{ $t('sign_up.title') }}</h1>

    <form id="signUpForm" method="post" v-on:submit.prevent="onSubmit">
      <div class="form-group"
           :class="{'has-error': validationErrors.has('name') }">
        <input v-model="user.name" v-validate.initial="'required'"
               :placeholder="$t('validation.attributes.name')"
               name="name" type="text" class="form-control">
          <span id="nameError" v-show="validationErrors.has('name')"
                class="help-block">
            {{ validationErrors.first('name') }}
          </span>
      </div>
      <div class="form-group"
           :class="{'has-error': validationErrors.has('email') }">
        <input v-model="user.email" v-validate.initial="'required|email'"
               :placeholder="$t('validation.attributes.email')"
               name="email" type="email" class="form-control">
          <span id="emailError" v-show="validationErrors.has('email')"
                class="help-block">
            {{ validationErrors.first('email') }}
          </span>
      </div>
      <div class="form-group"
           :class="{'has-error': validationErrors.has('password') }">
        <input v-model="user.password" v-validate.initial="'required|min:6'"
               :placeholder="$t('validation.attributes.password')"
               name="password" type="password" class="form-control">
          <span id="passwordError" v-show="validationErrors.has('password')"
                class="help-block">
            {{ validationErrors.first('password') }}
          </span>
      </div>
      <div class="form-group"
           :class="{'has-error': validationErrors.has('password_confirm') }">
        <input v-model="user.password_confirm"
               v-validate.initial="'required|min:6|confirmed:password'"
               :placeholder="$t('validation.attributes.password_confirm')"
               name="password_confirm" type="password" class="form-control">
          <span id="passwordConfirmError"
                v-show="validationErrors.has('password_confirm')"
                class="help-block">
            {{ validationErrors.first('password_confirm') }}
          </span>
      </div>
      <div class="form-group"
           :class="{'has-error': validationErrors.has('image') }">
        <input v-on:change="onImageChange"
               v-validate.initial="'ext:jpg,png|mimes:image/jpeg,image/png|size:2048'"
               name="image" type="file" class="form-control">
          <span id="imageError" v-show="validationErrors.has('image')"
                class="help-block">
            {{ validationErrors.first('image') }}
          </span>
      </div>
      <button type="submit" class="btn btn-default">
        {{ $t('sign_up.sign_up_button') }}
      </button>
    </form>

    <error-block :error="error"></error-block>

    <router-link to="/login">
      {{ $t('sign_up.already_have_account') }}
    </router-link>
  </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Action, namespace } from 'vuex-class';

    import ErrorBlock from 'components/error-block/ErrorBlock.vue';
    import Page from 'Page.vue';
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
            return this.$t('sign_up.title');
        }

        /**
         * Executes user sign up action of the root Vuex store.
         */
        @UserAction(SIGN_UP)
        public signUp: (user) => void;

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
                    let errorMsg = this.$t('errors.common');
                    switch (error) {
                      case 1:
                        errorMsg = this.$t('errors.email_already_taken');
                        break;
                    }
                    this.error = errorMsg;
                });
            });
        }
    }
</script>
