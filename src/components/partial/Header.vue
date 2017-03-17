<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="/">
                    <img alt="Brand" src="../../../assets/img/logo.png">
                    Webmasters Test App
                </a>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'

    @Component({})
    export default class Header extends Vue {
        // Header logic
    }
</script>

<style scoped>
    .navbar-brand {
        padding: 5px;
    }

    .navbar-brand img {
        height: 40px;
        display: inline-block;
    }
</style>
