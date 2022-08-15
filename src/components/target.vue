<template>
  <div class="target">
    <div class="target-title">数量指标</div>
    <div class="target-con">
      <span class="sum number">
        总问卷数 <img src="/sum.png" alt="" />
        <i>150</i>
      </span>
      <span class="useful number"
        >有效问卷数
        <img src="/useful.png" alt="" />
        <i>80</i>
      </span>
      <span class="plan number">
        计划问卷数 <img src="/plan.png" alt="" />
        <i
          >300<img
            class="change"
            style="display: inline"
            src="/revise.png"
            alt=""
        /></i>
      </span>
      <span class="pay number">
        总支出 <img src="/expend.png" alt="" />
        <i
          >100.00<img
            class="change"
            style="display: inline"
            src="/revise.png"
            alt=""
        /></i>
      </span>
      <span class="reputation number">
        用户平均信誉度 <img src="/credit.png" alt="" />
        <i>90%</i>
      </span>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
.target {
  //   position: absolute;
  //   right: 50px;
  //   top: 20px;
  width: 750px;
  height: 126px;
  margin-top: 20px;
  //   background-color: pink;
  padding: 10px 24px;
  box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.1);
  .target-title {
    height: 44px;
    text-align: left;
    line-height: 44px;
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
    i {
      display: block;
      height: 42px;
      font-size: 36px;
      font-weight: bold;
      color: #000;
      font-style: normal;
      .change {
        cursor: pointer;
      }
    }
  }
}
</style>