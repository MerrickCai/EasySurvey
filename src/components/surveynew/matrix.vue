
<template>
  <li>
    <p class="itemnav">
      <span class="type">矩阵</span>

      <i class="additem" @click="addamount(), updatescroll()">+</i>
      <i class="delitem" @click="deleteamount(quesitem.id)" ref="deletematrix" @mousemove="cursorfail">×</i>
    </p>
    <p class="questitle">
      <span>{{ content.matrixfile.indexOf(quesitem) + 1 }}</span>
      <el-input type="textarea" autosize ref="questitle" v-model="quesitem.question.detail" placeholder="请输入题目标题"
        @blur="questitleshow = true" @keyup.enter="questitleshow = true" />
    </p>
    <div class="block" style="backgroundcolor: rgb(229, 229, 229)">
      <div v-for="index in quesitem.series" class="bar1" @click="num = index"
        :style="{ left: `${(500 / (quesitem.series - 1)) * (index - 1)}px` }">
        <input type="text" v-model="quesitem.options[index - 1].detail" />
      </div>
      <div class="thumb" :style="{
        left: `${
          num === 0 ? -10 : -10 + (500 / (blocknum - 1)) * (num - 1)
        }px`,
      }"></div>
      <input type="number" class="blocknum" v-model.number="quesitem.series" @blur="tip()" @keyup.enter="tip()" max="7"
        min="3" @change="num = 0" />
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14"
        viewBox="0 0 14 14" fill="none">
        <defs>
          <rect id="path_0" x="0" y="0" width="14" height="14" />
        </defs>
        <g opacity="1" transform="translate(0 0)  rotate(0 7 7)">
          <mask id="bg-mask-0" fill="white">
            <use xlink:href="#path_0"></use>
          </mask>
          <g mask="url(#bg-mask-0)">
            <path id="分组 1" fill-rule="evenodd" style="fill: #1e6fff" transform="translate(0 0)  rotate(0 7 7)"
              opacity="1"
              d="M0 7C0 10.87 3.13 14 7 14C10.87 14 14 10.87 14 7C14 3.14 10.86 0 7 0C3.13 0 0 3.13 0 7Z M12.8367 6.99667C12.8367 3.77667 10.2167 1.16667 6.99667 1.16667C3.77667 1.16667 1.16667 3.77667 1.16667 6.99667C1.16667 10.2167 3.77667 12.8367 6.99667 12.8367C10.2167 12.8367 12.8367 10.2167 12.8367 6.99667Z M6.99667 4.19167C7.64667 4.19167 8.16667 4.71167 8.16667 5.35167C8.16667 6.00167 7.64667 6.52167 6.99667 6.52167C6.67667 6.52167 6.41667 6.78167 6.41667 7.10167L6.41667 8.63167C6.41667 8.95167 6.67667 9.21167 6.99667 9.21167C7.32667 9.21167 7.58667 8.95167 7.58667 8.63167L7.58667 7.61167C8.71667 7.31167 9.45667 6.22167 9.30667 5.06167C9.15667 3.90167 8.17667 3.02167 6.99667 3.02167C5.71667 3.02167 4.66667 4.07167 4.66667 5.35167C4.66667 5.68167 4.92667 5.94167 5.24667 5.94167C5.57667 5.94167 5.83667 5.68167 5.83667 5.35167C5.83667 4.71167 6.35667 4.19167 6.99667 4.19167Z M6.70667 10.9425C6.88667 11.0425 7.10667 11.0425 7.29667 10.9425C7.47667 10.8325 7.58667 10.6425 7.58667 10.4325C7.58667 10.1125 7.32667 9.8525 6.99667 9.8525C6.67667 9.8525 6.41667 10.1125 6.41667 10.4325C6.41667 10.6425 6.52667 10.8325 6.70667 10.9425Z " />
          </g>
        </g>
      </svg>
      <div class="tip">矩阵范围为3~7 请输入合适数值</div>
    </div>
  </li>
</template>

<script setup>
import { ref, nextTick, inject, watch, onMounted } from "vue";
import { nanoid } from "nanoid";

const emit = defineEmits(["updateamount"]);
const props = defineProps(["quesitem", "index", "content"]);
// let width = ref(500)
// let block
// onMounted(() => {
//   let block = document.getElementsByClassName("block")
//   width.value = block[0].clientWidth
//   console.log(block[0]);
// })
// window.onresize = () => {
//   console.log(block);
//   console.log(block[0]);
//   width.value = block[0].clientWidth
//   console.log(width);
// }
//鼠标滚轮在添加新题目时滑动到底部
let { scroll, updatescroll } = inject("changescroll");
//添加问题
function addamount() {
  const quesobj = {
    question: { detail: "", type: 0 },
    options: [
      { detail: "" },
      { detail: "" },
      { detail: "" },
      { detail: "" },
      { detail: "" },
    ],
    id: nanoid(),
    series: 5,
  };
  props.content.matrixfile.push(quesobj);
}

