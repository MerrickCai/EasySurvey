<script setup>
import { useStore } from './PiniaStores/index.js'
import login from './components/login.vue';

  const datas = useStore()
datas.value++
datas.increment()
datas.$patch({ value: datas.value + 1 })
datas.$reset()

</script>

<template>
  <div>
    <p>Pinia状态管理</p>
    <div>添加状态</div>
    <div>value：{{ datas.value }}</div>
    <div>doubleValue：{{ datas.doubleValue }}</div>
    <div>doublePlusOne：{{ datas.doublePlusOne }}</div>
    <div>
      <button @click="datas.$reset()">重置</button>
      <button @click="datas.decline">减少</button>
      <button @click="datas.increment">增加</button>
    </div>
  </div>
  <login></login>
</template>


<style lang="less" scoped>
@big: 20px;

div {
  font-size: @big;
  margin: 10px;
}
</style>