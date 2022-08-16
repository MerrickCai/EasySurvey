<template>
  <div class="data">
    <CreateFile></CreateFile>
    <target></target>
    <echart></echart>
  </div>
</template>

<script setup>
import CreateFile from "../components/CreateFile.vue";
import target from "../components/target.vue";
import echart from "../components/echart.vue";
</script>

<style lang="less" scoped>
.data {
  // height: 500px;
  margin-top: 0px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 350px 850px; //1fr 2fr
  grid-template-rows: 175px 400px;
  grid-auto-flow: column;
  grid-auto-flow: column dense;
  //问卷管理部分
  .fileuse {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
  }
  //数量指标部分
  .target {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
  }
  //echart图表部分
  .echartall {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
  }
}
</style>