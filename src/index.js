import SmoothPicker from './smooth-picker'

const installComponent = (Vue) => {
  Vue.component(SmoothPicker.name, SmoothPicker)
}

if (typeof window !== 'undefined' && window.Vue) {
  installComponent(window.Vue)
}

const version = '0.0.1'
export {
  installComponent as default,
  version,
  SmoothPicker
}
