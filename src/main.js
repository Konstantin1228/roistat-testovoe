// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Fragment from 'vue-fragment'

import './styles/reset.css'
import './styles/style.css'
import clickOutside from './directives/click-outside'

Vue.config.productionTip = false
Vue.use(Fragment.Plugin)
Vue.use(clickOutside)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
})
