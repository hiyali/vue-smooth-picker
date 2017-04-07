# vue-smooth-picker
🏄🏼 A SmoothPicker for Vue 2

[![npm package](https://img.shields.io/npm/v/vue-smooth-picker.svg)](https://www.npmjs.com/package/vue-smooth-picker) [![travis build](https://img.shields.io/travis/hiyali/vue-smooth-picker/master.svg)](https://travis-ci.org/hiyali/vue-smooth-picker) [![CircleCI Status](https://circleci.com/gh/hiyali/vue-smooth-picker.svg?style=shield)](https://circleci.com/gh/hiyali/vue-smooth-picker)

## Take a look

[Live demo](https://hiyali.github.io/vue-smooth-picker)

### Screenshot

![screenshot](https://raw.githubusercontent.com/hiyali/vue-smooth-picker/master/assets/smooth-picker-screenshot.png "screenshot")

## Install

```shell
npm i -S vue-smooth-picker
```

## Usage

```javascript
// import and use
import 'vue-smooth-picker/dist/css/style.css'
import SmoothPicker from 'vue-smooth-picker'
Vue.use(SmoothPicker)
...
// in your template
<smooth-picker ref="smoothPicker" :data="data" :change="change" />
```

#### Quick start
```javascript
<template>
  <div class="example-page">
    <smooth-picker ref="smoothPicker" :data="data" :change="dataChange" />
  </div>
</template>

<script>
  import 'vue-smooth-picker/dist/css/style.css'
  import { SmoothPicker } from 'vue-smooth-picker'

  export default {
    name: 'example-page',
    components: {
      SmoothPicker
    },
    data () {
      return {
        data: [
          {
            currentIndex: 0,
            flex: 3,
            list: [
              'AA', 'BB', 'CC'
            ],
            onClick: this.clickRow,
            textAlign: 'center',
            className: 'row-group'
          },
          {
            divider: true,
            flex: 1,
            text: 'row',
            textAlign: 'center',
            className: 'divider'
          },
          {
            currentIndex: 5,
            flex: 3,
            list: [
              '1', '2', '3', '4', '5', '6', '7', '8'
            ],
            onClick: this.clickItem,
            textAlign: 'center',
            className: 'item-group'
          }
        ]
      }
    },
    methods: {
      dataChange (gIndex, iIndex) {
        console.info('list', gIndex, iIndex)
        if (gIndex === 0) {
          let currentIndex = 0
          let list = []
          if (this.data[gIndex].list[iIndex] === 'BB') {
            list = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
            currentIndex = 4
          } else {
            list = ['10', '11', '12', '13', '14']
            currentIndex = 2
          }
          this.$refs.smoothPicker.setGroupData(2, Object.assign({}, this.data[2], { currentIndex, list }))
        }
      },
      clickRow (gIndex, iIndex) {
        console.info('row', gIndex, iIndex)
      },
      clickItem (gIndex, iIndex) {
        console.info('item', gIndex, iIndex)
      }
    }
  }
</script>
```

Or see: [example.vue](https://github.com/hiyali/vue-smooth-picker/blob/master/example/example.vue)

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

## For customization

```shell
npm run dev # development
npm run build # build
npm run example # develop example files
```
