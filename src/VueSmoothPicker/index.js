import VueSmoothPicker from './main'

const VueSmoothPickerPlugin = {
  install(app, options) {
    if (!options) {
      options = {}
    }
    app.component('VueSmoothPicker', VueSmoothPicker)
  },
}

export default VueSmoothPickerPlugin
