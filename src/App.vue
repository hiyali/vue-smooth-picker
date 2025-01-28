<template>
    <div>
        <h1>Vue3 Smooth Picker Demo</h1>
        <div class="demo-picker">
            <smooth-picker ref="smoothPicker" :data="pickerData" @onChange="handleChange" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SmoothPicker from './components/SmoothPicker.vue'

const smoothPicker = ref(null)

const pickerData = ref([
    {
        list: Array.from({ length: 24 }, (_, i) => ({ value: i.toString().padStart(2, '0') })),
        currentIndex: 0
    },
    {
        list: Array.from({ length: 60 }, (_, i) => ({ value: i.toString().padStart(2, '0') })),
        currentIndex: 0
    }
])

const handleChange = (groupIndex: number, itemIndex: number) => {
    console.log('Changed:', { groupIndex, itemIndex })
}
onMounted(() => {
    console.log(smoothPicker.value)
})
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

.demo-picker {
    width: 300px;
    margin: 20px auto;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>