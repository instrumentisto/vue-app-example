<template>
  <section id="signIn">
    <h1 class="title">{{ $t('sign_in.title') }}</h1>

    <form id="signInForm" method="post" v-on:submit.prevent="onSubmit">
      <div class="form-group">
          <input v-model="email"
                 :placeholder="$t('validation.attributes.email')"
                 name="email" type="text" class="form-control">
      </div>
      <div class="form-group">
        <input v-model="password"
               :placeholder="$t('validation.attributes.password')"
               name="password" type="password" class="form-control">
      </div>
      <button type="submit" class="btn btn-default">
        {{ $t('sign_in.login') }}
      </button>
    </form>

    <error-block :error="error"></error-block>

    <router-link to="/sign_up">
      {{ $t('sign_in.do_not_have_account') }}
    </router-link>
  </section>
</template>

<script lang="ts" src="./SignIn.ts"></script>
