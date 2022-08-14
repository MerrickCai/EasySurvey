<template>
  <div class="data">
    <CreateFile></CreateFile>
    <target></target>
    <echart></echart>
  </div>
</template>

<script setup>
import CreateFile from "./CreateFile.vue";
import target from "./target.vue";
import echart from "./echart.vue";
</script>

<style lang="less" scoped>
// .data {
//   height: 800px;
//   margin: 0px;
//   display: inline-grid;
//   grid-gap: 20px;
//   grid-template-areas:
//     "CreateFile"
//     "target echart";
//   grid-auto-flow: column;
//   .CreateFile {
//     grid-area: CreateFile;
//   }
//   .target {
//     grid-area: target;
//   }
//   .echart {
//     grid-area: echart;
//   }
// }
.data {
  height: 700px;
  margin-top: 0px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 350px 850px; //1fr 2fr
  grid-template-rows: 200px 500px;
  grid-auto-flow: column;
  grid-auto-flow: column dense;
  .fileuse {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
  }
  .target {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
  }
  .echartall {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
  }
}
</style>