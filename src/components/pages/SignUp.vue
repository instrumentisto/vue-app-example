<template>
  <div>
    <h1>Sign Up</h1>

    <vue-form :state="formstate" method="post" v-on:submit.prevent="onSubmit">
      <validate class="form-group" :class="fieldClassName(formstate.name)">
        <input v-model="name" name="name" type="text" required class="form-control" placeholder="Name">
      </validate>
      <validate class="form-group" :class="fieldClassName(formstate.email)">
        <input v-model="email" name="email" type="email" required class="form-control" placeholder="Email">
      </validate>
      <validate class="form-group" :class="fieldClassName(formstate.password)">
        <input v-model="password" name="password" type="password" required class="form-control" placeholder="Password">
      </validate>
      <validate class="form-group" :class="fieldClassName(formstate.passwordRepeat)">
        <input v-model="passwordRepeat" name="password_repeat" type="password" required class="form-control" placeholder="Password again">
      </validate>
      <validate class="form-group" :class="fieldClassName(formstate.image)">
        <input @change="onImageChange" name="image" type="file" class="form-control">
      </validate>
      <button type="submit" class="btn btn-default">Sign Up</button>
    </vue-form>

    <router-link to="/sign_in">Already have an account?</router-link>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'

    @Component({})
    export default class SignUp extends Vue {

      name: string = ''

      email: string = ''

      password: string = ''

      passwordRepeat: string = ''

      image: string = ''

      formstate: Object = {}

      fieldClassName(field): string {
        if (!field) {
          return ''
        }
        if ((field.$touched || field.$submitted) && field.$invalid) {
          return 'has-error'
        }
      }

      onImageChange(e) {
          var files = e.target.files || e.dataTransfer.files
          if (!files.length) {
              return
          }

          var reader = new FileReader()
          var self = this

          reader.onload = (e) => {
              self.image = (e.target as FileReader).result
          }
          reader.readAsDataURL(files[0])
      }

      onSubmit(): void {
          if (this.formstate['$invalid']) {
              return
          }

          // TODO: check image and set default if it's empty
          this.$store.commit('users/add', {
              name: this.name,
              email: this.email,
              password: this.password,
              image: this.image
          });

//        this.$store.dispatch('users/login', {email: this.email, password: this.password})
//            .then((user: any) => {
//              this['$cookie'].set('token', user.id)
//              this.$root.$router.push('/profile')
//            })
//            .catch((error) => {
//              this.error = 'Access denied'
//            })
      }
    }
</script>

<style scoped>
</style>
