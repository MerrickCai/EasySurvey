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
      <span class="plan number"
        >计划问卷数 <img src="/plan.png" alt="" />
        <div class="planbox">
          <i v-show="PlannumShow"
            >{{ plannum
            }}<img
              class="change"
              style="display: inline"
              src="/revise.png"
              alt=""
              @click="PlannumShow = false"
          /></i>
          <input
            ref="planinput"
            type="text"
            v-show="!PlannumShow"
            v-model.number="plannum"
            placeholder="请输入计划问卷数"
            @blur="PlannumShow = true"
            @keyup.enter="PlannumShow = true"
          />
        </div>
      </span>
      <span class="pay number">
        总支出 <img src="/expend.png" alt="" />
        <div class="planbox">
          <i v-show="MoneyShow"
            >{{ Moneynum
            }}<img
              class="change"
              style="display: inline"
              src="/revise.png"
              alt=""
              @click="MoneyShow = false"
          /></i>
          <input
            type="text"
            v-show="!MoneyShow"
            v-model.number="Moneynum"
            placeholder="请输入总支出数"
            @blur="MoneyShow = true"
            @keyup.enter="MoneyShow = true"
          />
        </div>
      </span>
      <span class="reputation number">
        用户平均信誉度 <img src="/credit.png" alt="" />
        <i>90%</i>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
let planinput = ref(null); //
let plannum = ref(300); //计划问卷调查
let PlannumShow = ref(true); //问卷调查数input框是否显示
let Moneynum = ref(100); //总支出调查
let MoneyShow = ref(true); //总支出input框是否显示
</script>

<style lang="less" scoped>
.target {
  width: 750px;
  height: 126px;
  margin-top: 20px;
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
    .planbox {
      height: 42px;
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