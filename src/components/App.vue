<style src="../../bower_components/bootstrap/dist/css/bootstrap.css"></style>

<template>
    <div>
        <app-header/>
        <router-view class="container"></router-view>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import AppHeader from './partial/Header.vue'

    @Component({
        components: {
            AppHeader
        }
    })
    export default class App extends Vue {
        // Common logic for all pages
    }
</script>

<style>
    html, body {
        height: 100%;
        width: 100%;
    }
</style>
