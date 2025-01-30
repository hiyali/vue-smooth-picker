import { App } from 'vue'
import SmoothPicker from './components/SmoothPicker.vue'

const version = "1.0.1"
export { SmoothPicker, version }

export default {
    install: (app: App) => {
        app.component(SmoothPicker.name!, SmoothPicker)
    }
} 