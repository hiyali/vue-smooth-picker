# vue-smooth-picker  <sup>[![Version Badge](http://versionbadg.es/hiyali/vue-smooth-picker.svg)](https://npmjs.com/package/vue-smooth-picker)</sup>
🏄🏼 A VueSmoothPicker for Vue 2 & 3

[![travis build](https://img.shields.io/travis/hiyali/vue-smooth-picker/master.svg)](https://travis-ci.org/hiyali/vue-smooth-picker)
[![NPM downloads](http://img.shields.io/npm/dt/vue-smooth-picker.svg)](https://npmjs.org/package/vue-smooth-picker)
![JS gzip size](http://img.badgesize.io/hiyali/vue-smooth-picker/gh-pages/dist/smooth-picker.js.svg?compression=gzip&label=gzip:%20JS)
![CSS gzip size](http://img.badgesize.io/hiyali/vue-smooth-picker/gh-pages/dist/css/style.css.svg?compression=gzip&label=gzip:%20CSS)

[![NPM Description](https://nodei.co/npm/vue-smooth-picker.png?downloads=true&stars=true)](https://npmjs.org/package/vue-smooth-picker)

> Let's more easily select specific data on the touch screen devices, let's go!

## Take a look

![Screen shot](https://raw.githubusercontent.com/hiyali/vue-smooth-picker/gh-pages/assets/smooth-picker-screenshot.png "screenshot")

![Screen record](https://raw.githubusercontent.com/hiyali/vue-smooth-picker/gh-pages/assets/smooth-picker-screen-record.gif "screen record")

## Install

```shell
npm i -S vue-smooth-picker@^0.4.0  # for Vue 2

npm i -S vue-smooth-picker@^1.0.0-alpha  # for Vue 3
```

## Usage

> [English usage docs](https://github.com/hiyali/vue-smooth-picker/wiki/Usage_3)

> [中文使用文档](https://github.com/hiyali/vue-smooth-picker/wiki/Usage_zh_3)

### Quick look

```javascript
// import and use
import 'vue-smooth-picker/dist/css/style.css'
import VueSmoothPicker from 'vue-smooth-picker'
// app is your application instance created by `createApp`
app.use(VueSmoothPicker)
...
// in your template
<VueSmoothPicker ref="smoothPicker" :data="data" @change="change" />
```
Or see: [example files](https://github.com/hiyali/vue-smooth-picker/blob/gh-pages/example/gender/)

## props

| name                       | type       |  default      | explain                          |
| :------------------------- | :--------- | :------------ | :------------------------------- |
| `change`                   | `Function` | ({ gIndex, iIndex }) => {} | Callback after data current index changed, pass one object, which has two keys, group index `gIndex` and item index `iIndex` |
| `data`                     | `Array`    | []            | VueSmoothPicker initial data        |
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

| name                       | type               | explain                          |
| :------------------------- | :----------------- | :------------------------------- |
| `setGroupData`             | `Function` => void | Dynamically set a group data with two arguments `(gIndex, gData)`, group index and group data (see props `data[i]`) |
| `getCurrentIndexList`      | `Function` => []   | Return a `Array` of the groups current index list (has divider current index, and it is default to `0`) |
| `getGroupsRectList`        | `Function` => void | Get some info for gesture, you can call this function when the component displayed if the component is hidden when it's initialization |

## Any problem?

> Please let me know.
* [Open a new issue for this repo](https://github.com/hiyali/vue-smooth-picker/issues)
* [Send a Email to: hiyali920@gmail.com](mailto:hiyali920@gmail.com)

## Donate

[![Become a sponser](https://opencollective.com/vue-smooth-picker/individuals.svg?width=890)](https://opencollective.com/vue-smooth-picker#support)

🌚 [A github star ⍟](https://github.com/hiyali/vue-smooth-picker)

## License

MIT

