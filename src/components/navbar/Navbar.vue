<template lang="pug">
  nav.navbar.navbar-default.navbar-fixed-top: .container-fluid
    .navbar-header
      a.navbar-brand(href="/")
        img(src="~assets/img/logo.png")
        | {{ $t('general.title') }}
      button.btn.btn-default.navbar-btn(
        v-on:click="checkHotUpdates()"
        type="button"
      ) {{ $t('general.check_for_updates') }}
      loading-spinner
    .collapse.navbar-collapse
      language-switcher(container-class="nav navbar-nav navbar-right")
</template>

<script lang="ts" src="./Navbar.ts"></script>

<style lang="stylus" src="./navbar.styl" scoped></style>
