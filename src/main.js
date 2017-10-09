import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import VueClipboard from 'vue-clipboard2'

Vue.use(Vuetify) 
Vue.use(VueClipboard)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

import('../node_modules/vuetify/dist/vuetify.min.css')