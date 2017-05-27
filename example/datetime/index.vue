<template>
  <div class="example-page">
    <smooth-picker ref="smoothPicker" :data="data" :change="dataChange" />
    <button class="button" type="button" @click="confirm">Confirm</button>
  </div>
</template>

<script>
  export default {
    name: 'example-page',
    data () {
      const nowYear = (new Date()).getFullYear()
      const years = []
      for (let i = 1991; i <= nowYear; i++) {
        years.push(i)
      }

      return {
        data: [
          {
            currentIndex: parseInt((nowYear - 1991) / 2),
            flex: 3,
            list: years,
            textAlign: 'center',
            className: 'row-group'
          },
          {
            currentIndex: 8,
            flex: 3,
            list: [...Array(12)].map((m, i) => i + 1),
            textAlign: 'center',
            className: 'row-group'
          },
          {
            currentIndex: 1,
            flex: 3,
            list: [...Array(30)].map((d, i) => i + 1),
            onClick: this.clickOnDay,
            textAlign: 'center',
            className: 'item-group'
          }
        ]
      }
    },
    methods: {
      isLeapYear (year) {
        return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)
      },
      dataChange (gIndex, iIndex) {
        console.info('list', gIndex, iIndex)
        const ciList = this.$refs.smoothPicker.getCurrentIndexList()

        if (gIndex === 0 || gIndex === 1) { // year or month changed
          let currentIndex = 15
          let monthCount = 30

          let month = iIndex + 1 // month
          if (gIndex === 0) { // year
            month = this.data[1].list[ciList[1]]
          }
          switch (month) {
            case 2:
              let selectedYear = this.data[0].list[ciList[0]] // month
              if (gIndex === 0) { // year
                selectedYear = this.data[0].list[iIndex]
              }

              let isLeapYear = false
              if (this.isLeapYear(selectedYear)) {
                isLeapYear = true
              }

              monthCount = 28
              currentIndex = 14
              if (isLeapYear) {
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
          const list = [...Array(monthCount)].map((d, i) => i + 1)
          this.$refs.smoothPicker.setGroupData(2, { ...this.data[2], ...{ currentIndex, list }})
        }
      },
      clickOnDay (gIndex, iIndex) {
        window.alert('Clicked day: ' + this.data[gIndex].list[iIndex])
      },
      confirm () {
        const ciList = this.$refs.smoothPicker.getCurrentIndexList()
        const year = this.data[0].list[ciList[0]]
        const month = this.data[1].list[ciList[1]]
        const day = this.data[2].list[ciList[2]]
        window.alert(
          year + ' / ' + month + ' / ' + day
        )
      }
    }
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
