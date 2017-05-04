<template>
  <section id="signUp">
    <h1 class="title">{{ $t('sign_up.title') }}</h1>

    <form id="signUpForm" method="post" v-on:submit.prevent="onSubmit">
      <div class="form-group"
           :class="{'has-error': validationErrors.has('name') }">
        <input v-model="user.name" v-validate.disable="'required'"
               :placeholder="$t('validation.attributes.name')"
               name="name" type="text" class="form-control">
          <span id="nameError" v-show="validationErrors.has('name')"
                class="help-block">
            {{ validationErrors.first('name') }}
          </span>
      </div>
      <div class="form-group"
           :class="{'has-error': validationErrors.has('email') }">
        <input v-model="user.email" v-validate.disable="'required|email'"
               :placeholder="$t('validation.attributes.email')"
               name="email" type="email" class="form-control">
          <span id="emailError" v-show="validationErrors.has('email')"
                class="help-block">
            {{ validationErrors.first('email') }}
          </span>
      </div>
      <div class="form-group"
           :class="{'has-error': validationErrors.has('password') }">
        <input v-model="user.password" v-validate.disable="'required|min:6'"
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
               v-validate.disable="'required|min:6|confirmed:password'"
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
               v-validate="'ext:jpg,png|mimes:image/jpeg,image/png|size:2048'"
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

<script lang="ts" src="./SignUp.ts"></script>
