<template>
  <section>
    <h1>{{ $t('sign_up.title') }}</h1>

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
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { Action, namespace } from 'vuex-class'

    const UsersAction = namespace('users', Action);

    @Component({})
    export default class SignUp extends Vue {

      @UsersAction('register') register;

      name: string = '';

      email: string = '';

      password: string = '';

      passwordRepeat: string = '';

      image: string = '';

      formstate: Object = {};

      fieldClassName(field): string {
        if (!field) {
          return ''
        }
        if ((field.$touched || field.$submitted) && field.$invalid) {
          return 'has-error'
        }
      }

      onImageChange(e) {
          var files = e.target.files || e.dataTransfer.files
          if (!files.length) {
              return
          }

          var reader = new FileReader()
          var self = this

          reader.onload = (e) => {
              self.image = (e.target as FileReader).result
          }
          reader.readAsDataURL(files[0])
      }

      onSubmit(): void {
          if (this.formstate['$invalid']) {
              return
          }

          // TODO: check image and set default if it's empty
          this.register({
              user: {
                  name: this.name,
                  email: this.email,
                  password: this.password,
                  image: this.image
              }
          }).then((user: any) => {
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
