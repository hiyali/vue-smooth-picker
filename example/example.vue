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
              'A区', 'B区', 'C区'
            ],
            onClick: this.clickBig,
            textAlign: 'center',
            className: 'big-some'
          },
          {
            currentIndex: 5,
            flex: 3,
            list: [
              '10排', '11排', '13排', '15排'
            ],
            onClick: this.clickSmall,
            textAlign: 'center',
            className: 'small-some'
          },
          {
            currentIndex: 5,
            flex: 3,
            list: [
              '1', '2', '3', '4', '5', '6', '7', '8'
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
          if (this.data[listIndex].list[index] === 'B区') {
            list = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
            currentIndex = 4
          } else {
            list = ['10', '11', '12', '13', '14']
            currentIndex = 2
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
  .example-page
    background-color: white
    padding: 5px 0
</style>
