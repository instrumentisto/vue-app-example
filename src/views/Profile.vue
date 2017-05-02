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

    @Component
    export default class Profile extends Page {

        protected name: string = 'profile';

        @UserGetter(AUTHORIZED)
        private user;

        @UserAction(RESET_AUTHORIZATION)
        private resetAuthorization;

        private created(): void {
            if (!this.user.image) {
                this.user.image = require('~assets/img/default_user_photo.jpg');
            }
        }

        private logout(): void {
            this.resetAuthorization();
            this.$router.push('/login');
        }
    }
</script>
