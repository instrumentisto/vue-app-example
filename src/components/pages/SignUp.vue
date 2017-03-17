<template>
  <div>
    <h1>Sign Up</h1>

    <form>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Name">
      </div>
      <div class="form-group">
        <input type="email" class="form-control" placeholder="Email">
      </div>
      <div class="form-group">
        <input type="password" class="form-control" placeholder="Password">
      </div>
      <div class="form-group">
        <input type="password" class="form-control" placeholder="Password again">
      </div>
      <div class="form-group">
        <input type="file" class="form-control">
      </div>
      <button type="submit" class="btn btn-default">Sign Up</button>
    </form>

    <router-link to="/sign_in">Already have an account?</router-link>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'

    @Component({})
    export default class SignUp extends Vue {
    }
</script>

<style scoped>
</style>
