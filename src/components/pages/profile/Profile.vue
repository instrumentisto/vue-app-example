<template lang="pug">
  section#profile
    h1.title {{ $t('profile.title') }}
    form.form-horizontal
      .form-group
        .col-sm-12
          img(v-bind:src="user.image")

      .form-group
        label.col-sm-2.control-label(for="userName")
          | {{ $t('validation.attributes.name') }}
        .col-sm-10
          p#userName.form-control-static {{ user.name }}

      .form-group
        label.col-sm-2.control-label(for="userEmail")
          | {{ $t('validation.attributes.email') }}
        .col-sm-10
          p#userEmail.form-control-static {{ user.email }}

      button.btn.btn-default(
        v-on:click="logout"
        type="button"
      ) {{ $t('profile.logout_label') }}
</template>

<script lang="ts" src="./Profile.ts"></script>
