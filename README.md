# vue-smooth-picker    <sup>[![Version Badge](http://versionbadg.es/hiyali/vue-smooth-picker.svg)](https://npmjs.com/package/vue-smooth-picker)</sup>

🏄🏼 A smooth picker component for Vue 3.

[![NPM downloads](http://img.shields.io/npm/dt/vue-smooth-picker.svg)](https://npmjs.org/package/vue-smooth-picker)
![JS gzip size](http://img.badgesize.io/hiyali/vue-smooth-picker/refs/heads/gh-pages/dist/vue-smooth-picker.js.svg?compression=gzip&label=gzip:%20JS)
![CSS gzip size](http://img.badgesize.io/hiyali/vue-smooth-picker/refs/heads/gh-pages/dist/style.css.svg?compression=gzip&label=gzip:%20CSS)

[![NPM Description](https://nodei.co/npm/vue-smooth-picker.png?downloads=true&stars=true)](https://npmjs.org/package/vue-smooth-picker)

> Let's simplify selecting data on the touchscreen device, such as time, city, gender, seat number, product, etc.

![Screen shot](https://raw.githubusercontent.com/hiyali/vue-smooth-picker/gh-pages/assets/smooth-picker-screenshot.png "screenshot")
![Screen record](https://raw.githubusercontent.com/hiyali/vue-smooth-picker/gh-pages/assets/smooth-picker-screen-record.gif "screen record")


## Usage

### Install

```bash
npm i -S vue-smooth-picker
```

### Quick look

```typescript
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

### Demo

| Name           | Complexity      | Code      |
| -------------- | --------------- | --------- |
| [Product](https://hiyali.github.io/vue-smooth-picker/pages/example/product/) | ⭐⭐⭐ | [Link](https://github.com/hiyali/vue-smooth-picker/tree/gh-pages/example/product) |
| [Datetime](https://hiyali.github.io/vue-smooth-picker/pages/example/datetime/) | ⭐⭐ | [Link](https://github.com/hiyali/vue-smooth-picker/tree/gh-pages/example/datetime) |
| [Gender](https://hiyali.github.io/vue-smooth-picker/pages/example/gender/) | ⭐ | [Link](https://github.com/hiyali/vue-smooth-picker/tree/gh-pages/example/product) |


### Data Structure

```typescript
interface Props {
  data: PickerGroup[]
  onChange?: (groupIndex: number, itemIndex: number) => void
}

interface PickerGroup {
  list?: PickerItem[] // List of items in this group
  divider?: boolean // Indicates if this is a divider, default is false
  text?: string // Text used when divider is true
  flex?: number // Weight of the group in the parent container, range from 1 to 12
  className?: string // Custom class name
  textAlign?: string // Text alignment for items, can be 'left', 'center', or 'right'
  currentIndex?: number // Current index of the selected item, default is 0
  onClick?: (groupIndex: number, itemIndex: number) => void // Click event handler
}

interface PickerItem {
  value: string | number // The value of the item, can be a string or a number
  [key: string]: any // Other optional properties
}
```

### Instance Methods

| Name       | Type       | Description        |
| ---------- | ---------- | ------------------ |
| `setGroupData`             | `(groupIndex: number, groupData: PickerGroup) => void` | Dynamically updates the data for a specific group, allowing for real-time changes to the picker. |
| `getCurrentIndexList`      | `() => number[]`                                      | Returns an array of the current index for each group, reflecting the selected items.           |
| `getGroupsRectList`        | `() => void`                                          | Updates the dimensions of the groups, which is useful for gesture handling. Call this method when the component's visibility changes. |

## Features
- 🎯 Vue 3 Support
- 💪 TypeScript Support
- 🎨 Customizable styles
- 📱 Touch-friendly
- 🔄 Smooth animations

## Vue 2 version (No longer maintained)

> Looking for Vue 2 version? Check out [vue-smooth-picker for Vue 2](https://github.com/hiyali/vue-smooth-picker/tree/vue2)

## License

MIT

