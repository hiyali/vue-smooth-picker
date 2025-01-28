<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

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

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  onChange: () => { }
})

const emit = defineEmits<{
  (e: 'onChange', groupIndex: number, itemIndex: number): void
}>()

const currentIndexList = ref(props.data.map(group => {
  const iCI = group.currentIndex
  if (typeof iCI === 'number' && iCI >= 0 && group.list?.length && iCI <= group.list.length - 1) {
    return Math.round(iCI)
  }
  return 0
}))

const lastCurrentIndexList = ref([...currentIndexList.value])

const dragInfo = ref({
  isTouchable: 'ontouchstart' in window,
  isMouseDown: false,
  isDragging: false,
  groupIndex: null as number | null,
  startPageY: null as number | null
})

const groupsRectList = ref<DOMRect[]>([])
const smoothGroup = ref<HTMLElement[]>([])
const smoothHandleLayer = ref<HTMLElement>()

const lastStyleDisplay = ref<string | null>(null)
const watchDomObserver = ref<MutationObserver | null>(null)

// 获取组件尺寸信息
const getGroupsRectList = () => {
  if (smoothGroup.value) {
    groupsRectList.value = smoothGroup.value.map(el => el.getBoundingClientRect())
  }
}

// 事件处理函数
const handleStart = (ev: MouseEvent | TouchEvent) => {
  if (ev.cancelable) {
    ev.preventDefault()
    ev.stopPropagation()
  }

  const touchInfo = dragInfo.value.isTouchable ? (ev as TouchEvent).touches[0] : ev as MouseEvent
  dragInfo.value.startPageY = touchInfo.pageY
  if (!dragInfo.value.isTouchable) {
    dragInfo.value.isMouseDown = true
  }
}

const handleMove = (ev: MouseEvent | TouchEvent) => {
  if (ev.cancelable) {
    ev.preventDefault()
    ev.stopPropagation()
  }

  if (dragInfo.value.isTouchable || dragInfo.value.isMouseDown) {
    dragInfo.value.isDragging = true
    const touchInfo = getTouchInfo(ev)

    if (dragInfo.value.groupIndex === null) {
      dragInfo.value.groupIndex = getGroupIndexBelongsEvent(ev)
    }

    const gIndex = dragInfo.value.groupIndex
    if (typeof gIndex === 'number' && (props.data[gIndex].divider || !props.data[gIndex].list)) {
      return
    }

    const moveCount = (dragInfo.value.startPageY - touchInfo.pageY) / 32
    const movedIndex = currentIndexList.value[gIndex] + moveCount
    currentIndexList.value[gIndex] = movedIndex

    dragInfo.value.startPageY = touchInfo.pageY
  }
}

const handleEnd = (ev: MouseEvent | TouchEvent) => {
  if (ev.cancelable) {
    ev.preventDefault()
    ev.stopPropagation()
  }

  if (!dragInfo.value.isDragging) {
    handleClick(ev)
  }

  dragInfo.value.isDragging = false
  dragInfo.value.isMouseDown = false
  correctionAfterDragging()
}

const handleCancel = handleEnd

const handleClick = (ev: MouseEvent | TouchEvent) => {
  const gIndex = getGroupIndexBelongsEvent(ev)
  const target = ev.target as HTMLElement

  switch (target.dataset.type) {
    case 'top':
      triggerAboveLayerClick(ev, gIndex)
      break
    case 'middle':
      triggerMiddleLayerClick(ev, gIndex)
      break
    case 'bottom':
      triggerBelowLayerClick(ev, gIndex)
      break
  }
}

const getTouchInfo = (ev: MouseEvent | TouchEvent) => {
  return dragInfo.value.isTouchable ? (ev as TouchEvent).changedTouches[0] || (ev as TouchEvent).touches[0] : ev
}

const getGroupIndexBelongsEvent = (ev: MouseEvent | TouchEvent) => {
  const touchInfo = getTouchInfo(ev)

  for (let i = 0; i < groupsRectList.value.length; i++) {
    const rect = groupsRectList.value[i]
    if (rect.left < touchInfo.pageX && touchInfo.pageX < rect.right) {
      return i
    }
  }
  return null
}

const correctionAfterDragging = () => {
  const gIndex = dragInfo.value.groupIndex
  if (typeof gIndex === 'number' && props.data[gIndex].divider !== true && props.data[gIndex].list.length > 0) {
    const unsafeGroupIndex = currentIndexList.value[gIndex]

    let movedIndex = unsafeGroupIndex
    if (unsafeGroupIndex > props.data[gIndex].list.length - 1) {
      movedIndex = props.data[gIndex].list.length - 1
    } else if (unsafeGroupIndex < 0) {
      movedIndex = 0
    }
    movedIndex = Math.round(movedIndex)

    currentIndexList.value[gIndex] = movedIndex
    if (movedIndex !== lastCurrentIndexList.value[gIndex]) {
      emit('onChange', gIndex, movedIndex)
    }
    lastCurrentIndexList.value = [...currentIndexList.value]
  }
  dragInfo.value.groupIndex = null
  dragInfo.value.startPageY = null
}

