<template>
  <div class="example-page">
    <smooth-picker v-show="showPicker" ref="picker" :data="data" @onChange="dataChange" />
    <button class="button" type="button" @click="confirm">Confirm</button>
    <button v-show="showWorkBtn" class="button" type="button" @click="init">Make it work</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { SmoothPicker, version } from 'vue-smooth-picker'  // import in specific place version
import 'vue-smooth-picker/style.css'

console.warn('vue-smooth-picker version', version)

const showPicker = ref(false)
const picker = ref(null)
const showWorkBtn = ref(true)

const clickOnGender = () => {
  const ciList = picker.value.getCurrentIndexList()
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
  const ciList = picker.value.getCurrentIndexList()
  window.alert('Selected: ' + data.value[0].list[ciList[0]])
}

const init = () => {
  picker.value?.getGroupsRectList()
  showWorkBtn.value = false
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
      margin 10px 0 0 10px
      background-color black
      color white
      padding 5px
</style>
