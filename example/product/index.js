import Vue from 'vue'

import SmoothPicker from 'vue-smooth-picker'
Vue.use(SmoothPicker)

import Example from './index.vue'
new Vue(
  Object.assign({}, Example, {
    el: '#app'
  })
)
