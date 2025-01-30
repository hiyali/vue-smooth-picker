# vue-smooth-picker

🏄🏼 A smooth picker component for Vue 3.

[![NPM downloads](http://img.shields.io/npm/dt/vue-smooth-picker.svg)](https://npmjs.org/package/vue-smooth-picker)
![JS gzip size](http://img.badgesize.io/hiyali/vue-smooth-picker/refs/heads/gh-pages/dist/vue-smooth-picker.js.svg?compression=gzip&label=gzip:%20JS)
![CSS gzip size](http://img.badgesize.io/hiyali/vue-smooth-picker/refs/heads/gh-pages/dist/style.css.svg?compression=gzip&label=gzip:%20CSS)

[![NPM Description](https://nodei.co/npm/vue-smooth-picker.png?downloads=true&stars=true)](https://npmjs.org/package/vue-smooth-picker)

> Let's simplify selecting data on the touchscreen device, such as time, city, gender, seat number, product, etc.

## Features
- 🎯 Vue 3 Support
- 💪 TypeScript Support
- 🎨 Customizable styles
- 📱 Touch-friendly
- 🔄 Smooth animations

## Installation

```bash
npm i -S vue-smooth-picker@next
```

### Examples

| Demo | Star | Code |
| --- | --- | --- |
| [Product](https://hiyali.github.io/vue-smooth-picker/pages/example/product/) | ⭐⭐⭐ | [Link](https://github.com/hiyali/vue-smooth-picker/tree/gh-pages/example/product) |
| [Datetime](https://hiyali.github.io/vue-smooth-picker/pages/example/datetime/) | ⭐⭐ | [Link](https://github.com/hiyali/vue-smooth-picker/tree/gh-pages/example/datetime) |
| [Gender](https://hiyali.github.io/vue-smooth-picker/pages/example/gender/) | ⭐ | [Link](https://github.com/hiyali/vue-smooth-picker/tree/gh-pages/example/product) |


![Screen shot](https://raw.githubusercontent.com/hiyali/vue-smooth-picker/gh-pages/assets/smooth-picker-screenshot.png "screenshot")
![Screen record](https://raw.githubusercontent.com/hiyali/vue-smooth-picker/gh-pages/assets/smooth-picker-screen-record.gif "screen record")

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
```

### Data Structure

```typescript
interface Props {
  data: PickerGroup[]
  onChange?: (groupIndex: number, itemIndex: number) => void
}

interface PickerGroup {
  list?: PickerItem[]
  divider?: boolean
  text?: string
  flex?: number
  className?: string
  textAlign?: string
  currentIndex?: number
  onClick?: (groupIndex: number, itemIndex: number) => void
}

interface PickerItem {
  value: string | number
  [key: string]: any
}
```

## Instance Methods

| Name | Type | Description |
|------|------|-------------|
| setGroupData | (groupIndex: number, groupData: PickerGroup) => void | Dynamically set a group's data |
| getCurrentIndexList | () => number[] | Get current index list of all groups |
| getGroupsRectList | () => void | Update groups rect list, call this when component visibility changes |


## V2 version (Deprecated / No longer maintained)

> Looking for Vue 2 version? Check out [vue-smooth-picker for Vue 2](https://github.com/hiyali/vue-smooth-picker/tree/master)

## License

MIT

