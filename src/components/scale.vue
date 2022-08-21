<template>
  <li>
    <p class="itemnav">
      <span class="type">量表</span>
      <i class="sttitle">
        显示可支配分数
        <el-switch v-model="value1" :style="{ cursor: 'not-allowed' }" />
         <img src="/tip.png" alt="" />
      <div class="tip">可支配分数为当前题目可动用总分数，即下方输入框里所输入的分数，若开启创建次级题目，则为所有次级题目的分数之和。</div>
      </i>
      <i class="additem" @click="addamount(), updatescroll()">+</i>
      <i class="delitem" @click="deleteamount(quesitem.id)"
        ref="deletematrix"
        @mousemove="cursorfail">×</i>
    </p>
    <p class="questitle">
      <span>{{ scalefile.questionList.indexOf(quesitem) + 1 }}</span>
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
    <div class="secquesall">
    <p class="secques" v-for="(item, i) in quesitem.question">
      <i class="additem" @click="addsectitle()">+</i>
      <span>{{ quesitem.question.indexOf(item) + 1 }}</span>
      <span
        class="secquestitlecon"
        v-show="!secquestitleshow[i]"
        @click="secchangeqlshow(i)"
      >
        {{ item.detail }}
      </span>
      <input
        type="text"
        ref="secquestitle"
        v-show="secquestitleshow[i]"
        v-model="item.detail"
        @blur="secquestitleshow[i] = false"
        @keyup.enter="secquestitleshow[i] = false"
      />
       <div class="slide" :style="{backgroundColor:`${quesitem.bcg}`}">   <!--400为slide的总宽度，根据分数总数来定每次滑块滑多少-->
         <div class="Gradient" :style="{ width:`${(item.value)* (400/(barArr[0].length-1))}px` }"></div>
                <!-- 第三层循环 b,j -->
              <div v-for="(b,j) of barArr[0]" :key="i" :class="j%2===0 ? 'doublebar' :'bar'" @click="distributeScore(item,quesitem,j)">
                 <span class="num" v-if="!(j%2)">{{j}}</span>
              </div>
              <img class="thumb" :style="{ left: `${(item.value) * (400/(barArr[0].length-1))}px`}"  :src="item.value===0 ? quesitem.silderSrc : '/blue.png'">	
              <span class="edit"  v-show="!item.isEdit" @click="editHandle(item,i)">{{item.value}}<img src="/icon-edit.png"></span>
             <input class="editinput" type="text" v-show="item.isEdit" @blur="editHandle2(item,quesitem,$event)"  @keydown.enter="editHandle2(itequesitem$event)"  :value="item.value" ref="myRef">
        </div>  
    </p>
    </div>
  </li>
</template>

<script setup>
import { ref, nextTick, reactive, inject } from "vue";
import { nanoid } from "nanoid";

const props = defineProps(["scalefile", "quesitem", "sreceive", "sdeleteques"]);
//鼠标滚轮在添加新题目时滑动到底部
let { scroll, updatescroll } = inject("changescroll");
//添加主问题
function addamount() {
  const quesobj = {
    id: nanoid(),
    questiontitle: "请输入题目标题",
    score: 10,
    //分配分数的时候要用到staticScore
    staticScore: 10,
    // slider的背景颜色
    bcg: "#f5f5f5",
    //滑块的样式
    silderSrc: "/blue.png",
    titleBorder: 0,
    progressPartbcg: "#ccc",
    question: [{ detail: "请输入次级题目标题", value: 0, isEdit: false }],
  };
  props.sreceive(quesobj);
}
//删除主问题
let deletematrix = ref(null);
function cursorfail() {
  if (props.scalefile.questionList.length == 1) {
    deletematrix.value.style.cursor = "not-allowed";
  }
  if (props.scalefile.questionList.length != 1) {
    deletematrix.value.style.cursor = "pointer";
  }
}
function deleteamount(id) {
  if (props.scalefile.questionList.length != 1) {
    props.sdeleteques(id);
  }
}
//题目标题
let questitle = ref(null);
let questitleshow = ref(true);
function changeqlshow() {
  questitleshow.value = false;
  console.log(questitle.value);
  nextTick(() => {
    questitle.value.focus();
  });
}
//次级题目标题
let secquestitle = ref([]);
let secquestitleshow = ref([]);

function secchangeqlshow(index) {
  secquestitleshow.value[index] = true;
  nextTick(() => {
    secquestitle.value[index].focus();
  });
}
//次级题目
const value1 = ref(true);
//添加次级题目
function addsectitle() {
  const secques = { detail: "请输入次级题目标题", value: 0, isEdit: false };
  props.quesitem.question.push(secques);
}

//量表
const barArr = new Array(1)
  .fill(0)
  .map(
    (item, index) => new Array(props.scalefile.questionList[index].score + 1)
  );
