# vue-smooth-picker
🏄🏼 A SmoothPicker for Vue 2

## Example

[Live demo](https://hiyali.github.io/vue-smooth-picker)

### Screenshot

![screenshot](https://raw.githubusercontent.com/hiyali/vue-smooth-picker/master/assets/smooth-picker-screenshot.png "screenshot")

## usage
```javascript
import './path-to-smooth-picker/dist/css/style.css'
import SmoothPicker from './path-to-smooth-picker/dist/smooth-picker.js'
Vue.use(SmoothPicker)
...
// in your template
<smooth-picker :data="data" :change="change" />
```

## props

| name           | type       |  default      | other value  |
| :------------- | :--------- | :------------ | :----------- |
| `data`         | `Array`    | []            |              |
| `change`       | `Function` | () => {}      | Callback after data current index changed |

## Development / build / exmaple
```shell
npm run dev # development
npm run build # build
npm run example # build example files
```