const getItemStyle = (gIndex: number, iIndex: number) => {
  const gapCount = currentIndexList.value[gIndex] - iIndex
  if (Math.abs(gapCount) < 4) {
    let rotateStyle = `transform: rotateX(${gapCount * 23}deg) translate3d(0, 0, 5.625em);`
    if (!dragInfo.value.isDragging) {
      rotateStyle += ' transition: transform 150ms ease-out;'
    }
    return rotateStyle
  }
  return gapCount > 0
    ? 'transform: rotateX(90deg) translate3d(0, 0, 5.625em)'
    : 'transform: rotateX(-90deg) translate3d(0, 0, 5.625em)'
}

const getGroupClass = (gIndex: number) => {
  const group = props.data[gIndex]
  const defaultFlexClass = 'flex-' + (group.flex || 1)
  const groupClass = [defaultFlexClass]
  if (group.className) {
    groupClass.push(group.className)
  }
  return groupClass
}

const getItemClass = (gIndex: number, iIndex: number, isDevider = false) => {
  const itemClass = []
  const group = props.data[gIndex]
  if (group.textAlign) {
    itemClass.push('text-' + group.textAlign)
  }
  if (!isDevider && currentIndexList.value[gIndex] === iIndex) {
    itemClass.push('smooth-item-selected')
  }
  return itemClass
}

const triggerMiddleLayerGroupClick = (gIndex: number) => {
  const data = props.data
  if (typeof gIndex === 'number' && typeof data[gIndex].onClick === 'function') {
    data[gIndex].onClick(gIndex, currentIndexList.value[gIndex])
  }
}

const triggerAboveLayerClick = (ev: MouseEvent | TouchEvent, gIndex: number) => {
  const movedIndex = currentIndexList.value[gIndex] + 1
  currentIndexList.value[gIndex] = movedIndex
  correctionCurrentIndex(ev, gIndex)
}

const triggerMiddleLayerClick = (ev: MouseEvent | TouchEvent, gIndex: number) => {
  triggerMiddleLayerGroupClick(gIndex)
}

const triggerBelowLayerClick = (ev: MouseEvent | TouchEvent, gIndex: number) => {
  const movedIndex = currentIndexList.value[gIndex] - 1
  currentIndexList.value[gIndex] = movedIndex
  correctionCurrentIndex(ev, gIndex)
}

const correctionCurrentIndex = (ev: MouseEvent | TouchEvent, gIndex: number) => {
  setTimeout(() => {
    if (typeof gIndex === 'number' && props.data[gIndex].divider !== true && props.data[gIndex].list.length > 0) {
      const unsafeGroupIndex = currentIndexList.value[gIndex]

      let movedIndex = unsafeGroupIndex
      if (unsafeGroupIndex > props.data[gIndex].list.length - 1) {
        movedIndex = props.data[gIndex].list.length - 1
      } else if (unsafeGroupIndex < 0) {
        movedIndex = 0
      }
      movedIndex = Math.round(movedIndex)

      currentIndexList.value[gIndex] = movedIndex
      if (movedIndex !== lastCurrentIndexList.value[gIndex]) {
        emit('onChange', gIndex, movedIndex)
      }
      lastCurrentIndexList.value = [...currentIndexList.value]
    }
  }, 100)
}

const setGroupData = (gIndex: number, groupData: PickerGroup) => {
  // for current index list
  const iCI = groupData.currentIndex
  let movedIndex = 0
  if (typeof iCI === 'number' && iCI >= 0 && groupData.list && groupData.list.length && iCI <= groupData.list.length - 1) {
    movedIndex = Math.round(iCI)
  }
  currentIndexList.value[gIndex] = movedIndex
  lastCurrentIndexList.value = [...currentIndexList.value]

  // for detect group flex if changed
  const gF = groupData.flex
  if (gF && props.data[gIndex].flex !== gF) {
    safeGetGroupRectList()
  }

  // set group data
  props.data[gIndex] = groupData
}

const safeGetGroupRectList = () => {
  if (getRectTimeoutId.value !== null) {
    clearTimeout(getRectTimeoutId.value)
  }
  getRectTimeoutId.value = setTimeout(() => {
    getGroupsRectList()
  }, 200)
}

const getRectTimeoutId = ref<number | null>(null)

