<template>
  <div class="target">
    <div class="target-title">数量指标</div>
    <div class="target-con">
      <span class="sum">总问卷数<span class="number">150</span></span>
      <span class="useful">有效问卷数<span class="number"></span></span>
      <span class="plan">计划问卷数300</span>
      <span class="pay">总支出80.00</span>
      <span class="reputation">用户平均信誉度<span class="number"></span></span>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
.target {
  width: 87rem;
  height: 14rem;
  background-color: pink;
  padding: 0 2.4rem;
  box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.1);
  .target-title {
    height: 4.4rem;
    text-align: left;
    line-height: 4.4rem;
    font-size: 14px;
    font-weight: bold;
  }
  .target-con {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgba(140, 140, 140, 1);
    font-size: 12px;
    input {
      display: inline-block;
      border: none;
    }
    .number {
      display: block;
      height: 4.2rem;
      font-size: 36px;
      font-weight: bold;
      color: #000;
    }
  }
}
</style>