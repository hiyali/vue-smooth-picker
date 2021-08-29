import { createApp } from 'vue'

import App from './App.vue'
import VueSmoothPicker from './VueSmoothPicker'

const app = createApp(App)
app.use(VueSmoothPicker)
app.mount('#app')
