import Vue from 'vue';
import VueRouter from 'vue-router';
import SignIn from './pages/SignIn.vue';

Vue.use(VueRouter);

const SignUp = resolve => {
  require.ensure(['./pages/SignUp.vue'], () => {
    resolve(require('./pages/SignUp.vue'));
  });
};

const Profile = resolve => {
  require.ensure(['./pages/Profile.vue'], () => {
    resolve(require('./pages/Profile.vue'));
  });
};

const routes = [
  { path: '/', component: SignIn },
  { path: '/sign_in', component: SignIn },
  { path: '/sign_up', component: SignUp },
  { path: '/profile', component: Profile }
];

const router = new VueRouter({
  mode: 'history',
  routes: routes
});

const app = new Vue({
    router
}).$mount('#app');
