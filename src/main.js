// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Vuex from "vuex"

Vue.use(Vuex)

import 'lib-flexible'

const store = new Vuex.Store({
	 state: {
	    selectFoods: []
	 },
	 mutations: {
	    selectFoods (state,selectFoods) {
	    	console.log(selectFoods)
	        state.selectFoods=selectFoods;
	    }
	 }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
