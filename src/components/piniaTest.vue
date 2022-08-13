<script setup>
import { useStore } from '../PiniaStores/index.js'
const datas = useStore()
</script>

<template>
    <p>Pinia状态管理</p>
        <p>路由切换不改变全局数据</p>
    <div>value：{{ datas.value }}</div>
    <div>doubleValue：{{ datas.doubleValue }}</div>
    <div>doublePlusOne：{{ datas.doublePlusOne }}</div>
    <div>
      <button @click="datas.$reset()">重置</button>
      <button @click="datas.decline">减少</button>
      <button @click="datas.increment">增加</button>
    </div>
</template>

<style lang="less" scoped>
@big: 20px;
p{
    font-size: @big;
  margin: 10px;
}
div {
  font-size: @big;
  margin: 10px;
}
</style>