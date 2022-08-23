<template>
  <li>
    <p class="itemnav">
      <span class="type">文本</span>
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
      <span>{{ textfile.indexOf(quesitem) + 1 }}</span>
      <span class="titlecon" v-show="questitleshow" @click="changeqlshow">
        {{ quesitem.question.detail }}
      </span>
      <input
        type="text"
        ref="questitle"
        v-show="!questitleshow"
        v-model="quesitem.question.detail"
        @blur="questitleshow = true"
        @keyup.enter="questitleshow = true"
      />
    </p>
    <p class="quesarea"></p>
  </li>
</template>

<script setup>
import { ref, nextTick, inject } from "vue";
import { nanoid } from "nanoid";
const props = defineProps(["quesitem", "textfile", "treceive", "tdeleteques"]);
//鼠标滚轮在添加新题目时滑动到底部
let { scroll, updatescroll } = inject("changescroll");
//添加问题
function addamount() {
  const quesobj = {
    question: { detail: "请输入题目标题", type: 2 },
    id: nanoid(),
  };
  props.treceive(quesobj);
}
//删除问题
let deletematrix = ref(null);
function cursorfail() {
  if (props.textfile.length == 1) {
    deletematrix.value.style.cursor = "not-allowed";
  }
  if (props.textfile.length != 1) {
    deletematrix.value.style.cursor = "pointer";
  }
}
function deleteamount(id) {
  if (props.textfile.length != 1) {
    props.tdeleteques(id);
  }
}
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
</script>

<style lang="less" scoped>
li {
  height: 100px;
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
    margin: 5px 40px 5px 34px;
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
      height: 20px;
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
  .quesarea {
    width: 700px;
    height: 30px;
    margin-left: 34px;
    border: 1px solid rgba(217, 217, 217, 1);
  }
}
</style>