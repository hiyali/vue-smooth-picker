<template>
  <div class="example-page">
    <SmoothPicker ref="smoothPicker" :data="data" @onChange="dataChange" />
    <button class="button" type="button" @click="confirm">Confirm</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SmoothPicker, version } from 'vue-smooth-picker'  // import in specific place version
import 'vue-smooth-picker/style.css'

console.warn('vue-smooth-picker version', version)

const nowYear = new Date().getFullYear()
const years = Array.from({ length: nowYear - 1990 }, (_, i) => 1991 + i)
const smoothPicker = ref(null)

const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
}

const dataChange = (gIndex, iIndex) => {
  console.info('list', gIndex, iIndex)
  const ciList = smoothPicker.value.getCurrentIndexList()

  if (gIndex === 0 || gIndex === 1) { // year or month changed
    let currentIndex = 15
    let monthCount = 30

    let month = iIndex + 1 // month
    if (gIndex === 0) { // year
      month = data.value[1].list[ciList[1]]
    }
    switch (month) {
      case 2:
        let selectedYear = data.value[0].list[ciList[0]] // month
        if (gIndex === 0) { // year
          selectedYear = data.value[0].list[iIndex]
        }

        let isLeap = isLeapYear(selectedYear)

        monthCount = 28
        currentIndex = 14
        if (isLeap) {
          monthCount = 29
          currentIndex = 15
        }
        break
      case 4:
      case 6:
      case 9:
      case 11:
        monthCount = 30
        currentIndex = 15
        break
      default:
        monthCount = 31
        currentIndex = 16
    }
    const list = Array.from({ length: monthCount }, (_, i) => i + 1)
    smoothPicker.value.setGroupData(2, { ...data.value[2], ...{ currentIndex, list } })
  }
}

const clickOnDay = (gIndex, iIndex) => {
  window.alert('Clicked day: ' + data.value[gIndex].list[iIndex])
}

const data = ref([
  {
    currentIndex: Math.floor((nowYear - 1991) / 2),
    flex: 3,
    list: years,
    textAlign: 'center',
    className: 'row-group'
  },
  {
    currentIndex: 8,
    flex: 3,
    list: Array.from({ length: 12 }, (_, i) => i + 1),
    textAlign: 'center',
    className: 'row-group'
  },
  {
    currentIndex: 1,
    flex: 3,
    list: Array.from({ length: 30 }, (_, i) => i + 1),
    onClick: clickOnDay,
    textAlign: 'center',
    className: 'item-group'
  }
])

const confirm = () => {
  const ciList = smoothPicker.value.getCurrentIndexList()
  const year = data.value[0].list[ciList[0]]
  const month = data.value[1].list[ciList[1]]
  const day = data.value[2].list[ciList[2]]
  window.alert(`${year} / ${month} / ${day}`)
}
</script>

<style lang="stylus">
  body
    background-color: #f0f0f0
    .button
      margin: 10px 0 0
      background-color: black
      color: white
      padding: 5px
</style>