//删除问题
let deletematrix = ref(null);
function cursorfail() {
  if (props.content.matrixfile.length == 1) {
    deletematrix.value.style.cursor = "not-allowed";
  }
  if (props.content.matrixfile.length != 1) {
    deletematrix.value.style.cursor = "pointer";
  }
}
function deleteamount(id) {
  if (props.content.matrixfile.length != 1) {
    ElMessageBox.confirm(
      '确定删除吗?',
      '删除题目',
      {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
      .then(() => {
        props.content.matrixfile.splice(props.index, 1)
      })
      .catch(() => {
      })
  }
}
//级别个数
watch(
  () => props.quesitem.series,
  (newValue, oldValue) => {
    if (newValue > oldValue) {
      for (let i = 0; i < newValue - oldValue; i++) {
        props.quesitem.options.push({ detail: "" });
      }
    }
    if (newValue < oldValue) {
      for (let i = 0; i < oldValue - newValue; i++) {
        props.quesitem.options.pop();
      }
    }
    console.log(props.quesitem.options);
  },
  { deep: true }
);
//级数样式
let blocknum = ref(5);
//滑块样式改变
let num = ref(0);
//次级题目
const value1 = ref(true);
//题目标题
let questitle = ref(null);
let questitleshow = ref(true);
function changeqlshow() {
  questitleshow.value = false;
  nextTick(() => {
    questitle.value.focus();
  });
}

//提示
function tip() {
  if (props.quesitem.series > 7 || props.quesitem.series < 3) {
    alert("级别个数需大于3个,小于7个");
    props.quesitem.series = 7;
  }
}

//动画
// let disappear = ref(false);
</script>

<style lang="less" scoped>
li {
  height: 200px;

  .itemnav {
    display: flex;
    align-items: center;
    width: 100%;
    height: 30px;
    position: relative;

    .type {
      width: 60px;
      height: 24px;
      margin: 0 34px;
      text-align: center;
      line-height: 24px;
      opacity: 1;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(217, 217, 217, 1);
    }

    i {
      font-style: normal;
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

  .questitle {
    display: flex;
    margin: 5px 40px 5px 39px;
    font-size: 16px;
    font-weight: 500;
    border: 1px solid transparent;
    color: rgba(0, 0, 0, 1);
    word-wrap: break-word; //超出页面自动换行

    &:hover {
      border: 1px dashed rgba(30, 111, 255, 1);
    }

    .titlecon {
      width: 700px;
      height: fit-content;
      margin-left: 5px;
    }

    >div.el-textarea {
      display: block;

      :deep(textarea) {
        width: 700px;
        height: auto;
        opacity: 1;
        text-align: left;
        border: none;
        margin-left: 5px;
        margin-top: 3px;
        outline: none;
        resize: none;
        box-shadow: none;
        padding: 0;
      }

    }
  }

  .block {
    @Height: 20px;
    @Width: 500px;
    @barWidth: 5px;
    @barHeight: 30px;
    @thumbSize: @Height+4px;
    @themeColor: rgba(30, 111, 255, 1);

    input[type="number"] {
      /* 清除原有input样式 */
      -web-kit-appearance: none;
      outline: 0;
      /* 设置我们要的样式 */
      width: 60px;
      height: 16px;
      opacity: 1;
      border: 1px solid rgba(166, 166, 166, 1);
      text-align: center;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none !important;
      appearance: none !important;
      margin: 0;
    }

    display: block;
    height: @Height;
    width: @Width;
    margin-left: 15px;
    background-color: rgba(245, 245, 245, 1);
    position: relative;
    top: 50px;
    left: 50px;

    >div.bar1 {
      position: absolute;
      z-index: 1;
      bottom: 0;
      left: -2px;
      height: @barHeight;
      width: @barWidth;
      background-color: rgba(204, 204, 204, 1);
      cursor: pointer;

      input {
        position: absolute;
        bottom: 31px;
        left: -36px;
      }

      input[type="text"] {
        /* 清除原有input样式 */
        -web-kit-appearance: none;
        outline: 0;
        /* 设置我们要的样式 */
        width: 80px;
        height: 20px;
        opacity: 1;
        border: 1px solid rgba(166, 166, 166, 1);
        text-align: center;
      }
    }

    >div.thumb {
      position: absolute;
      z-index: 2;
      bottom: -2px;
      left: calc(0px - @thumbSize / 2); //thumbSize=24px
      height: @thumbSize;
      width: @thumbSize;
      background-color: @themeColor;
      border-radius: 5px;
      transition: all 0.2s linear;

      &::before {
        content: "";
        position: absolute;
        top: calc((@thumbSize - 8px) / 2);
        left: calc((@thumbSize - 2px) / 2 - 3px);
        height: 8px;
        width: 1.5px;
        background-color: rgb(255, 255, 255);
      }

      &::after {
        content: "";
        position: absolute;
        top: calc((@thumbSize - 8px) / 2);
        left: calc((@thumbSize - 2px) / 2 + 3px);
        height: 8px;
        width: 1.5px;
        background-color: rgb(255, 255, 255);
      }
    }

    .blocknum {
      position: absolute;
      left: 550px;
      bottom: 10px;
    }

    svg {
      position: absolute;
      bottom: 10px;
      left: 625px;

      &:hover+.tip {
        display: block;
      }
    }

    .tip {
      display: none;
      position: absolute;
      bottom: 43px;
      left: 540px;
      width: 98px;
      height: 50px;
      padding-top: 10px;
      text-align: center;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.15);
      font-size: 12px;
      font-weight: 400;
      word-wrap: break-word; //超出页面自动换行

      &::after {
        content: "";
        position: absolute;
        bottom: -15px;
        right: 2px;
        border-bottom: 20px solid transparent;
        border-right: 17px solid rgba(255, 255, 255, 1);
        border-top: 3px solid transparent;
        border-left: 7px solid transparent;
      }
    }
  }
}
</style>