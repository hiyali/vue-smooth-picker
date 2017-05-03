# vue-smooth-picker  <sup>[![Version Badge](http://versionbadg.es/hiyali/vue-smooth-picker.svg)](https://npmjs.com/package/vue-smooth-picker)</sup>
🏄🏼 A SmoothPicker for Vue 2

[![npm package](https://img.shields.io/npm/v/vue-smooth-picker.svg)](https://npmjs.com/package/vue-smooth-picker)
[![travis build](https://img.shields.io/travis/hiyali/vue-smooth-picker/master.svg)](https://travis-ci.org/hiyali/vue-smooth-picker)
[![NPM downloads](http://img.shields.io/npm/dm/vue-smooth-picker.svg)](https://npmjs.org/package/vue-smooth-picker)
![JS gzip size](http://img.badgesize.io/hiyali/vue-smooth-picker/master/dist/smooth-picker.js.svg?compression=gzip&label=gzip%20size:%20JS)
![CSS gzip size](http://img.badgesize.io/hiyali/vue-smooth-picker/master/dist/css/style.css.svg?compression=gzip&label=gzip%20size:%20CSS)
[![CircleCI Status](https://circleci.com/gh/hiyali/vue-smooth-picker.svg?style=shield)](https://circleci.com/gh/hiyali/vue-smooth-picker)

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
    <button class="button" type="button" @click="confirm">Confirm</button>
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
              'Plan A - free', 'Plan B - $50', 'Plan C - $100'
            ],
            onClick: this.clickOnPlan,
            textAlign: 'center',
            className: 'row-group'
          },
          {
            divider: true,
            flex: 1,
            text: 'product',
            textAlign: 'center',
            className: 'divider'
          },
          {
            currentIndex: 2,
            flex: 3,
            list: [
              '1 * A item', '2 * A items', '3 * A items', '4 * A items', '5 * A items'
            ],
            onClick: this.clickOnProduct,
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
          switch (iIndex) {
            case 2:
              list = ['C item 1', 'C item 2', 'C item 3', 'C item 4', 'C item 5', 'C item 6', 'C item 7', 'C item 8', 'C item 9']
              currentIndex = 4
              break
            case 1:
              list = ['1 * B item', '2 * B items', '3 * B items', '4 * B items', '5 * B items', '6 * B items', '7 * B items']
              currentIndex = 3
              break
            default:
              list = ['1 * A item', '2 * A items', '3 * A items', '4 * A items', '5 * A items']
              currentIndex = 2
          }
          this.$refs.smoothPicker.setGroupData(2, Object.assign({}, this.data[2], { currentIndex, list }))
        }
      },
      clickOnPlan (gIndex, iIndex) {
        window.alert('Clicked plan: ' + this.data[gIndex].list[iIndex])
      },
      clickOnProduct (gIndex, iIndex) {
        window.alert('Clicked product: ' + this.data[gIndex].list[iIndex])
      },
      confirm () {
        const ciList = this.$refs.smoothPicker.getCurrentIndexList()
        const planDetail = this.data[0].list[ciList[0]]
        const productDetail = this.data[2].list[ciList[2]]
        window.alert(
          'Confirmed index list: ' + ciList + '.\n' +
          'Confirmed plan: ' + planDetail + '.\n' +
          'Confirmed product: ' + productDetail
        )
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

## Donate
🌚 [A github star ⍟](https://github.com/hiyali/vue-smooth-picker)
