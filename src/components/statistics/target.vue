<template>
  <div class="target">
    <div class="target-title">数量指标</div>
    <!-- 计划内容展示 -->
    <div class="target-con">
      <span class="sum number">
        总问卷数
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14" viewBox="0 0 14 14" fill="none"><defs><rect id="path_0" x="0" y="0" width="14" height="14" /></defs><g opacity="1" transform="translate(0 0)  rotate(0 7 7)"><mask id="bg-mask-0" fill="white"><use xlink:href="#path_0"></use></mask><g mask="url(#bg-mask-0)" ><path id="分组 1" fill-rule="evenodd" style="fill:#1E6FFF" transform="translate(1.8074218750000006 1.7541015625000003)  rotate(0 5.192578124999999 5.6833984375)" opacity="1" d="M10.39 1.31C10.39 0.59 9.79 0 9.07 0L8.25 0L8.25 1.09C8.25 1.58 7.86 1.97 7.38 1.97L3.01 1.97C2.53 1.97 2.13 1.57 2.13 1.09L2.13 0L1.31 0C0.59 0 0 0.59 0 1.31L0 10.06C0 10.78 0.59 11.37 1.31 11.37L9.07 11.37C9.79 11.37 10.38 10.78 10.38 10.06L10.38 6.91L10.39 4.13L10.39 1.31Z M7.81145 7.95293L2.57145 7.95293C2.33145 7.95293 2.13145 8.15293 2.13145 8.39293C2.13145 8.63293 2.33145 8.83293 2.57145 8.83293L7.81145 8.83293C8.06145 8.83293 8.25145 8.63293 8.25145 8.39293C8.25145 8.15293 8.06145 7.95293 7.81145 7.95293Z M7.81145 5.90215L2.57145 5.90215C2.33145 5.90215 2.13145 6.10215 2.13145 6.34215C2.13145 6.58215 2.33145 6.78215 2.57145 6.78215L7.81145 6.78215C8.06145 6.78215 8.25145 6.58215 8.25145 6.34215C8.25145 6.10215 8.06145 5.90215 7.81145 5.90215Z M7.81145 3.85137L2.57145 3.85137C2.33145 3.85137 2.13145 4.05137 2.13145 4.29137C2.13145 4.53137 2.33145 4.73137 2.57145 4.73137L7.81145 4.73137C8.06145 4.73137 8.25145 4.53137 8.25145 4.29137C8.25145 4.05137 8.06145 3.85137 7.81145 3.85137Z " /><path id="路径 5" fill-rule="evenodd" style="fill:#1E6FFF" transform="translate(4.5951171875 0.8777343749999998)  rotate(0 2.4048828125000004 1.09375)" opacity="1" d="M4.81,1.75L4.81,0.88L4.15,0.88L4.15,0.44C4.15,0.2 3.96,0 3.72,0L1.09,0C0.85,0 0.66,0.2 0.66,0.44L0.66,0.88L0,0.88L0,1.75C0,1.99 0.2,2.19 0.44,2.19L4.37,2.19C4.61,2.19 4.81,1.99 4.81,1.75Z " /></g></g></svg>
        <i>{{ filenews.context.questionnaire.totalNumber || 0 }}</i>
      </span>
      <span class="useful number">
        有效问卷数
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="12" height="12" viewBox="0 0 12 12" fill="none"><g opacity="1" transform="translate(0.000823974609375 0.0009765625)  rotate(0 5.993696627754463 5.998187893822559)"><path id="路径 1" fill-rule="evenodd" style="fill:#1E6FFF" transform="translate(6.061352554535889 0)  rotate(0 2.9630203504865187 2.963020350486519)" opacity="1" d="M0.86,5.93L5.07,5.93C5.32,5.93 5.56,5.81 5.72,5.62C5.89,5.43 5.96,5.18 5.91,4.93C5.49,2.41 3.52,0.44 1,0.01C0.75,-0.03 0.5,0.04 0.3,0.2C0.11,0.37 0,0.6 0,0.86L0,5.07C0,5.54 0.38,5.93 0.86,5.93Z " /><path id="路径 2" fill-rule="evenodd" style="fill:#1E6FFF" transform="translate(0 1.3663985921497064)  rotate(0 5.315854476210879 5.314988597747705)" opacity="1" d="M10.43,5.58C10.26,5.38 10.02,5.27 9.76,5.28L5.77,5.28C5.54,5.28 5.35,5.08 5.35,4.85L5.35,0.87C5.35,0.61 5.24,0.37 5.05,0.21C4.85,0.04 4.59,-0.03 4.34,0.01C1.69,0.52 -0.16,2.92 0.01,5.62C0.18,8.31 2.33,10.45 5.02,10.62C7.72,10.79 10.11,8.93 10.62,6.28C10.66,6.03 10.59,5.77 10.43,5.58Z " /></g></svg>
        <i>{{ filenews.context.questionnaire.effectiveNumber || 0 }}</i>
      </span>
      <span class="plan number">
        计划问卷数
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="12" height="12" viewBox="0 0 12 12" fill="none"><defs><rect id="path_0" x="0" y="0" width="12" height="12" /></defs><g opacity="1" transform="translate(0 0)  rotate(0 6 6)"><mask id="bg-mask-0" fill="white"><use xlink:href="#path_0"></use></mask><g mask="url(#bg-mask-0)" ><path id="分组 1" fill-rule="evenodd" style="fill:#1E6FFF" transform="translate(0 0)  rotate(0 5.88 5.88)" opacity="1" d="M0 5.88C0 9.12 2.64 11.76 5.88 11.76C9.12 11.76 11.76 9.12 11.76 5.88C11.76 2.64 9.12 0 5.88 0C2.64 0 0 2.64 0 5.88Z M4.61 8.904L3.02 7.344L2.4 9.484L4.61 8.904Z M8.924 4.946L7.324 3.336L3.384 6.956L4.994 8.666L8.924 4.946Z M10.172 3.86341C10.222 3.31341 9.172 2.35341 8.612 2.30341C8.352 2.28341 7.752 3.00341 7.752 3.00341L9.412 4.70341C9.412 4.70341 10.152 4.15341 10.172 3.86341Z " /></g></g></svg>
        <div class="planbox">
          <i v-show="PlannumShow">
            {{ filenews.context.questionnaire.totalNumber || 0 }}
            <img
              class="change"
              style="display: inline"
              v-lazy="'/img/revise.png'"
              alt=""
              @click="ChangePlanShow"
            />
          </i>
          <input
            ref="planinput"
            type="number"
            v-show="!PlannumShow"
            v-model.number="filenews.context.questionnaire.totalNumber"
            placeholder="请输入计划问卷数"
            @blur="PlannumShow = true"
            @keyup.enter="PlannumShow = true"
          />
        </div>
      </span>
      <span class="pay number">
        总支出
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="12" height="12" viewBox="0 0 12 12" fill="none"><path id="ICON_总支出" fill-rule="evenodd" style="fill:#1E6FFF" transform="translate(0 0)  rotate(0 5.999999999999999 6)" opacity="1" d="M7.97 0.63C7.67 1.44 6.9 2.02 6 2.02C5.1 2.02 4.33 1.44 4.04 0.62C3.9 0.26 3.56 0 3.17 0L2.69 0C2.03 0 1.5 0.55 1.5 1.22L1.5 2.52L1.01 2.32C0.96 2.3 0.9 2.29 0.85 2.3C0.37 2.35 0 2.74 0 3.21L0 11.09C0 11.59 0.42 12 0.94 12L11.06 12C11.58 12 12 11.59 12 11.09L12 3.21C12 2.74 11.63 2.35 11.15 2.3L11.15 2.3C11.1 2.29 11.04 2.3 10.99 2.32L10.5 2.52L10.5 1.22C10.5 0.54 9.96 0 9.31 0L8.83 0C8.44 0 8.1 0.26 7.97 0.63Z M6.592 7.27094L7.552 6.30094C7.602 6.24094 7.632 6.17094 7.632 6.09094C7.632 6.01094 7.602 5.94094 7.552 5.89094C7.492 5.83094 7.422 5.80094 7.352 5.80094C7.272 5.80094 7.202 5.83094 7.142 5.89094L5.992 7.06094L4.842 5.89094C4.792 5.83094 4.722 5.80094 4.642 5.80094C4.562 5.80094 4.492 5.83094 4.442 5.89094C4.382 5.94094 4.352 6.01094 4.352 6.09094C4.352 6.17094 4.382 6.24094 4.442 6.30094L5.392 7.26094L4.532 7.26094C4.352 7.26094 4.242 7.38094 4.242 7.56094C4.242 7.73094 4.352 7.85094 4.532 7.85094L5.702 7.85094L5.702 8.56094L4.552 8.56094C4.382 8.56094 4.262 8.67094 4.262 8.85094C4.262 9.03094 4.382 9.14094 4.552 9.14094L5.712 9.14094L5.712 10.2909C5.712 10.4709 5.822 10.5809 6.002 10.5809C6.172 10.5809 6.292 10.4709 6.292 10.2909L6.292 9.14094L7.442 9.14094C7.612 9.14094 7.732 9.03094 7.732 8.85094C7.732 8.67094 7.612 8.56094 7.442 8.56094L6.272 8.56094L6.272 7.85094L7.462 7.85094C7.632 7.85094 7.742 7.74094 7.742 7.56094C7.742 7.38094 7.632 7.27094 7.462 7.27094L6.592 7.27094Z M9.31 0.7338L8.83 0.7338C8.74 0.7338 8.67 0.7938 8.64 0.8838C8.24 2.0038 7.18 2.7638 6 2.7638C4.82 2.7638 3.76 2.0038 3.36 0.8838C3.32 0.7838 3.25 0.7338 3.17 0.7338L2.69 0.7338C2.44 0.7338 2.22 0.9538 2.22 1.2138L2.22 2.8138L5.52 4.1638C5.83 4.2938 6.17 4.2938 6.48 4.1638L9.78 2.8238L9.78 2.8138L9.78 1.2138C9.78 0.9538 9.56 0.7338 9.31 0.7338Z " /></svg>
        <div class="planbox">
          <i v-show="MoneyShow">
            {{ Moneynum }}
            <img
              class="change"
              style="display: inline"
              v-lazy="'/img/revise.png'"
              alt=""
              @click="ChangeMoneyShow"
            />
          </i>
          <input
            ref="Moneyinput"
            type="number"
            placeholder="请输入总支出数"
            v-show="!MoneyShow"
            v-model.number="Moneynum"
            @blur="MoneyShow = true"
            @keyup.enter="MoneyShow = true"
          />
        </div>
      </span>
      <span class="reputation number">
        用户平均信誉度
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="13" height="14" viewBox="0 0 13 14" fill="none"><path id="ICON_信誉度" fill-rule="evenodd" style="fill:#1E6FFF" transform="translate(-0.0010986328125 0)  rotate(0 6.50000052464311 6.996098626509772)" opacity="1" d="M12.75 12.43C12.99 12.29 13.07 11.98 12.93 11.74L11.08 8.54C11.66 7.67 12 6.62 12 5.5C12 2.46 9.54 0 6.5 0C3.46 0 1 2.46 1 5.5C1 6.62 1.34 7.67 1.92 8.54L0.07 11.74C-0.07 11.98 0.01 12.29 0.25 12.43L2.55 11.44L2.85 13.93C3.08 14.06 3.39 13.98 3.53 13.74L5.2 10.85C5.62 10.95 6.05 11 6.5 11C6.95 11 7.38 10.95 7.8 10.85L9.47 13.74C9.61 13.98 9.92 14.06 10.15 13.93L10.45 11.44L12.75 12.43Z M6.5 7.64C8.48 9.17 8.96 8.61 8.21 6.36C10.13 4.96 9.9 4.17 7.57 4.21C6.84 1.92 6.16 1.93 5.43 4.21C3.1 4.25 2.87 4.96 4.79 6.36C4.04 8.61 4.52 9.17 6.5 7.64Z " /></svg>
        <i>0</i>
      </span>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, nextTick, watch, reactive } from "vue";
