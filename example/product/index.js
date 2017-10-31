import Vue from 'vue'

import SmoothPicker from 'vue-smooth-picker'
import 'vue-smooth-picker/dist/css/style.css'
Vue.use(SmoothPicker)

import Example from './index.vue'
new Vue(
  Object.assign({}, Example, {
    el: '#app'
  })
)
