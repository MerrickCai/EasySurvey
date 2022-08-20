<template>
  <li>
    <p class="itemnav">
      <span class="type">矩阵</span>
      <i class="sttitle">
        创建次级题目
        <el-switch v-model="value1" :style="{ cursor: 'not-allowed' }" />
      </i>
      <i class="additem" @click="addamount(), updatescroll()">+</i>
      <i
        class="delitem"
        @click="deleteamount(quesitem.id)"
        ref="deletematrix"
        @mousemove="cursorfail"
        >×</i
      >
    </p>
    <p class="questitle">
      <span>{{ fileword.quesList.indexOf(quesitem) + 1 }}</span>
      <span class="titlecon" v-show="questitleshow" @click="changeqlshow">
        {{ quesitem.ques }}
      </span>
      <input
        type="text"
        ref="questitle"
        v-show="!questitleshow"
        v-model="quesitem.ques"
        @blur="questitleshow = true"
        @keyup.enter="questitleshow = true"
      />
    </p>
    <div class="block" style="backgroundcolor: rgb(229, 229, 229)">
      <div
        v-for="index in blocknum"
        class="bar1"
        @click="num = index"
        :style="{ left: `${(600 / (blocknum - 1)) * (index - 1)}px` }"
      >
        <input type="text" v-model="quesitem.font[index]" />
      </div>
      <div
        class="thumb"
        :style="{
          left: `${
            num === 0 ? -10 : -10 + (600 / (blocknum - 1)) * (num - 1)
          }px`,
        }"
      ></div>
      <input
        type="number"
        class="blocknum"
        v-model.number="quesitem.series"
        oninput="if(value>7)value=7;if(value<3)value=3"
        max="7"
        min="3"
        @change="num = 0"
      />
      <img src="/tip.png" alt="" />
      <div class="tip">矩阵范围为3~7 请输入合适数值</div>
    </div>
  </li>
</template>

<script setup>
import { ref, nextTick, inject } from "vue";
import { nanoid } from "nanoid";

const emit = defineEmits(["updateamount"]);
const props = defineProps(["quesitem", "fileword", "receive", "deleteques"]);
//鼠标滚轮在添加新题目时滑动到底部
let { scroll, updatescroll } = inject("changescroll");
//添加问题
function addamount() {
  const quesobj = {
    id: nanoid(),
    ques: "请输入题目标题",
    value: 0,
    series: 5,
    font: [],
  };
  props.receive(quesobj);
  console.log(props.fileword.quesList);
}
//删除问题
let deletematrix = ref(null);
function cursorfail() {
  if (props.fileword.quesList.length == 1) {
    deletematrix.value.style.cursor = "not-allowed";
  }
  if (props.fileword.quesList.length != 1) {
    deletematrix.value.style.cursor = "pointer";
  }
}
function deleteamount(id) {
  if (props.fileword.quesList.length != 1) {
    props.deleteques(id);
  }
}

//级数样式
let blocknum = ref(5);
//滑块样式改变
let num = ref(0);
//次级题目
const value1 = ref(true);
//题目标题
let matrixtitle = ref("请输入题目标题");
let questitle = ref(null);
let questitleshow = ref(true);
function changeqlshow() {
  questitleshow.value = false;
  nextTick(() => {
    questitle.value.focus();
  });
}

//动画
let disappear = ref(false);
</script>

<style lang="less" scoped>
// .disappearques {
//   animation: disappear 0.5s forwards;
// }
// @keyframes disappear {
//   0% {
//     opacity: 1;
//     transform: scale(1);
//   }
//   100% {
//     opacity: 0.7;
//     transform: scale(0.8);
//   }
// }
li {
  height: 200px;
  // box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.25);

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
    .sttitle {
      margin-top: 5px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(30, 111, 255, 1);
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
      width: 200px;
      margin-left: 5px;
    }
    input[type="text"] {
      /* 清除原有input样式 */
      -web-kit-appearance: none;
      -moz-appearance: none;
      outline: 0;
      /* 设置我们要的样式 */
      width: 700px;
      height: 20px;
      opacity: 1;
      text-align: left;
    }
  }

  .block {
    @Height: 20px;
    @Width: 600px;
    @barWidth: 5px;
    @barHeight: 30px;
    @thumbSize: @Height+4px;
    @themeColor: rgba(30, 111, 255, 1);
    input[type="number"] {
      /* 清除原有input样式 */
      -web-kit-appearance: none;
      -moz-appearance: none;
      outline: 0;
      /* 设置我们要的样式 */
      width: 60px;
      height: 16px;
      opacity: 1;
      border: 1px solid rgba(166, 166, 166, 1);
      text-align: center;
    }
    display: block;
    height: @Height;
    width: @Width;
    margin-left: 15px;
    background-color: rgba(245, 245, 245, 1);
    position: relative;
    top: 50px;
    left: 50px;

    > div.bar1 {
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
        -moz-appearance: none;
        outline: 0;
        /* 设置我们要的样式 */
        width: 80px;
        height: 20px;
        opacity: 1;
        border: 1px solid rgba(166, 166, 166, 1);
        text-align: center;
      }
    }
    > div.thumb {
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
      left: 670px;
      bottom: 10px;
    }
    img {
      position: absolute;
      bottom: 10px;
      left: 748px;
      &:hover + .tip {
        display: block;
      }
    }
    .tip {
      display: none;
      position: absolute;
      bottom: 43px;
      left: 660px;
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