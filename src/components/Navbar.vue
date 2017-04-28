<template>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="/">
          <img src="~assets/img/logo.png"/>
          {{ $t('general.title') }}
        </a>
        <button type="button" class="btn btn-default navbar-btn" @click="checkHotStatus()">
          {{ $t('general.check_for_updates') }}
        </button>
        <loading-spinner></loading-spinner>
      </div>
      <div class="collapse navbar-collapse">
        <language-switcher container-classes="nav navbar-nav navbar-right"></language-switcher>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';

    import LanguageSwitcher from 'components/LanguageSwitcher.vue';
    import LoadingSpinner from 'components/LoadingSpinner.vue';
    import HMRApi from 'HMRApi';

    @Component({
        components: {
            LanguageSwitcher,
            LoadingSpinner,
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

    if (HMRApi && module.hot) {
        HMRApi.install(Vue);
        if (!module.hot.data) {
            HMRApi.createRecord('Header', Navbar.options);
        } else {
            /*if (module.hot.data.cssModules
                && JSON.stringify(module.hot.data.cssModules) !== JSON.stringify(cssModules)
            ) {
                delete Component.options._Ctor;
            }*/
            HMRApi.reload('Header', Navbar.options);
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
