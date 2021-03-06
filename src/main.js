import Vue from 'vue';
import App from './App.vue';
import store from './store';

import './registerServiceWorker';
import './filters';
import './vue_uses/index.js';

Vue.config.productionTip = false;
Vue.config.silent = true;

new Vue({
  render: h => h( App ),
  store
}).$mount( '#app' );