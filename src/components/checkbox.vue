<template>
  <li>
    <p class="itemnav">
      <span class="type">单选</span>
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
  </li>
</template>

<script setup>
import { ref, nextTick, inject } from "vue";
import { nanoid } from "nanoid";
const props = defineProps(["quesitem", "radiofile", "rreceive", "rdeleteques"]);
//鼠标滚轮在添加新题目时滑动到底部
let { scroll, updatescroll } = inject("changescroll");
//添加问题
function addamount() {
  const quesobj = {
    id: nanoid(),
    questiontitle: "请输入题目标题",
    option: ["选项", "选项"],
  };
  props.rreceive(quesobj);
}
//删除问题
let deletematrix = ref(null);
function cursorfail() {
  if (props.radiofile.questionList.length == 1) {
    deletematrix.value.style.cursor = "not-allowed";
  }
  if (props.radiofile.questionList.length != 1) {
    deletematrix.value.style.cursor = "pointer";
  }
}
function deleteamount(id) {
  if (props.radiofile.questionList.length != 1) {
    props.rdeleteques(id);
  }
}
//次级题目
const value1 = ref(true);
</script>

<style lang="less" scoped>
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
}
</style>