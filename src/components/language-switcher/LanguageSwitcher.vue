<template>
  <ul :class="containerClass">
    <li v-for="locale in locales" v-bind:class="{ active: isActive(locale) }">
      <a @click="change(locale)" href="javascript:void(0)">
        {{ locale }}
      </a>
    </li>
  </ul>
</template>

<script lang="ts" src="./LanguageSwitcher.ts"></script>

<style lang="stylus" src="./language-switcher.styl" scoped></style>
