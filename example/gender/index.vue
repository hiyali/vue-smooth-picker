<template>
  <div class="example-page">
    <smooth-picker v-show="showPicker" ref="smoothPicker" :data="data" :change="dataChange" />
    <button class="button" type="button" @click="confirm">Confirm</button>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'example-page',
    data () {
      return {
        showPicker: false,
        data: [
          {
            currentIndex: 1,
            flex: 3,
            list: ['Secret', 'Male', 'Female'],
            onClick: this.clickOnGender,
            textAlign: 'center',
            className: 'row-group'
          }
        ]
      }
    },
    methods: {
      clickOnGender () {
        const ciList = this.$refs.smoothPicker.getCurrentIndexList()
        window.alert('Clicked index:' + ciList[0])
      },
      dataChange (gIndex, iIndex) {
        console.info('list', gIndex, iIndex)
      },
      confirm () {
        const ciList = this.$refs.smoothPicker.getCurrentIndexList()
        window.alert('Selected: ' + this.data[0].list[ciList[0]])
      }
    },
    mounted () {
      setTimeout(() => {
        this.showPicker = true
      }, 200)
    }
  }
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
