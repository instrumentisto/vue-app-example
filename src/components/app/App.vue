<template>
  <div id="app">
    <header>
      <navbar></navbar>
    </header>
    <main>
      <transition name="fade" mode="out-in" appear>
        <router-view></router-view>
      </transition>
    </main>
    <footer>
      <span class="pull-right">
        {{ $t('general.total_registrations_label', { count: usersTotalCount }) }}
      </span>
    </footer>
  </div>
</template>

<script lang="ts" src="./App.ts"></script>

<style src="~bower/bootstrap/dist/css/bootstrap.css"></style>

<style lang="stylus" src="./app.styl"></style>
