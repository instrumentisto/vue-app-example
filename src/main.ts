import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from './pages/SignIn.vue'
import SignUp from './pages/SignUp.vue'

Vue.use(VueRouter);

const routes = [
  { path: '/', component: SignIn },
  { path: '/sign_in', component: SignIn },
  { path: '/sign_up', component: SignUp }
];

const router = new VueRouter({
  mode: 'history',
  routes: routes
});

const app = new Vue({
    router
}).$mount('#app');