//按照分数分配
function distributeScore(elem, item, num) {
  let newValue = num / 1;
  let oldValue = elem.value / 1;
  const staticScore = props.scalefile.questionList[0].score;
  if (item.score <= 0) {
    if (oldValue < newValue) {
      return;
    }
  }
  if (item.score < newValue - oldValue) return;

  elem.value = num;
  item.score = item.staticScore;
  item.question.forEach((e) => {
    item.score -= e.value;
  });
  //   按照分数，如果分配完了背景颜色改变
  if (item.score === 0) {
    item.bcg = "#e5e5e5";
    item.silderSrc = "/disable.png";
  }
  if (item.score > 0) {
    item.bcg = "#f5f5f5";
    item.silderSrc = "/blue.png";
  }
  // console.log(elem.value);
  //  console.log(-6+(elem.value)*40);
}
// 切换编辑的input框
const myRef = ref(null);
// 切换至编辑
function editHandle(item, index) {
  item.isEdit = true;
  // 默认获取焦点
  nextTick(() => {
    myRef.value[index].focus();
  });
}
// 编辑状态保存分数
function editHandle2(elem, item, e) {
  elem.isEdit = false;
  if (isNaN(e.target.value) || e.target.value > 10 || e.target.value < 0) {
    alert("分数仅限定在0~10之间");
    return;
  }
  distributeScore(elem, item, e.target.value);
}
</script>

<style lang="less" scoped>
li {
  // height: 200px;
  // box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.25);
  margin-bottom: 60px;
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
      position: relative;
      margin-top: 5px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(30, 111, 255, 1);
      img {
        position: absolute;
        left: 140px;
        top: 8px;
        &:hover + .tip {
          display: block;
        }
      }
      .tip {
        display: none;
        position: absolute;
        left: 170px;
        top: -37px;
        width: 185px;
        height: 80px;
        padding: 8px;
        text-align: center;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.15);
        font-size: 12px;
        font-weight: 400;
        word-wrap: break-word; //超出页面自动换行
        &::after {
          content: "";
          position: absolute;
          top: 27px;
          left: -9px;
          width: 20px;
          height: 20px;
          background-color: white;
          clip-path: polygon(50% 0, 100% 0, 0 100%, 50% 0);
        }
      }
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
  .secquesall {
    // height: 70px;
    // overflow: auto;
    .secques {
      position: relative;
      margin: 10px 40px 35px 35px;
      font-size: 16px;
      font-weight: 500;
      border: 1px solid transparent;
      color: rgba(0, 0, 0, 1);
      word-wrap: break-word; //超出页面自动换行
      // &:hover {
      //   border: 1px dashed rgba(30, 111, 255, 1);
      // }
      .additem {
        cursor: pointer;
        margin-right: 5px;
        font-size: 20px;
        font-weight: 700;
        color: rgba(30, 111, 255, 1);
        font-style: normal;
      }
      .secquestitlecon {
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
      .slide {
        // 400+4（其中的4为末尾一个bar的宽度，所以总宽度为404。
        width: 404px;
        height: 8px;
        background-color: #f5f5f5;
        box-sizing: border-box;
        position: absolute;
        left: 45px;
        top: 45px;
        display: flex;
        justify-content: space-between;
        background-color: pink;
        @Width: 400px;
        .barStyle() {
          width: 4px;
          height: 11px;
          border-radius: 2px;
          background-color: rgba(204, 204, 204, 1);
          transform: translateY(-3px);
          cursor: pointer;
        }
        .bar {
          .barStyle();
        }
        .num {
          position: absolute;
          top: -15px;
          right: -5px;
          height: 15px;
          width: 15px;
          color: #cccccc;
          font-size: 8px;
          text-align: center;
          display: block;
        }
        .doublebar {
          .barStyle();
          transform: translateY(-7px);
          height: 15px;
        }
        .Gradient {
          width: 0px;
          height: 8px;
          background: linear-gradient(
            90deg,
            rgba(194, 225, 254, 1) 0%,
            #78a5f1 100%
          );
          position: absolute;
          left: 0;
          z-index: 9;
          pointer-events: none;
          transition: all 0.2s linear;
        }

        @thumbSize: 14px;
        @themeColor: #1e6fff;
        img.thumb {
          position: absolute;
          // z-index: 2;
          bottom: -2px;
          // left: calc(0px - @thumbSize/2); //thumbSize=24px
          height: @thumbSize;
          width: @thumbSize;
          object-fit: cover;
          transform: translateX(-5px);
          // border-radius: 5px;
          transition: all 0.2s linear;
          z-index: 10;
        }
        .edit {
          display: inline-block;
          width: 24px;
          height: 14px;
          position: absolute;
          right: -40px;
          bottom: 0px;
          cursor: pointer;
          font-size: 10px;
          color: rgba(140, 140, 140, 1);
          display: flex;
          text-align: left;
          justify-content: space-between;
          img {
            width: 16px;
            height: 16px;
          }
        }
        .editinput {
          width: 24px;
          height: 16px;
          outline: none;
          border: #4791ff 1px solid;
          text-align: center;
          color: rgba(140, 140, 140, 1);
          position: absolute;
          right: -42px;
          bottom: 0px;
        }
      }
    }
  }
}
</style>