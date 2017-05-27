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
      return {
        data: [
          {
            currentIndex: 0,
            flex: 3,
            list: [
              'Plan A - free', 'Plan B - $50', 'Plan C - $100'
            ],
            onClick: this.clickOnPlan,
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
            onClick: this.clickOnProduct,
            textAlign: 'center',
            className: 'item-group'
          }
        ]
      }
    },
    methods: {
      dataChange (gIndex, iIndex) {
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
          this.$refs.smoothPicker.setGroupData(2, Object.assign({}, this.data[2], { currentIndex, list }))
        }
      },
      clickOnPlan (gIndex, iIndex) {
        window.alert('Clicked plan: ' + this.data[gIndex].list[iIndex])
      },
      clickOnProduct (gIndex, iIndex) {
        window.alert('Clicked product: ' + this.data[gIndex].list[iIndex])
      },
      confirm () {
        const ciList = this.$refs.smoothPicker.getCurrentIndexList()
        const planDetail = this.data[0].list[ciList[0]]
        const productDetail = this.data[2].list[ciList[2]]
        window.alert(
          'Confirmed index list: ' + ciList + '.\n' +
          'Confirmed plan: ' + planDetail + '.\n' +
          'Confirmed product: ' + productDetail
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
