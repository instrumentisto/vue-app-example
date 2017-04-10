<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="/">
                    <img alt="Brand" src="../../../assets/img/logo.png">
                    Webmasters Test App
                </a>
                <button type="button" class="btn btn-default navbar-btn" @click="checkHotStatus()">Check for updates</button>
            </div>
            <div class="collapse navbar-collapse">
                <language-switcher container-classes="nav navbar-nav navbar-right" ></language-switcher>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';

    import LanguageSwitcher from '~components/partial/LanguageSwitcher.vue';
    import HotApi from '~hot/api';

    @Component({
        components: {
            LanguageSwitcher,
        },
    })
    export default class Navbar extends Vue {

        private checkHotStatus() {
            try {
                module.hot.check(true, (err, updatedModules) => {
//                    console.log('check err', err);
//                    console.log('check modules', updatedModules);
                });
            } catch (e) {
//                console.log('check catch', e.toString());
            }
        }
    }

    if (HotApi && module.hot) {
        HotApi.install(Vue);
        if (!module.hot.data) {
            HotApi.createRecord('Header', Navbar.options);
        } else {
            if (module.hot.data.cssModules
                && JSON.stringify(module.hot.data.cssModules) !== JSON.stringify(cssModules)
            ) {
                delete Component.options._Ctor;
            }
            HotApi.reload('Header', Navbar.options);
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
