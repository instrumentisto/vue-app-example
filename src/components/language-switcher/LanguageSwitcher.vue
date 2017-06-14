<template lang="pug">
  ul(v-bind:class="containerClass")
    li(
      v-bind:class="{ active: isActive(locale) }"
      v-for="locale in locales"
    )
      a(
        v-on:click.prevent="change(locale)"
        href="#"
      ) {{ locale }}
</template>

<script lang="ts" src="./LanguageSwitcher.ts"></script>

<style lang="stylus" src="./language-switcher.styl" scoped></style>
