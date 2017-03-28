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
              'A', 'B', 'A', 'B', 'A', 'B', 'A', 'B', 'A', 'B', 'A', 'B', 'A', 'B', 'A', 'B', 'A', 'B', 'A', 'B'
            ],
            onClick: this.clickBig,
            textAlign: 'center',
            className: 'big-some'
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
              'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b'
            ],
            onClick: this.clickSmall,
            textAlign: 'center',
            className: 'small-some'
          }
        ]
      }
    },
    methods: {
      dataChange (listIndex, index) {
        console.info('list', listIndex, index)
        if (listIndex === 0) {
          let currentIndex = 0
          let list = []
          if (this.data[listIndex].list[index] === 'B') {
            list = ['c', 'd', 'c', 'd', 'c', 'd', 'c', 'd', 'c', 'd', 'c', 'd', 'c', 'd', 'c']
            currentIndex = 5
          } else {
            list = ['a']
          }
          this.$refs.smoothPicker.setGroupData(2, Object.assign({}, this.data[2], { currentIndex, list }))
        }
      },
      clickBig (index, item) {
        console.info('big', index, item)
      },
      clickSmall (index, item) {
        console.info('small', index, item)
      }
    }
  }
</script>

<style lang="stylus">
  body
    background-color: #f0f0f0
</style>
