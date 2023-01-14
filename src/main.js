import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'

Vue.config.productionTip = false
Vue.use(Vuex);
Vue.use(VueMeta);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

router.afterEach(( to, from ) => {
  gtag('event', 'page_view', {
    page_location: 'https://richardkogan.com' + to.path, // Include the full URL
  });
});