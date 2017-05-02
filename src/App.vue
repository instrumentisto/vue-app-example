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

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Action, Getter, namespace } from 'vuex-class';

    import Navbar from 'components/Navbar.vue';
    import { FETCH_ALL } from 'store/modules/user/actions';
    import { TOTAL_COUNT } from 'store/modules/user/getters';

    const UserGetter = namespace('user', Getter);
    const UserAction = namespace('user', Action);

    @Component({
        components: {
            Navbar,
        },
    })
    export default class App extends Vue {

        @UserGetter(TOTAL_COUNT)
        private usersTotalCount;

        @UserAction(FETCH_ALL)
        private fetchAllUsers;

        private created(): void {
            this.fetchAllUsers();
        }

        private preFetch(store): Promise {
            return store.dispatch('user/' + FETCH_ALL);
        }
    }
</script>

<style src="~bower/bootstrap/dist/css/bootstrap.css"></style>
<style>
    html {
        position: relative;
        min-height: 100%;
    }

    body {
        margin-bottom: 51px;
    }

    main {
        padding-top: 51px;
        padding-bottom: 20px;
    }

    main > section {
        width: 400px;
        margin: 0 auto;
        text-align: center;
    }

    footer {
        position: absolute;
        bottom: 0;
        height: 52px;
        width: 100%;
        padding: 10px;
        border-top: 1px solid #e7e7e7;
        background-color: #f8f8f8;
        line-height: 32px;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to {
        opacity: 0
    }
</style>
