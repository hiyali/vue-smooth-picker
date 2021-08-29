<template>
  <p>VueSmoothPicker 3.0 usage demo</p>
  <VueSmoothPicker ref="smoothPicker" :data="data" @change="dataChange" />
</template>

<script>
  // import VueSmoothPicker from './components/'
  import { ref, onMounted } from 'vue'

  export default {
    name: 'App',
    /*
    components: {
      VueSmoothPicker
    },
    // */
    setup() {
      const smoothPicker = ref(null)

      onMounted(() => {
        // the DOM element will be assigned to the ref after initial render
        console.log(smoothPicker.value) // <div>This is a VueSmoothPicker element</div>
      })

      return {
        smoothPicker
      }
    },
    data () {
      return {
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
        const ciList = this.smoothPicker.getCurrentIndexList()
        window.alert('Clicked index:' + ciList[0])
      },
      dataChange ({ gIndex, iIndex }) {
        console.info('list', gIndex, iIndex)
      }
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
