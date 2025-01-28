import { createApp } from 'vue'
import App from './App.vue'
import SmoothPicker from './components/SmoothPicker.vue'

const app = createApp(App)
app.component('SmoothPicker', SmoothPicker)
app.mount('#app') 