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
    <p class="questitle">
      <span>{{ radiofile.questionList.indexOf(quesitem) + 1 }}</span>
      <span class="titlecon" v-show="questitleshow" @click="changeqlshow">
        {{ quesitem.questiontitle }}
      </span>
      <input
        type="text"
        ref="questitle"
        v-show="!questitleshow"
        v-model="quesitem.questiontitle"
        @blur="questitleshow = true"
        @keyup.enter="questitleshow = true"
      />
    </p>
    <p class="optionall" v-for="i in quesitem.option.length">
      <span class="circle"></span>
      <span class="option" v-show="!optionshow[i]" @click="optionsshow(i)">
        {{ quesitem.option[i - 1] }}
      </span>
      <input
        type="text"
        ref="optiontitle"
        v-show="optionshow[i]"
        v-model="quesitem.option[i - 1]"
        @blur="optionshow[i] = false"
        @keyup.enter="optionshow[i] = false"
      />
      <i
        class="deloption"
        @click="deleoption(i)"
        ref="deleteo"
        @mousemove="opcursorfail"
        >×</i
      >
    </p>
    <p class="addoption">
      <i class="additem" @click="addaoption()">+</i>
      <input
        type="text"
        name=""
        id=""
        placeholder="添加选项"
        @keyup.enter="addaoption()"
        v-model="xuanze"
      />
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
//题目标题
let questitle = ref(null);
let questitleshow = ref(true);
function changeqlshow() {
  questitleshow.value = false;
  nextTick(() => {
    questitle.value.focus();
  });
}
//选项题目标题
let optiontitle = ref([]);
let optionshow = ref([]);

function optionsshow(index) {
  optionshow.value[index] = true;
  nextTick(() => {
    optiontitle.value[index - 1].focus();
  });
}
//添加选项
let xuanze = ref("");
function addaoption() {
  props.quesitem.option.push(xuanze.value);
}
//删除选项
// let deleteo = ref(null);
// function opcursorfail() {
//   if (props.quesitem.option.length == 1) {
//     deleteo.value.style.cursor = "not-allowed";
//   }
//   if (props.quesitem.option.length != 1) {
//     deleteo.value.style.cursor = "pointer";
//   }
// }
function deleoption(id) {
  if (props.quesitem.option.length != 1) {
    props.quesitem.option.splice(id - 1, 1);
  }
  console.log(props.quesitem.option.length);
}
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
  .optionall {
    display: flex;
    height: 20px;
    margin: 5px 0 5px 55px;
    .circle {
      width: 18px;
      height: 18px;
      border: 2px solid rgba(217, 217, 217, 1);
      border-radius: 100%;
    }
    .option {
      display: block;
      width: 600px;
      margin-left: 5px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
    }
    input[type="text"] {
      /* 清除原有input样式 */
      -web-kit-appearance: none;
      -moz-appearance: none;
      outline: 0;
      /* 设置我们要的样式 */
      width: 600px;
      height: 20px;
      opacity: 1;
      text-align: left;
    }
    .deloption {
      cursor: pointer;
      font-size: 25px;
      font-weight: 400;
      color: rgba(30, 111, 255, 1);
      font-style: normal;
    }
  }
  .addoption {
    position: relative;
    .additem {
      cursor: pointer;
      position: absolute;
      left: 54px;
      font-size: 25px;
      font-weight: 400;
      color: rgba(30, 111, 255, 1);
      font-style: normal;
    }
    input[type="text"] {
      /* 清除原有input样式 */
      -web-kit-appearance: none;
      -moz-appearance: none;
      outline: none;
      /* 设置我们要的样式 */
      width: 500px;
      height: 20px;
      opacity: 1;
      text-align: left;
      border-width: 0;
    }
    input {
      position: absolute;
      top: 8px;
      left: 77px;
    }
  }
}
</style>