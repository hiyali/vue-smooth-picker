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
<smooth-picker ref="smoothPicker" :data="data" :change="change" />
```

[Example code](https://github.com/hiyali/vue-smooth-picker/blob/master/example/example.vue)

## props

| name                       | type       |  default      | explain                          |
| :------------------------- | :--------- | :------------ | :------------------------------- |
| `data`                     | `Array`    | []            | Data for user select             |
| `data[i].currentIndex`     | `Number`   | 0             | Current index of this group      |
| `data[i].flex`             | `Number`   | 1             | Group weights in parent width    |
| `data[i].list`             | `Array`    | -             | List of the group                |
| `data[i].list[j]`          | `String` or `Object` | -   | Item in the list of group, { ... value: 'A' ... } when it is a object item |
| `data[i].onClick`          | `Function` | -             | Click event on the middle layer of this group |
| `data[i].textAlign`        | `String`   | -             | `left` `center` or `right` in item block |
| `data[i].className`        | `String`   | -             | Your custom class name for this group |
| `data[i].divider`          | `Boolean`  | false         | If it is true, then `onClick` `list` `currentIndex` will be not used |
| `data[i].text`             | `String`   | -             | Just used when `divider` is true |
| `change`                   | `Function` | (gIndex, iIndex) => {} | Callback after data current index changed, pass two arguments, group index `gIndex` and item index `iIndex` |

## instance methods

| name                       | type       | explain                          |
| :------------------------- | :--------- | :------------------------------- |
| `setGroupData`             | `Function` | Could use this method dynamically set a group data |

```javascript
let currentIndex = 0, list = ['Some values', '..']
this.$refs.smoothPicker.setGroupData(2, { currentIndex, list })
```

## Development / build / exmaple

```shell
npm run dev # development
npm run build # build
npm run example # build example files
```
