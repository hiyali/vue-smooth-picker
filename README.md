# vue-smooth-picker  <sup>[![Version Badge](http://versionbadg.es/hiyali/vue-smooth-picker.svg)](https://npmjs.com/package/vue-smooth-picker)</sup>
🏄🏼 A SmoothPicker for Vue 2

[![travis build](https://img.shields.io/travis/hiyali/vue-smooth-picker/master.svg)](https://travis-ci.org/hiyali/vue-smooth-picker)
[![NPM downloads](http://img.shields.io/npm/dt/vue-smooth-picker.svg)](https://npmjs.org/package/vue-smooth-picker)
![JS gzip size](http://img.badgesize.io/hiyali/vue-smooth-picker/gh-pages/dist/smooth-picker.js.svg?compression=gzip&label=gzip:%20JS)
![CSS gzip size](http://img.badgesize.io/hiyali/vue-smooth-picker/gh-pages/dist/css/style.css.svg?compression=gzip&label=gzip:%20CSS)

[![NPM Description](https://nodei.co/npm/vue-smooth-picker.png?downloads=true&stars=true)](https://npmjs.org/package/vue-smooth-picker)

> Let's more easily select some data on the touch screen device, such as time / city / gender / seat number / product / ...

## Take a look

Demo links:
[Product](https://hiyali.github.io/vue-smooth-picker/example/product)
| [Datetime](https://hiyali.github.io/vue-smooth-picker/example/datetime)
| [Gender](https://hiyali.github.io/vue-smooth-picker/example/gender)

Demo code links:
[Product](https://github.com/hiyali/vue-smooth-picker/tree/gh-pages/example/product)
| [Datetime](https://github.com/hiyali/vue-smooth-picker/tree/gh-pages/example/datetime)
| [Gender](https://github.com/hiyali/vue-smooth-picker/tree/gh-pages/example/gender)

![Screen shot](https://raw.githubusercontent.com/hiyali/vue-smooth-picker/gh-pages/assets/smooth-picker-screenshot.png "screenshot")

![Screen record](https://raw.githubusercontent.com/hiyali/vue-smooth-picker/gh-pages/assets/smooth-picker-screen-record.gif "screen record")

## Install

```shell
npm i -S vue-smooth-picker
```

## Usage

> [English usage docs](https://github.com/hiyali/vue-smooth-picker/wiki/Usage)

> [中文使用文档](https://github.com/hiyali/vue-smooth-picker/wiki/Usage_zh)

### Quick look

```javascript
// import and use
import 'vue-smooth-picker/dist/css/style.css'
import SmoothPicker from 'vue-smooth-picker'
Vue.use(SmoothPicker)
...
// in your template
<smooth-picker ref="smoothPicker" :data="data" :change="change" />
```
Or see: [example files](https://github.com/hiyali/vue-smooth-picker/blob/gh-pages/example/gender/)

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

| name                       | type               | explain                          |
| :------------------------- | :----------------- | :------------------------------- |
| `setGroupData`             | `Function` => void | Dynamically set a group data with two arguments `(gIndex, gData)`, group index and group data (see props `data[i]`) |
| `getCurrentIndexList`      | `Function` => []   | Return a `Array` of the groups current index list (has divider current index, and it is default to `0`) |
| `getGroupsRectList`        | `Function` => void | Get some info for gesture, you can call this function when the component displayed if the component is hidden when it's initialization |

## Development

```shell
npm run dev # development
npm run build # build
```

## Examples

> See branch gh-pages.

## Any problem?

> Please let me know.
* [Open a new issue for this repo](https://github.com/hiyali/vue-smooth-picker/issues)
* [Send a Email to: hiyali920@gmail.com](mailto:hiyali920@gmail.com)

## Donate

[![Become a sponser](https://opencollective.com/vue-smooth-picker/individuals.svg?width=890)](https://opencollective.com/vue-smooth-picker#support)

🌚 [A github star ⍟](https://github.com/hiyali/vue-smooth-picker)

## License

MIT

