import Example from './example'
import Vue from 'vue'

import SmoothPicker from 'smooth-picker'
Vue.use(SmoothPicker)

new Vue(
  Object.assign({}, Example, { // app body
    el: '#app'
  })
)
