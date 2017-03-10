<template>
  <div id="signup">
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

    // The @Component decorator indicates the class is a Vue component
    @Component({
        // All component options are allowed in here
        template: '<button @click="onClick">Click!</button>'
    })

    export default class SignUp extends Vue {
        // Initial data can be declared as instance properties
        message: string = 'Hello!'
        // Component methods can be declared as instance methods
        onClick (): void {
            window.alert(this.message)
        }
    }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
