# vue-smooth-picker  <sup>[![Version Badge](http://versionbadg.es/hiyali/vue-smooth-picker.svg)](https://npmjs.com/package/vue-smooth-picker)</sup>
🏄🏼 A SmoothPicker for Vue 3

[![npm package](https://img.shields.io/npm/v/vue-smooth-picker.svg)](https://npmjs.com/package/vue-smooth-picker)
[![NPM downloads](http://img.shields.io/npm/dm/vue-smooth-picker.svg)](https://npmjs.org/package/vue-smooth-picker)
![JS gzip size](http://img.badgesize.io/hiyali/vue-smooth-picker/gh-pages/dist/vue-smooth-picker.js.svg?compression=gzip&label=gzip%20size:%20JS)
![CJS gzip size](http://img.badgesize.io/hiyali/vue-smooth-picker/gh-pages/dist/vue-smooth-picker.js.svg?compression=gzip&label=gzip%20size:%20CJS)
![CSS gzip size](http://img.badgesize.io/hiyali/vue-smooth-picker/gh-pages/dist/css/style.css.svg?compression=gzip&label=gzip%20size:%20CSS)

[![NPM Description](https://nodei.co/npm/vue-smooth-picker.png?downloads=true&stars=true)](https://npmjs.org/package/vue-smooth-picker)

> Let's simplify selecting data on the touchscreen device, such as time, city, gender, seat number, product, etc.

## Features
- 🎯 Vue 3 Support
- 💪 TypeScript Support
- 🎨 Customizable styles
- 📱 Touch-friendly
- 🔄 Smooth animations

## Take a look

Demo links:
[Product](https://hiyali.github.io/vue-smooth-picker/example/product)
| [Datetime](https://hiyali.github.io/vue-smooth-picker/example/datetime)
| [Gender](https://hiyali.github.io/vue-smooth-picker/example/gender)

## Installation

```bash
npm install vue-smooth-picker@next
```

## Usage

```vue
<template>
  <smooth-picker :data="pickerData" @onChange="handleChange" />
</template>

<script setup>
import { ref } from 'vue'
import { SmoothPicker } from 'vue-smooth-picker'
import 'vue-smooth-picker/style.css'

const pickerData = ref([
  {
    list: Array.from({ length: 24 }, (_, i) => ({ value: i.toString().padStart(2, '0') })),
    currentIndex: 0
  },
  {
    list: Array.from({ length: 60 }, (_, i) => ({ value: i.toString().padStart(2, '0') })),
    currentIndex: 0
  }
])

const handleChange = (groupIndex, itemIndex) => {
  console.log('Changed:', { groupIndex, itemIndex })
}
</script>

## props

| name                       | type       |  default      | explain                          |
| :------------------------- | :--------- | :------------ | :------------------------------- |
| `change`                   | `Function` | (gIndex, iIndex) => {} | Callback after data current index changed, pass two arguments, group index `gIndex` and item index `iIndex` |
| `data`                     | `Array`    | []            | SmoothPicker initial data        |
| `data[i].currentIndex`     | `Number`   | 0             | Current index of this group's list |
| `data[i].flex`             | `Number`   | 1             | Group weights in parent width `1..12` |
| `data[i].list`             | `Array`    | -             | List of the group                |
| `data[i].list[j]`          | `String` or `Object` | -   | Item in the list of group, use `value` key when it is a object item |
| `data[i].onClick`          | `Function` | -             | Click event on the middle layer of this group, pass two arguments, this group index `gIndex` and selected index `iIndex` of this group |
| `data[i].textAlign`        | `String`   | -             | `left` `center` or `right` in item block |
| `data[i].className`        | `String`   | -             | Your custom class name for this group |
| `data[i].divider`          | `Boolean`  | false         | If it is true, then `onClick` `list` `currentIndex` will be not used |
| `data[i].text`             | `String`   | -             | Just used when `divider` is true |

## Instance methods

| name                       | type       | explain                          |
| :------------------------- | :--------- | :------------------------------- |
| `setGroupData`             | `Function` | Dynamically set a group data with two arguments `(gIndex, gData)`, group index and group data (see props `data[i]`) |
| `getCurrentIndexList`      | `Function` | Return a `Array` of the groups current index list (has divider current index, and it is default to `0`) |

## Development

> {exampleName} : product | datetime | gender ...

```shell
npm run dev:{exampleName} # dev
npm run build {exampleName} # build
```

## Any problem?

> Please let me know.
* [Open a new issue for this repo](https://github.com/hiyali/vue-smooth-picker/issues)
* [Send an Email to: hiyali920@gmail.com](mailto:hiyali920@gmail.com)

## Like it?

[Send a github star ⍟](https://github.com/hiyali/vue-smooth-picker)

## License

MIT

