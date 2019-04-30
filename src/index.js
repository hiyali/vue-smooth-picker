import SmoothPicker from './smooth-picker'

const install = function (Vue) {
  if (install.installed) return

  Vue.component(SmoothPicker.name, SmoothPicker)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const version = '0.4.0'
export {
  install as default,
  version,
  SmoothPicker
}
