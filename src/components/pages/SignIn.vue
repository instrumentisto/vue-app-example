<template>
  <div>
    <h1>Sign In</h1>

    <form method="post" v-on:submit.prevent="onSubmit">
      <div class="form-group" v-bind:class="{ 'has-error': validationErrors.email }">
        <input v-model="email" type="email" class="form-control" placeholder="Email">
        <span class="help-block" v-show="validationErrors.email">{{ validationErrors.email }}</span>
      </div>
      <div class="form-group" v-bind:class="{ 'has-error': validationErrors.password }">
        <input v-model="password" type="password" class="form-control" placeholder="Password">
        <span class="help-block" v-show="validationErrors.password">{{ validationErrors.password }}</span>
      </div>
      <button type="submit" class="btn btn-default">Log In</button>
    </form>

    <p>{{ error }}</p>

    <router-link to="/sign_up">Don't have an account?</router-link>
    <br/>
    <router-link to="/forgot_password">Forgot password?</router-link>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { mapGetters, mapActions } from 'vuex'

    @Component({})
    export default class SignIn extends Vue {
        email: string

        password: string

        error: string = ''

        users = this.$store.state.users.all

        validationErrors: string[] = []

        onSubmit(): void {
            this.validationErrors = []
            if (!this.email) {
                this.validationErrors['email'] = 'Required'
            }
            if (!this.password) {
                this.validationErrors['password'] = 'Required'
            }
            if (this.validationErrors.length > 0) {
                return;
            }

            this.$store.dispatch('users/login', {email: this.email, password: this.password})
                .then((user: any) => {
                    // TODO: set cookie
                    this.$root.$router.push('/profile')
                })
                .catch((error) => {
                    this.error = 'Access denied'
                })
        }
    }
</script>

<style scoped>
</style>
