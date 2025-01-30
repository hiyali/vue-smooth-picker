# vue-smooth-picker

A smooth picker component for Vue 3.

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

## Usage

```vue
<template>
  <smooth-picker
    :data="pickerData"
    @onChange="handleChange"
  />
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

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| data | Array | [] | Picker data array |
| onChange | Function | () => {} | Change callback |

### Data Structure

```typescript
interface PickerItem {
  value: string | number
  [key: string]: any
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

interface Props {
  data: PickerGroup[]
  onChange?: (groupIndex: number, itemIndex: number) => void
}
```

## Instance Methods

| Name | Type | Description |
|------|------|-------------|
| setGroupData | (groupIndex: number, groupData: PickerGroup) => void | Dynamically set a group's data |
| getCurrentIndexList | () => number[] | Get current index list of all groups |
| getGroupsRectList | () => void | Update groups rect list, call this when component visibility changes |

### Example

```vue
<template>
  <smooth-picker ref="picker" :data="pickerData" @onChange="handleChange" />
</template>

<script setup>
import { ref, onMounted } from 'vue'

const picker = ref(null)
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

onMounted(() => {
  // Set data for first group
  picker.value?.setGroupData(0, {
    list: [{ value: '01' }, { value: '02' }],
    currentIndex: 0
  })

  // Get current selected indexes
  const indexes = picker.value?.getCurrentIndexList()
  console.log('Current indexes:', indexes)

  // Update rects after visibility change
  picker.value?.getGroupsRectList()
})
</script>
```

## Examples

### Time Picker
```vue
<template>
  <smooth-picker :data="timeData" @onChange="handleTimeChange" />
</template>

<script setup>
import { ref } from 'vue'

const timeData = ref([
  {
    list: Array.from({ length: 24 }, (_, i) => ({ value: i.toString().padStart(2, '0') })),
    currentIndex: 0
  },
  {
    divider: true,
    text: ':'
  },
  {
    list: Array.from({ length: 60 }, (_, i) => ({ value: i.toString().padStart(2, '0') })),
    currentIndex: 0
  }
])
</script>
```

## V2 version (Deprecated / No longer maintained)

> Looking for Vue 2 version? Check out [vue-smooth-picker for Vue 2](https://github.com/hiyali/vue-smooth-picker/tree/master)

### Demos
- [Product Picker](https://hiyali.github.io/vue-smooth-picker/example/product)
- [Datetime Picker](https://hiyali.github.io/vue-smooth-picker/example/datetime)
- [Gender Picker](https://hiyali.github.io/vue-smooth-picker/example/gender)

## License

MIT

