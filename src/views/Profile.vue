<template>
  <section id="profile">
    <h1 class="title">{{ $t('profile.title') }}</h1>

    <form class="form-horizontal">
      <div class="form-group">
        <div class="col-sm-12">
          <img v-bind:src="user.image" />
        </div>
      </div>

      <div class="form-group">
        <label class="col-sm-2 control-label" for="userName">
          {{ $t('validation.attributes.name') }}
        </label>
        <div class="col-sm-10">
          <p id="userName" class="form-control-static">{{ user.name }}</p>
        </div>
      </div>

      <div class="form-group">
        <label class="col-sm-2 control-label" for="userEmail">
          {{ $t('validation.attributes.email') }}
        </label>
        <div class="col-sm-10">
          <p id="userEmail" class="form-control-static">{{ user.email }}</p>
        </div>
      </div>

      <button type="button" class="btn btn-default" v-on:click="logout">
        {{ $t('profile.logout_label') }}
      </button>
    </form>
  </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Action, Getter, namespace } from 'vuex-class';

    import Page from 'Page.vue';
    import { RESET_AUTHORIZATION } from 'store/modules/user/actions';
    import { AUTHORIZED } from 'store/modules/user/getters';

    const UserGetter = namespace('user', Getter);
    const UserAction = namespace('user', Action);

    /**
     * Describes user profile page.
     */
    @Component
    export default class Profile extends Page {

        /**
         * Specifies name of the page. It's required if we want to show
         * correct page title with i18n support.
         */
        public name: string = 'profile';

        /**
         * Returns global application authorization state.
         *
         * It uses root Vuex getter under the hood.
         */
        @UserGetter(AUTHORIZED)
        public user: any;

        /**
         * Resets global application authorization state.
         *
         * It executes root Vuex action under the hood.
         */
        @UserAction(RESET_AUTHORIZATION)
        public resetAuthorization: () => void;

        /**
         * Vue component 'created' hook, that executes when component instance
         * was created.
         */
        public created(): void {
            if (!this.user.image) {
                this.user.image = require('~assets/img/default_user_photo.jpg');
            }
        }

        /**
         * Resets user authorization state and redirects to the login page.
         */
        public logout(): void {
            this.resetAuthorization();
            this.$router.push('/login');
        }
    }
</script>
