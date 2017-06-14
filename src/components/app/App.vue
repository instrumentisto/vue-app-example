<template lang="pug">
  #app
    header
      navbar
    main
      transition(
        name="fade"
        mode="out-in"
        appear
      ): router-view
    footer
      span.pull-right
        | {{ $t('general.total_registrations_label', {count: usersTotalCount}) }}
</template>

<script lang="ts" src="./App.ts"></script>

<style src="~bower/bootstrap/dist/css/bootstrap.css"></style>

<style lang="stylus" src="./app.styl"></style>
