<template>
  <section>
    <h1>Profile</h1>

    <form class="form-horizontal">
      <div class="form-group">
        <div class="col-sm-12">
          <img v-bind:src="user.image" />
        </div>
      </div>

      <div class="form-group">
        <label class="col-sm-2 control-label">Name</label>
        <div class="col-sm-10">
          <p class="form-control-static">{{ user.name }}</p>
        </div>
      </div>

      <div class="form-group">
        <label class="col-sm-2 control-label">Email</label>
        <div class="col-sm-10">
          <p class="form-control-static">{{ user.email }}</p>
        </div>
      </div>

      <button type="button" class="btn btn-default" v-on:click="logout">Logout</button>
    </form>
  </section>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { Getter, Mutation, namespace } from 'vuex-class'

    import mutationTypes from '../../store/mutation-types'

    const UsersGetter = namespace('users', Getter);
    const UsersMutation = namespace('users', Mutation);

    @Component({})
    export default class Profile extends Vue {

        @UsersGetter('authorized') authorizedUser;

        @UsersMutation(mutationTypes.RESET_AUTHORIZED_USER) resetAuthorizedUser;

        user = {};

        created(): void {
            let user = this.authorizedUser;
            if (user === null) {
                this.logout();
            }
            this.user = user;
        }

        logout(): void {
            this.resetAuthorizedUser();
            this.$router.push('/sign_in');
        }
    }
</script>

<style scoped>
</style>
