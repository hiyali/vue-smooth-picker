import { App } from 'vue'
import SmoothPicker from './components/SmoothPicker.vue'

export { SmoothPicker }

export default {
    install: (app: App) => {
        app.component('SmoothPicker', SmoothPicker)
    }
} 