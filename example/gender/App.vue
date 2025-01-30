<template>
  <div class="example-page">
    <SmoothPicker v-show="showPicker" ref="smoothPicker" :data="data" @onChange="dataChange" />
    <button class="button" type="button" @click="confirm">Confirm</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { SmoothPicker } from 'vue-smooth-picker'
import 'vue-smooth-picker/style.css'

// import { version } from 'vue-smooth-picker'
// console.warn('vue-smooth-picker version', version)

const showPicker = ref(false)
const smoothPicker = ref(null)

const clickOnGender = () => {
  const ciList = smoothPicker.value.getCurrentIndexList()
  window.alert('Clicked index: ' + ciList[0])
}

const data = ref([
  {
    currentIndex: 1,
    flex: 3,
    list: ['Secret', 'Male', 'Female'],
    onClick: clickOnGender,
    textAlign: 'center',
    className: 'row-group'
  }
])

const dataChange = (gIndex, iIndex) => {
  console.info('list', gIndex, iIndex)
}

const confirm = () => {
  const ciList = smoothPicker.value.getCurrentIndexList()
  window.alert('Selected: ' + data.value[0].list[ciList[0]])
}

onMounted(() => {
  setTimeout(() => {
    showPicker.value = true
  }, 200)
})
</script>

<style lang="stylus">
  body
    background-color: #f0f0f0
    .button
      margin 10px 0 0
      background-color black
      color white
      padding 5px
</style>
