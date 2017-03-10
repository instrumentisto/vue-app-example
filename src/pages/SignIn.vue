<template>
  <div id="signin">
    <form method="post" v-on:submit.prevent="onSubmit">
      <div class="form-group">
        <input v-model="email" type="email" class="form-control" placeholder="Email">
      </div>
      <div class="form-group">
        <input v-model="password" type="password" class="form-control" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-default">Log In</button>
    </form>

    <router-link to="/sign_up">Don't have an account?</router-link>
    <br/>
    <router-link to="/forgot_password">Forgot password?</router-link>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'

    @Component({})
    export default class SignIn extends Vue {
        email: string

        password: string

        onSubmit(): void {
            // TODO: implement password checking
            if (this.email !== 'roman@dragan.com.ua' && this.password !== '123123') {
                // TODO: return error
                return;
            }
//            console.log(this.$root.$router);
            this.$root.$router.push('profile');
        }
    }
</script>

<style scoped>
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
