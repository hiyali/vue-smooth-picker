import { createApp } from 'vue'
import { SmoothPicker, version } from 'vue-smooth-picker'  // import in app level & custom name version
import 'vue-smooth-picker/style.css'

import App from './App.vue'

console.warn('component name', SmoothPicker.name)
console.warn('component tag name', SmoothPicker.tag)
console.warn('vue-smooth-picker version', version)

createApp(App).component(SmoothPicker.name, SmoothPicker).mount('#app') 