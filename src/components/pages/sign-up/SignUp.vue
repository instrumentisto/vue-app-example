<template lang="pug">
  section#signUp
    h1.title {{ $t('sign_up.title') }}

    form#signUpForm(
      v-on:submit.prevent="onSubmit"
      method="post"
    )
      .form-group(v-bind:class="{'has-error': validationErrors.has('name') }")
        input.form-control(
          v-bind:placeholder="$t('validation.attributes.name')"
          v-model="user.name"
          v-validate.disable="'required'"
          name="name"
          type="text"
        )
        span#nameError.help-block(
          v-show="validationErrors.has('name')"
        ) {{ validationErrors.first('name') }}

      .form-group(v-bind:class="{'has-error': validationErrors.has('email') }")
        input.form-control(
          v-bind:placeholder="$t('validation.attributes.email')"
          v-model="user.email"
          v-validate.disable="'required|email'"
          name="email"
          type="email"
        )
        span#emailError.help-block(
          v-show="validationErrors.has('email')"
        ) {{ validationErrors.first('email') }}

      .form-group(
        v-bind:class="{'has-error': validationErrors.has('password') }"
      )
        input.form-control(
          v-bind:placeholder="$t('validation.attributes.password')"
          v-model="user.password"
          v-validate.disable="'required|min:6'"
          name="password"
          type="password"
        )
        span#passwordError.help-block(
          v-show="validationErrors.has('password')"
        ) {{ validationErrors.first('password') }}

      .form-group(
        v-bind:class="{'has-error': validationErrors.has('password_confirm') }"
      )
        input.form-control(
          v-bind:placeholder="$t('validation.attributes.password_confirm')"
          v-model="user.password_confirm"
          v-validate.disable="'required|min:6|confirmed:password'"
          name="password_confirm"
          type="password"
        )
        span#passwordConfirmError.help-block(
          v-show="validationErrors.has('password_confirm')"
        ) {{ validationErrors.first('password_confirm') }}

      .form-group(v-bind:class="{'has-error': validationErrors.has('image') }")
        input.form-control(
          v-on:change="onImageChange"
          v-validate="'ext:jpg,png|mimes:image/jpeg,image/png|size:2048'"
          name="image"
          type="file"
        )
        span#imageError.help-block(
          v-show="validationErrors.has('image')"
        ) {{ validationErrors.first('image') }}

      button.btn.btn-default(type="submit") {{ $t('sign_up.sign_up_button') }}

    error-block(v-bind:error="error")

    router-link(to="/login") {{ $t('sign_up.already_have_account') }}
</template>

<script lang="ts" src="./SignUp.ts"></script>
