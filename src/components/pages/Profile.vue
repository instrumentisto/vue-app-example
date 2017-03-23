<template>
  <div>
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
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'

    @Component({})
    export default class Profile extends Vue {

        user: Object = {}

        created(): void {
            this.fetchData()
        }

        fetchData(): void {
            let token = this['$cookie'].get('token')
            this.$store.getters['users/getById'](token)
                .then((user: any) => {
                    this.user = user
                })
                .catch((error) => {
                    this.logout()
                })
        }

        logout(): void {
            this['$cookie'].delete('token')
            this.$root.$router.push('/sign_in')
        }
    }
</script>

<style scoped>
  h1, form {
    text-align: center;
  }

  form {
    width: 300px;
    margin: 0 auto;
  }
</style>
