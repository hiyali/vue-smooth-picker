import { App } from 'vue'
import SmoothPicker from './components/SmoothPicker.vue'

const version = "1.0.0-beta.6"
export { SmoothPicker, version }

export default {
    install: (app: App) => {
        app.component('smooth-picker', SmoothPicker)
    }
} 