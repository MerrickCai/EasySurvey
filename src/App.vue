<script setup>
import { useStore } from './PiniaStores/data.js'
const datas = useStore()
datas.value++
datas.$patch({ value: datas.value + 1 })
datas.increment()
datas.decline()
</script>

<template>

  <div>
    <p>Pinia状态管理</p>
    全局变量count {{ datas.value }}
    <div>
      <button @click="datas.increment">增加</button>
    </div>
    <div>
      <button @click="datas.decline">减少</button>
    </div>
  </div>


</template>

<style scoped>
</style>
