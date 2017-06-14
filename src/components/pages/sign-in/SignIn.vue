<template lang="pug">
  section#signIn
    h1.title {{ $t('sign_in.title') }}

    form#signInForm(
      v-on:submit.prevent="onSubmit"
      method="post"
    )
      .form-group
        input.form-control(
          v-bind:placeholder="$t('validation.attributes.email')"
          v-model="email"
          name="email"
          type="text"
        )
      .form-group
        input.form-control(
          v-bind:placeholder="$t('validation.attributes.password')"
          v-model="password"
          name="password"
          type="password"
        )
      button.btn.btn-default(type="submit") {{ $t('sign_in.login') }}

    error-block(v-bind:error="error")

    router-link(to="/sign_up") {{ $t('sign_in.do_not_have_account') }}
</template>

<script lang="ts" src="./SignIn.ts"></script>