import emitter from "../../mitt/mitt.js";
import { useStore } from "../../Stores/index.js";
const datas = useStore();

//接收确定是哪一份问卷
let num = ref("");
emitter.on("filenum", (e) => {
  num.value = e;
});
watch(num, (newnum) => {
  getfile();
});

let filenews = reactive({
  context: { questionnaire: { totalNumber: 0, effectiveNumber: 0 } },
});

//修改有效问卷数
emitter.on("change",()=>{
  filenews.context.questionnaire.effectiveNumber-=1
})

function getfile() {
  axios({
    url: `https://q.denglu1.cn/api/user/questionnaireDetail/${parseInt(num.value)}`,
    method: "get",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
    headers: { token: datas.user.token },
  })
    .then((response) => {
      console.log(response);
      filenews.context = response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
//计划问卷调查数量修改
let planinput = ref(null); //
let plannum = ref(300); //计划问卷调查
let PlannumShow = ref(true); //问卷调查数input框是否显示
function ChangePlanShow() {
  PlannumShow.value = false;
  nextTick(() => {
    planinput.value.focus();
  });
}

//总支出数量修改
let Moneyinput = ref(null); //
let Moneynum = ref(0); //总支出调查
let MoneyShow = ref(true); //总支出input框是否显示
function ChangeMoneyShow() {
  MoneyShow.value = false;
  nextTick(() => {
    Moneyinput.value.focus();
  });
}
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
input[type="number"] {
  /* 清除原有input样式 */
  -web-kit-appearance: none;
  outline: 0;
  /* 设置我们要的样式 */
  width: 100px;
  height: 42px;
  opacity: 1;
  border: 1px solid rgba(166, 166, 166, 1);
  text-align: center;
  font-size: 36px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;  
        appearance: none !important;
    	margin: 0; 
}
</style>