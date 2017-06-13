<template>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="/">
          <img src="~assets/img/logo.png"/>
          {{ $t('general.title') }}
        </a>
        <button type="button" class="btn btn-default navbar-btn"
                @click="checkHotUpdates()">
          {{ $t('general.check_for_updates') }}
        </button>
        <loading-spinner></loading-spinner>
      </div>
      <div class="collapse navbar-collapse">
        <language-switcher
            container-class="nav navbar-nav navbar-right"></language-switcher>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" src="./Navbar.ts"></script>

<style lang="stylus" src="./navbar.styl" scoped></style>
