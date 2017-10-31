<template>
  <div class="smooth-picker flex-box">

    <!-- smooth-group-layer -->
    <div ref="smoothGroup" v-for="(group, gIndex) in data" :key="gIndex" class="smooth-group" :class="getGroupClass(gIndex)">

      <div class="smooth-list">
        <div v-if="group.divider" class="smooth-item divider" :class="getItemClass(gIndex, iIndex, true)">{{ group.text }}</div>

        <div v-else v-for="(item, iIndex) in group.list" :key="iIndex"
          class="smooth-item" :class="getItemClass(gIndex, iIndex)" :style="getItemStyle(gIndex, iIndex)">
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

<script>
  export default {
    name: 'smooth-picker',
    props: {
      data: {
        type: Array,
        default: []
      },
      change: {
        type: Function,
        default: () => {}
      }
    },
    data () {
      return {
        currentIndexList: this.getInitialCurrentIndexList(), // save groups's index
        lastCurrentIndexList: [], // for detect which group's current index if it is changed

        groupsRectList: new Array(this.data.length), // save the dom rect list of this picker's groups

        dragInfo: { // save drag(ing) info
          isTouchable: 'ontouchstart' in window, // for detect event belongs to touch or mouse
          isMouseDown: false, // save the status of mouse (touch) is start and it is not end

          isDragging: false, // for detect the status of mouse (touch) is dragging (moving) after isMouseDown or not
          groupIndex: null, // save which group is dragging now
          startPageY: null // save the pageY value of mouse (touch) after begin isMouseDown
        },

        supInfo: { // supporting for picker usefulness
          getRectTimeoutId: null, // save timeout id
          lastStyleDisplay: null, // for detect picker style display if it is changed
          watchDomObserver: null // for watching this picker dom
        }
      }
    },
    mounted () {
      this.eventsRegister()

      this.$nextTick(this.getGroupsRectList())
      this.supInfo.watchDomObserver = this.createDomObserver()
      this.supInfo.watchDomObserver.observe(this.$el, { attributes: true })

      window.addEventListener('resize', this.safeGetGroupRectList)
    },
    destroyed () {
      this.supInfo.watchDomObserver.disconnect()

      window.removeEventListener('resize', this.safeGetGroupRectList)
    },
    methods: {
      setGroupData (gIndex, groupData) {
        // for current index list
        const iCI = groupData.currentIndex
        let movedIndex = 0
        if (typeof iCI === 'number' && iCI >= 0 && groupData.list && groupData.list.length && iCI <= groupData.list.length - 1) {
          movedIndex = Math.round(iCI)
        }
        this.currentIndexList[gIndex] = movedIndex
        this.lastCurrentIndexList = [].concat(this.currentIndexList)

        // for detect group flex if changed
        const gF = groupData.flex
        if (gF && this.data[gIndex].flex !== gF) {
          this.safeGetGroupRectList()
        }

        // set group data
        this.data[gIndex] = groupData
      },
      getInitialCurrentIndexList () {
        return this.data.map((item, index) => {
          const iCI = item.currentIndex
          if (typeof iCI === 'number' && iCI >= 0 && item.list && item.list.length && iCI <= item.list.length - 1) {
            return Math.round(iCI)
          }
          return 0
        })
      },
      createDomObserver () {
        return new window.MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'attributes') {
              // for get correct rect list after v-show true (when $el style display not none)
              const elDisplay = this.$el.style.display
              if (elDisplay !== 'none' && this.supInfo.lastStyleDisplay !== elDisplay) {
                this.supInfo.lastStyleDisplay = elDisplay
                this.$nextTick(this.getGroupsRectList())
              }
            }
          })
        })
      },
      safeGetGroupRectList () {
        this.supInfo.getRectTimeoutId && clearTimeout(this.supInfo.getRectTimeoutId)
        this.supInfo.getRectTimeoutId = setTimeout(() => {
          this.getGroupsRectList()
        }, 200)
      },
      getGroupsRectList () {
        if (this.$refs.smoothGroup) {
          this.$refs.smoothGroup.forEach((item, index) => {
            this.groupsRectList[index] = item.getBoundingClientRect()
          })
        }
      },
      eventsRegister () {
        const handleEventLayer = this.$refs.smoothHandleLayer
        if (handleEventLayer) {
          this.addEventsForElement(handleEventLayer)
        }
      },
      addEventsForElement (el) {
        const _ = this.dragInfo.isTouchable
        const eventHandlerList = [
          { name: _ ? 'touchstart' : 'mousedown', handler: this.handleStart },
          { name: _ ? 'touchmove' : 'mousemove', handler: this.handleMove },
          { name: _ ? 'touchend' : 'mouseup', handler: this.handleEnd },
          { name: _ ? 'touchcancel' : 'mouseleave', handler: this.handleCancel }
        ]
        eventHandlerList.forEach((item, index) => {
          el.removeEventListener(item.name, item.handler, false)
          el.addEventListener(item.name, item.handler, false)
        })
      },
      triggerMiddleLayerGroupClick (gIndex) {
        const data = this.data
        if (typeof gIndex === 'number' && typeof data[gIndex].onClick === 'function') {
          data[gIndex].onClick(gIndex, this.currentIndexList[gIndex])
        }
      },
      triggerAboveLayerClick (ev, gIndex) {
        const movedIndex = this.currentIndexList[gIndex] + 1
        this.$set(this.currentIndexList, gIndex, movedIndex)
        this.correctionCurrentIndex(ev, gIndex)
      },
      triggerMiddleLayerClick (ev, gIndex) {
        this.triggerMiddleLayerGroupClick(gIndex)
      },
      triggerBelowLayerClick (ev, gIndex) {
        const movedIndex = this.currentIndexList[gIndex] - 1
        this.$set(this.currentIndexList, gIndex, movedIndex)
        this.correctionCurrentIndex(ev, gIndex)
      },
      getTouchInfo (ev) {
        return this.dragInfo.isTouchable ? ev.changedTouches[0] || ev.touches[0] : ev
      },
      getGroupIndexBelongsEvent (ev) {
        const touchInfo = this.getTouchInfo(ev)

        for (let i = 0; i < this.groupsRectList.length; i++) {
          const item = this.groupsRectList[i]
          if (item.left < touchInfo.pageX && touchInfo.pageX < item.right) {
            return i
          }
        }
        return null
      },
      handleEventClick (ev) {
        const gIndex = this.getGroupIndexBelongsEvent(ev)

        switch (ev.target.dataset.type) {
          case 'top':
            this.triggerAboveLayerClick(ev, gIndex)
            break
          case 'middle':
            this.triggerMiddleLayerClick(ev, gIndex)
            break
          case 'bottom':
            this.triggerBelowLayerClick(ev, gIndex)
            break
          default:
        }
      },
      handleStart (ev) {
        if (ev.cancelable) {
          ev.preventDefault()
          ev.stopPropagation()
        }

        const touchInfo = this.getTouchInfo(ev)
        this.dragInfo.startPageY = touchInfo.pageY
        if (!this.dragInfo.isTouchable) {
          this.dragInfo.isMouseDown = true
        }
      },
      handleMove (ev) {
        ev.preventDefault()
        ev.stopPropagation()

        if (this.dragInfo.isTouchable || this.dragInfo.isMouseDown) {
          this.dragInfo.isDragging = true
          this.setCurrentIndexOnMove(ev)
        }
      },
      handleEnd (ev) {
        ev.preventDefault()
        ev.stopPropagation()

        if (!this.dragInfo.isDragging) {
          this.handleEventClick(ev)
        }
        this.dragInfo.isDragging = false
        this.dragInfo.isMouseDown = false

        this.correctionAfterDragging(ev)
      },
      handleCancel (ev) {
        ev.preventDefault()
        ev.stopPropagation()

        if (this.dragInfo.isTouchable || this.dragInfo.isMouseDown) {
          this.correctionAfterDragging(ev)
          this.dragInfo.isMouseDown = false
          this.dragInfo.isDragging = false
        }
      },
      setCurrentIndexOnMove (ev) {
        const touchInfo = this.getTouchInfo(ev)
        if (this.dragInfo.groupIndex === null) {
          this.dragInfo.groupIndex = this.getGroupIndexBelongsEvent(ev)
        }

        const gIndex = this.dragInfo.groupIndex
        if (typeof gIndex === 'number' && (this.data[gIndex].divider || !this.data[gIndex].list)) {
          return
        }

        const moveCount = (this.dragInfo.startPageY - touchInfo.pageY) / 32
        const movedIndex = this.currentIndexList[gIndex] + moveCount

        this.$set(this.currentIndexList, gIndex, movedIndex)

        this.dragInfo.startPageY = touchInfo.pageY
      },
      correctionAfterDragging (ev) {
        const gIndex = this.dragInfo.groupIndex
        this.correctionCurrentIndex(ev, gIndex)

        this.dragInfo.groupIndex = null
        this.dragInfo.startPageY = null
      },
      correctionCurrentIndex (ev, gIndex) {
        setTimeout(() => {
          if (typeof gIndex === 'number' && this.data[gIndex].divider !== true && this.data[gIndex].list.length > 0) {
            const unsafeGroupIndex = this.currentIndexList[gIndex]

            let movedIndex = unsafeGroupIndex
            if (unsafeGroupIndex > this.data[gIndex].list.length - 1) {
              movedIndex = this.data[gIndex].list.length - 1
            } else if (unsafeGroupIndex < 0) {
              movedIndex = 0
            }
            movedIndex = Math.round(movedIndex)

            this.$set(this.currentIndexList, gIndex, movedIndex)
            if (movedIndex !== this.lastCurrentIndexList[gIndex]) {
              this.change(gIndex, movedIndex)
            }
            this.lastCurrentIndexList = [].concat(this.currentIndexList)
          }
        }, 100)
      },
      isCurrentItem (gIndex, iIndex) {
        return this.currentIndexList[gIndex] === iIndex
      },
      getCurrentIndexList () {
        return this.currentIndexList
      },
      getGroupClass (gIndex) {
        const group = this.data[gIndex]
        const defaultFlexClass = 'flex-' + (group.flex || 1)
        const groupClass = [defaultFlexClass]
        if (group.className) {
          groupClass.push(group.className)
        }
        return groupClass
      },
      getItemClass (gIndex, iIndex, isDevider = false) {
        const itemClass = []
        const group = this.data[gIndex]
        if (group.textAlign) {
          itemClass.push('text-' + group.textAlign)
        }
        if (!isDevider && this.isCurrentItem(gIndex, iIndex)) {
          itemClass.push('smooth-item-selected')
        }
        return itemClass
      },
      getItemStyle (gIndex, iIndex) {
        const gapCount = this.currentIndexList[gIndex] - iIndex
        if (Math.abs(gapCount) < 4) {
          let rotateStyle = 'transform: rotateX(' + gapCount * 23 + 'deg) translate3d(0, 0, 5.625rem);'
          if (!this.dragInfo.isDragging) {
            rotateStyle += ' transition: transform 150ms ease-out;'
          }
          return rotateStyle
        }
        if (gapCount > 0) {
          return 'transform: rotateX(100deg) translate3d(0, 0, 5.625rem)'
        } else {
          return 'transform: rotateX(-100deg) translate3d(0, 0, 5.625rem)'
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>

  r(val)
    (val / 16) * 1rem

  $smoothPickerHeight = 160
  $smoothMiddleLayerHeight = 32

  .smooth-picker
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

      height: 2rem
      line-height: 2
      font-size: 1rem
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
        transform: translate3d(0, 0, 5.625rem)
      .smooth-middle
        height: r($smoothMiddleLayerHeight)
      .smooth-bottom
        border-top: 1px solid #c8c7cc
        background: linear-gradient(to top, white 10%, rgba(255, 255, 255, 0.7) 100%)
        transform: translate3d(0, 0, 5.625rem)

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
