<template>
  <li>
    <p class="itemnav">
      <i class="sttitle">创建次级题目 <el-switch v-model="value1" /></i>
      <i class="additem">+</i>
      <i class="delitem">×</i>
    </p>
    <el-scrollbar max-height="400px">
      <p class="questitle">{{}}</p>
    </el-scrollbar>
  </li>
</template>

<script setup>
import { ref } from "vue";
const value1 = ref(true);
</script>

<style lang="less" scoped>
li {
  box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.25);
  .itemnav {
    width: 100%;
    position: relative;
    i {
      font-style: normal;
    }
    .sttitle {
      margin-top: 5px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(30, 111, 255, 1);
      position: absolute;
      left: 100px;
    }
    .additem {
      cursor: pointer;
      position: absolute;
      right: 70px;
      font-size: 25px;
      font-weight: 400;
      color: rgba(30, 111, 255, 1);
    }
    .delitem {
      cursor: pointer;
      position: absolute;
      right: 30px;
      font-size: 25px;
      font-weight: 400;
      color: rgba(30, 111, 255, 1);
    }
  }
  .el-scrollbar {
    width: 430px;
    height: 160px;

    --el-scrollbar-opacity: 0.3;
    --el-scrollbar-bg-color: rgba(71, 145, 255, 1);
    --el-scrollbar-hover-opacity: 0.5;
    --el-scrollbar-hover-bg-color: rgba(71, 145, 255, 1);

    .el-scrollbar__bar {
      width: 8px;
      position: absolute;
      right: 0;
    }
  }
}
</style>