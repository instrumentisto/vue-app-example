<style src="../../bower_components/bootstrap/dist/css/bootstrap.css"></style>

<template>
    <div id="app">
        <header>
            <app-header/>
        </header>
        <main>
            <router-view></router-view>
        </main>
        <footer></footer>
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

    main > section {
        width: 400px;
        margin: 0 auto;
        text-align: center;
    }
</style>
