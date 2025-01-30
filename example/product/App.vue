<template>
  <div class="example-page">
    <smooth-picker ref="picker" :data="data" @onChange="dataChange" />
    <button class="button" type="button" @click="confirm">Confirm</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import in app level & custom name version

const picker = ref(null)  // Warning: don't have smoothPicker var name in this file

const dataChange = (gIndex, iIndex) => {
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
    picker.value.setGroupData(2, { ...data.value[2], currentIndex, list })
  }
}

const clickOnPlan = (gIndex, iIndex) => {
  window.alert('Clicked plan: ' + data.value[gIndex].list[iIndex])
}

const clickOnProduct = (gIndex, iIndex) => {
  window.alert('Clicked product: ' + data.value[gIndex].list[iIndex])
}

const data = ref([
  {
    currentIndex: 0,
    flex: 3,
    list: [
      'Plan A - free', 'Plan B - $50', 'Plan C - $100'
    ],
    onClick: clickOnPlan,
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
    onClick: clickOnProduct,
    textAlign: 'center',
    className: 'item-group'
  }
])

const confirm = () => {
  const ciList = picker.value.getCurrentIndexList()
  const planDetail = data.value[0].list[ciList[0]]
  const productDetail = data.value[2].list[ciList[2]]
  window.alert(
    'Confirmed index list: ' + ciList + '.\n' +
    'Confirmed plan: ' + planDetail + '.\n' +
    'Confirmed product: ' + productDetail
  )
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
