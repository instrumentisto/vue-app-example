<template>
  <div id="signin">
    <form method="post" v-on:submit.prevent="onSubmit">
      <div class="form-group">
        <input v-model="email" type="email" class="form-control" placeholder="Email">
      </div>
      <div class="form-group">
        <input v-model="password" type="password" class="form-control" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-default">Log In</button>
    </form>

    <router-link to="/sign_up">Don't have an account?</router-link>
    <br/>
    <router-link to="/forgot_password">Forgot password?</router-link>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'

    @Component({})
    export default class SignIn extends Vue {
        email: string

        password: string

        onSubmit(): void {
            // TODO: implement password checking
            if (this.email !== 'roman@dragan.com.ua' && this.password !== '123123') {
                // TODO: return error
                return;
            }
            this.$root.$router.push('profile');
        }
    }
</script>

<style scoped>
</style>