const createDomObserver = () => {
  return new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes') {
        // for get correct rect list after v-show true (when $el style display not none)
        const el = mutation.target as HTMLElement
        const elDisplay = el.style.display
        if (elDisplay !== 'none' && lastStyleDisplay.value !== elDisplay) {
          lastStyleDisplay.value = elDisplay
          nextTick(getGroupsRectList)
        }
      }
    })
  })
}

const getCurrentIndexList = () => {
  return currentIndexList.value
}

// 生命周期钩子
onMounted(() => {
  getGroupsRectList()
  nextTick(getGroupsRectList)
  watchDomObserver.value = createDomObserver()
  watchDomObserver.value.observe(smoothHandleLayer.value as HTMLElement, { attributes: true })
  window.addEventListener('resize', getGroupsRectList)

  if (smoothHandleLayer.value) {
    const events = dragInfo.value.isTouchable
      ? {
        touchstart: handleStart,
        touchmove: handleMove,
        touchend: handleEnd,
        touchcancel: handleCancel
      }
      : {
        mousedown: handleStart,
        mousemove: handleMove,
        mouseup: handleEnd,
        mouseleave: handleCancel
      }

    Object.entries(events).forEach(([event, handler]) => {
      smoothHandleLayer.value?.addEventListener(event, handler)
    })
  }
})

onBeforeUnmount(() => {
  if (getRectTimeoutId.value !== null) {
    clearTimeout(getRectTimeoutId.value)
  }
  if (watchDomObserver.value) {
    watchDomObserver.value.disconnect()
  }
  window.removeEventListener('resize', getGroupsRectList)

  if (smoothHandleLayer.value) {
    const events = dragInfo.value.isTouchable
      ? {
        touchstart: handleStart,
        touchmove: handleMove,
        touchend: handleEnd,
        touchcancel: handleCancel
      }
      : {
        mousedown: handleStart,
        mousemove: handleMove,
        mouseup: handleEnd,
        mouseleave: handleCancel
      }

    Object.entries(events).forEach(([event, handler]) => {
      smoothHandleLayer.value?.removeEventListener(event, handler)
    })
  }
})
</script>

<template>
  <div class="smooth-picker flex-box">
    <div ref="smoothGroup" v-for="(group, gIndex) in data" :key="gIndex" class="smooth-group"
      :class="getGroupClass(gIndex)">
      <div class="smooth-list">
        <div v-if="group.divider" class="smooth-item divider" :class="getItemClass(gIndex, 0, true)">{{
          group.text }}</div>
        <div v-else v-for="(item, iIndex) in group.list" :key="iIndex" class="smooth-item"
          :class="getItemClass(gIndex, iIndex)" :style="getItemStyle(gIndex, iIndex)">
          {{ item.value || item }}
        </div>
      </div>
    </div>

    <div ref="smoothHandleLayer" class="smooth-handle-layer flex-box direction-column">
      <div data-type="top" class="smooth-top flex-1"></div>
      <div data-type="middle" class="smooth-middle"></div>
      <div data-type="bottom" class="smooth-bottom flex-1"></div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
  r(val)
    (val / 16) * 1em

  $smoothPickerHeight = 160
  $smoothMiddleLayerHeight = 32

  .smooth-picker
    font-size 1rem
    height: r($smoothPickerHeight)

    position: relative
    background-color: white
    overflow: hidden
    .smooth-group
      //
    .smooth-list
      height: r(100)
      position: relative

      top: r($smoothPickerHeight / 2 - $smoothMiddleLayerHeight / 2) // half of picker height - half of item height
    .smooth-item
      position: absolute
      top: 0
      left: 0

      overflow: hidden
      width: 100%
      text-overflow: ellipsis
      white-space: nowrap
      display: block
      text-align: center

      will-change: transform
      contain: strict

      height: r(32)
      line-height: 2
      font-size: r(16)
    .selected-item
      //
    .smooth-handle-layer
      position: absolute
      width: 100%
      height: calc(100% + 2px)
      left: 0
      right: 0
      top: -1px
      bottom: -1px
      .smooth-top
        border-bottom: 1px solid #c8c7cc
        background: linear-gradient(to bottom, white 10%, rgba(255, 255, 255, 0.7) 100%)
        transform: translate3d(0, 0, 5.625em)
      .smooth-middle
        height: r($smoothMiddleLayerHeight)
      .smooth-bottom
        border-top: 1px solid #c8c7cc
        background: linear-gradient(to top, white 10%, rgba(255, 255, 255, 0.7) 100%)
        transform: translate3d(0, 0, 5.625em)

  /* flex system */
  .flex-box
    display: flex
    for prop in column row
      &.direction-{prop}
        flex-direction: prop

    /* for items */
    for n in 1..12
      .flex-{n}
        flex: n

</style>