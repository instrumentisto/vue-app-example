<template>
  <section>
    <h1 class="title">{{ $t('sign_up.title') }}</h1>

    <form method="post" v-on:submit.prevent="onSubmit">
      <div class="form-group" :class="{'has-error': validationErrors.has('name') }">
        <input v-model="user.name" v-validate="'required'" :placeholder="$t('validation.attributes.name')"
               name="name" type="text" class="form-control">
          <span v-show="validationErrors.has('name')" class="help-block">{{ validationErrors.first('name') }}</span>
      </div>
      <div class="form-group" :class="{'has-error': validationErrors.has('email') }">
        <input v-model="user.email" v-validate="'required|email'" :placeholder="$t('validation.attributes.email')"
               name="email" type="email" class="form-control">
          <span v-show="validationErrors.has('email')" class="help-block">{{ validationErrors.first('email') }}</span>
      </div>
      <div class="form-group" :class="{'has-error': validationErrors.has('password') }">
        <input v-model="user.password" v-validate="'required'" :placeholder="$t('validation.attributes.password')"
               name="password" type="password" class="form-control">
          <span v-show="validationErrors.has('password')" class="help-block">
            {{ validationErrors.first('password') }}
          </span>
      </div>
      <div class="form-group" :class="{'has-error': validationErrors.has('password_confirm') }">
        <input v-model="user.password_confirm" v-validate="'required|confirmed:password'"
               :placeholder="$t('validation.attributes.password_confirm')"
               name="password_confirm" type="password" class="form-control">
          <span v-show="validationErrors.has('password_confirm')" class="help-block">
            {{ validationErrors.first('password_confirm') }}
          </span>
      </div>
      <div class="form-group" :class="{'has-error': validationErrors.has('image') }">
        <input v-on:change="onImageChange" v-validate="'ext:jpg,png|mimes:image/jpeg,image/png|size:2048'"
               name="image" type="file" class="form-control">
          <span v-show="validationErrors.has('image')" class="help-block">
            {{ validationErrors.first('image') }}
          </span>
      </div>
      <button type="submit" class="btn btn-default" :disabled="validationErrors.any() ? true : false">
          {{ $t('sign_up.sign_up_button') }}
      </button>
    </form>

    <router-link to="/login">{{ $t('sign_up.already_have_account') }}</router-link>
  </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Action, namespace } from 'vuex-class';

    import Page from 'components/Page.vue';

    const UsersAction = namespace('users', Action);

    @Component
    export default class SignUp extends Page {

        @UsersAction('register')
        private register;

        private user = {
            name: '',
            email: '',
            password: '',
            password_confirm: '',
            image: '',
        };

        protected name: string = 'sign_up';

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
            if (this.validationErrors.any()) {
                return;
            }

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
