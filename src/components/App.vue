<template>
    <div id="app">
        <header>
            <navbar></navbar>
        </header>
        <main>
            <router-view></router-view>
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

    import Navbar from './partial/Navbar.vue';

    const UsersGetter = namespace('users', Getter);
    const UsersAction = namespace('users', Action);

    @Component({
        components: {
            Navbar,
        },
    })
    export default class App extends Vue {

        @UsersGetter('totalCount')
        private usersTotalCount;

        @UsersAction('getAll')
        private getAllUsers;

        private created(): void {
            this.getAllUsers();
        }
    }
</script>

<style src="../../bower_components/bootstrap/dist/css/bootstrap.css"></style>
<style>
    html, body, #app, main {
        height: 100%;
        width: 100%;
    }

    main {
        margin-top: -72px;
        padding-top: 72px;
    }

    main > section {
        width: 400px;
        margin: 0 auto;
        text-align: center;
    }

    footer {
        height: 52px;
        margin-top: -52px;
        padding: 10px;
        border-top: 1px solid #e7e7e7;
        background-color: #f8f8f8;
        line-height: 32px;
    }
</style>
