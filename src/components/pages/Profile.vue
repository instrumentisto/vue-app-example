<template>
  <section>
    <h1 class="title">{{ $t('profile.title') }}</h1>

    <form class="form-horizontal">
      <div class="form-group">
        <div class="col-sm-12">
          <img v-bind:src="user.image" />
        </div>
      </div>

      <div class="form-group">
        <label class="col-sm-2 control-label">{{ $t('validation.attributes.name') }}</label>
        <div class="col-sm-10">
          <p class="form-control-static">{{ user.name }}</p>
        </div>
      </div>

      <div class="form-group">
        <label class="col-sm-2 control-label">{{ $t('validation.attributes.email') }}</label>
        <div class="col-sm-10">
          <p class="form-control-static">{{ user.email }}</p>
        </div>
      </div>

      <button type="button" class="btn btn-default" v-on:click="logout">{{ $t('profile.logout_label') }}</button>
    </form>
  </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Getter, Mutation, namespace } from 'vuex-class';

    import Page from 'components/Page.vue';
    import Users from 'store/modules/Users';

    const UsersGetter = namespace('users', Getter);
    const UsersMutation = namespace('users', Mutation);

    @Component
    export default class Profile extends Page {

        protected name: string = 'profile';

        @UsersGetter('authorized')
        private authorizedUser;

        @UsersMutation(Users.mutationTypes.RESET_AUTHORIZED_USER)
        private resetAuthorizedUser;

        private user = {};

        private created(): void {
            const user = this.authorizedUser;
            if (user === null) {
                this.logout();
                return;
            }

            this.user = user;
            if (!this.user.image) {
                this.user.image = require('~assets/img/default_user_photo.jpg');
            }
        }

        private logout(): void {
            this.resetAuthorizedUser();
            this.$router.push('/sign_in');
        }
    }
</script>
