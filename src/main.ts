import Vue from 'vue'
import VueCookie from 'vue-cookie'
import VueForm from 'vue-form'

import store from './store/index'
import i18n from './i18n/locales'
import router from './router/index'
import App from './components/App.vue'

Vue.use(VueCookie)
Vue.use(VueForm)
Vue.use(i18n)

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
