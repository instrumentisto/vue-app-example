<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="/">
                    <img alt="Brand" src="../../../assets/img/logo.png">
                    Webmasters Test App
                </a>
                <button type="button" @click="checkHotStatus()">Check for updates</button>
            </div>

            <div class="collapse navbar-collapse">
                <language-switcher container-classes="nav navbar-nav navbar-right" />
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import HotReloadApi from 'vue-hot-reload-api'

    import LanguageSwitcher from './LanguageSwitcher.vue'

    @Component({
        components: {
            LanguageSwitcher
        }
    })
    export default class Header extends Vue {

        checkHotStatus() {
            try {
                module.hot.check((err, updatedModules) => {
                    console.log('check err', err);
                    console.log('check modules', updatedModules);
                });
            } catch(e) {
                console.log('check catch', e.toString());
            }
        }
    }

    if (module.hot) {
        HotReloadApi.install(Vue);
        if (!module.hot.data) {
            HotReloadApi.createRecord('Header', Header.options)
        } else {
            /*if (module.hot.data.cssModules && JSON.stringify(module.hot.data.cssModules) !== JSON.stringify(cssModules)) {
             delete Component.options._Ctor;
             }*/
            HotReloadApi.reload('Header', Header.options)
        }
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
