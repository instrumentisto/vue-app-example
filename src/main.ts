import Vue from 'vue'
import store from './store/index.ts'
import router from './router/index.ts'
import App from './components/App.vue'

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
