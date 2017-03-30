<template>
  <div class="example-page">
    <smooth-picker ref="smoothPicker" :data="data" :change="dataChange" />
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
              'AA', 'BB', 'CC'
            ],
            onClick: this.clickRow,
            textAlign: 'center',
            className: 'row-group'
          },
          {
            divider: true,
            flex: 1,
            text: 'row',
            textAlign: 'center',
            className: 'divider'
          },
          {
            currentIndex: 5,
            flex: 3,
            list: [
              '1', '2', '3', '4', '5', '6', '7', '8'
            ],
            onClick: this.clickItem,
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
          if (this.data[gIndex].list[iIndex] === 'BB') {
            list = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
            currentIndex = 4
          } else {
            list = ['10', '11', '12', '13', '14']
            currentIndex = 2
          }
          this.$refs.smoothPicker.setGroupData(2, Object.assign({}, this.data[2], { currentIndex, list }))
        }
      },
      clickRow (gIndex, iIndex) {
        console.info('row', gIndex, iIndex)
      },
      clickItem (gIndex, iIndex) {
        console.info('item', gIndex, iIndex)
      }
    }
  }
</script>

<style lang="stylus">
  body
    background-color: #f0f0f0
</style>
