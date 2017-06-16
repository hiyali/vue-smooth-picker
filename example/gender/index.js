import Vue from 'vue'

import SmoothPicker from '../../dist/smooth-picker.js'
import '../../dist/css/style.css'
Vue.use(SmoothPicker)

import Example from './index.vue'
new Vue(
  Object.assign({}, Example, {
    el: '#app'
  })
)
