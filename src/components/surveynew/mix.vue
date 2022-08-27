<template>
  <li>
    <p class="itemnav">
      <select name="" class="type" @change="typechange(index)">
        <option selected>单选</option>
        <option>多选</option>
        <option>文本</option>
      </select>
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
      <span>{{ mixfile.indexOf(quesitem) + 1 }}</span>
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
    <div class="radiotype" v-show="titletype=='单选'">
    <el-scrollbar max-height="400px">
      <p class="optionall" v-for="(con, index) in quesitem.options">
        <span class="circle"></span>
        <span
          class="option"
          v-show="!optionshow[index]"
          @click="optionsshow(index, con)"
        >
          {{ con.detail }}
        </span>
        <input
          type="text"
          ref="optiontitle"
          v-show="optionshow[index]"
          v-model="con.detail"
          @blur="optionshow[index] = false"
          @keyup.enter="optionshow[index] = false"
        />
        <i
          class="deloption"
          @click="deleoption(index, con)"
          ref="deleteo"
          @mousemove="opcursorfail"
          >×</i
        >
      </p>
      <p class="addoption">
        <i class="additem" @click="addaoption()">+</i>
        <span>添加选项</span>
      </p>
    </el-scrollbar>
    </div>
    <div class="checkboxtype" v-show="titletype=='多选'">
     <el-scrollbar max-height="400px">
      <p class="optionall" v-for="(con, i) in quesitem.options">
        <span class="fang"></span>
        <span class="option" v-show="!optionshow[i]" @click="optionsshow(i)">
          {{ con.detail }}
        </span>
        <input
          type="text"
          ref="optiontitle"
          v-show="optionshow[i]"
          v-model="con.detail"
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
        <span>添加选项</span>
      </p>
    </el-scrollbar></div>
    <div class="texttype" v-show="titletype=='文本'">
    <p class="quesarea"></p></div>

  </li>
</template>

<script setup>
import { ref, nextTick, inject, reactive } from "vue";
import { nanoid } from "nanoid";
const props = defineProps(["quesitem", "mixfile", "mixreceive", "mixdeleteques","index"]);
let titletype=ref('单选')
function typechange(index) {
    var obj=document.getElementsByTagName('select')
    console.log(obj);
    console.log(obj[index]);
    console.log(obj[index].options[obj[index].selectedIndex]);
    console.log(obj[index].options[obj[index].selectedIndex].text);
    console.log(obj[index].selectedIndex);
    //obj.selectedIndex为选中的option的索引,obj.options[obj.selectedIndex].text为选中的文本
    titletype.value=obj[index].options[obj[index].selectedIndex].text
    console.log(props.mixfile);
}
//鼠标滚轮在添加新题目时滑动到底部
let { scroll, updatescroll } = inject("changescroll");
//添加问题
function addamount() {
  const quesobj = {
    id: nanoid(),
    question: { detail: "请输入题目标题", type: 0 },
    options: [{ detail: "选项" }],
  };
  props.mixreceive(quesobj);
}
//删除问题
let deletematrix = ref(null);
function cursorfail() {
  if (props.mixfile.length == 1) {
    deletematrix.value.style.cursor = "not-allowed";
  }
  if (props.mixfile.length != 1) {
    deletematrix.value.style.cursor = "pointer";
  }
}
function deleteamount(id) {
  if (props.mixfile.length != 1) {
    props.mixdeleteques(id);
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

function optionsshow(index, con) {
  optionshow.value[index] = true;
  nextTick(() => {
    optiontitle.value[index].focus();
  });
}
//添加选项
function addaoption() {
  props.quesitem.options.push({ detail: "选项" });
}
function deleoption(id, con) {
  console.log(con);
  if (props.quesitem.options.length != 1) {
    props.quesitem.options.splice(id, 1);
  }
  console.log(props.quesitem);
}
</script>

<style lang="less" scoped>
li {
//   height: 200px;
  // box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.25);

  .itemnav {
    display: flex;
    align-items: center;
    width: 100%;
    height: 30px;
    position: relative;
    #type {
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
  .el-scrollbar {
    width: 720px;
    height: 130px;

    --el-scrollbar-opacity: 0.3;
    --el-scrollbar-bg-color: rgba(71, 145, 255, 1);
    --el-scrollbar-hover-opacity: 0.5;
    --el-scrollbar-hover-bg-color: rgba(71, 145, 255, 1);

    .el-scrollbar__bar {
      width: 8px;
      position: absolute;
      right: 0;
    }

    .optionall {
      display: flex;
      height: 20px;
      height: fit-content;
      margin: 5px 0 5px 37px;
      .circle {
        width: 18px;
        height: 18px;
        border: 2px solid rgba(217, 217, 217, 1);
        border-radius: 100%;
      }
       .fang {
        width: 18px;
        height: 18px;
        border: 2px solid rgba(217, 217, 217, 1);
      }
      .option {
        display: block;
        width: 500px;
        height: fit-content;
        word-wrap: break-word; //超出页面自动换行

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
        width: 500px;
        height: 20px;
        opacity: 1;
        text-align: left;
      }
      .deloption {
        cursor: pointer;
        font-size: 20px;
        font-weight: 400;
        color: rgba(30, 111, 255, 1);
        font-style: normal;
      }
    }
  }
  .addoption {
    display: flex;
    .additem {
      cursor: pointer;
      margin-left: 37px;
      font-size: 25px;
      font-weight: 400;
      color: rgba(30, 111, 255, 1);
      font-style: normal;
    }
    span {
      cursor: default;
      margin-top: 10px;
      margin-left: 10px;
      opacity: 1;
      text-align: left;
      border-width: 0;
    }
  }


    .quesarea {
    width: 600px;
    height: 30px;
    margin-left: 34px;
    border: 1px solid rgba(217, 217, 217, 1);
    margin-bottom: 20px;
  }
   
}
</style>