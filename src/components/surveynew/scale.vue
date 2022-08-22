
<template>
  <li>
    <p class="itemnav">
      <span class="type">量表</span>
      <i class="sttitle">
        显示可支配分数
        <el-switch v-model="value1" :style="{ cursor: 'not-allowed' }" />
         <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14" viewBox="0 0 14 14" fill="none"><defs><rect id="path_0" x="0" y="0" width="14" height="14" /></defs><g opacity="1" transform="translate(0 0)  rotate(0 7 7)"><mask id="bg-mask-0" fill="white"><use xlink:href="#path_0"></use></mask><g mask="url(#bg-mask-0)" ><path id="分组 1" fill-rule="evenodd" style="fill:#1E6FFF" transform="translate(0 0)  rotate(0 7 7)" opacity="1" d="M0 7C0 10.87 3.13 14 7 14C10.87 14 14 10.87 14 7C14 3.14 10.86 0 7 0C3.13 0 0 3.13 0 7Z M12.8367 6.99667C12.8367 3.77667 10.2167 1.16667 6.99667 1.16667C3.77667 1.16667 1.16667 3.77667 1.16667 6.99667C1.16667 10.2167 3.77667 12.8367 6.99667 12.8367C10.2167 12.8367 12.8367 10.2167 12.8367 6.99667Z M6.99667 4.19167C7.64667 4.19167 8.16667 4.71167 8.16667 5.35167C8.16667 6.00167 7.64667 6.52167 6.99667 6.52167C6.67667 6.52167 6.41667 6.78167 6.41667 7.10167L6.41667 8.63167C6.41667 8.95167 6.67667 9.21167 6.99667 9.21167C7.32667 9.21167 7.58667 8.95167 7.58667 8.63167L7.58667 7.61167C8.71667 7.31167 9.45667 6.22167 9.30667 5.06167C9.15667 3.90167 8.17667 3.02167 6.99667 3.02167C5.71667 3.02167 4.66667 4.07167 4.66667 5.35167C4.66667 5.68167 4.92667 5.94167 5.24667 5.94167C5.57667 5.94167 5.83667 5.68167 5.83667 5.35167C5.83667 4.71167 6.35667 4.19167 6.99667 4.19167Z M6.70667 10.9425C6.88667 11.0425 7.10667 11.0425 7.29667 10.9425C7.47667 10.8325 7.58667 10.6425 7.58667 10.4325C7.58667 10.1125 7.32667 9.8525 6.99667 9.8525C6.67667 9.8525 6.41667 10.1125 6.41667 10.4325C6.41667 10.6425 6.52667 10.8325 6.70667 10.9425Z " /></g></g></svg>
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
      <div v-show="value1==true" class="scorebox">
      <span class="score">
        可支配分数
        </span>
        <input type="number"  class="scoreshow" v-model="quesitem.score">
        </div>
    </p>
    <div class="secquesall">
    <p class="secques" v-for="(item, i) in quesitem.question">
      <i class="additem" @click="addsectitle(i)">+</i>
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
         <i class="delrditem" @click="deleterd(i)"
        ref="deletesec"
        @mousemove="cursorfailrd">×</i>
       <div class="slide" :style="{backgroundColor:`${quesitem.bcg}`}">   <!--400为slide的总宽度，根据分数总数来定每次滑块滑多少-->
         <div class="Gradient" :style="{ width:`${(item.value)* (400/(barArr[0].length-1))}px` }"></div>
                <!-- 第三层循环 b,j -->
              <div v-for="(b,j) of barArr[0]" :key="b" :class="j%2===0 ? 'doublebar' :'bar'">
                 <span class="num" v-if="!(j%2)">{{j}}</span>
              </div>
              <img class="thumb" :style="{ left: `${(item.value) * (400/(barArr[0].length-1))}px`}"  :src="item.value===0 ? quesitem.silderSrc : '/blue.png'">	
              <span class="edit"  v-show="!item.isEdit" >{{item.value}}<img src="/icon-edit.png"></span>
             <input type="number" class="secnum" v-model="quesitem.secscore" 
        @blur="judge()"
        @keyup.enter="judge()">
        </div>  
    </p>
    </div>
  </li>
</template>

<script setup>
import { ref, nextTick, reactive, inject, watch } from "vue";
import { nanoid } from "nanoid";

const props = defineProps([
  "scalefile",
  "quesitem",
  "sreceive",
  "sdeleteques",
  "it",
]);
//鼠标滚轮在添加新题目时滑动到底部
let { scroll, updatescroll } = inject("changescroll");
//添加主问题
function addamount() {
  const quesobj = {
    id: nanoid(),
    questiontitle: "请输入题目标题",
    score: 20,
    //分配分数的时候要用到staticScore
    staticScore: 20,
    // slider的背景颜色
    bcg: "#f5f5f5",
    //滑块的样式
    silderSrc: "/blue.png",
    titleBorder: 0,
    progressPartbcg: "#ccc",
    secscore: 10,
    question: [{ detail: "请输入次级题目标题", value: 0, isEdit: false }],
  };
  props.sreceive(quesobj);
  console.log(1);
}

//删除主问题
let deletematrix = ref(null);
// function cursorfail() {
//   if (props.scalefile.questionList.length == 1) {
//     deletematrix.value.style.cursor = "not-allowed";
//   }
//   if (props.scalefile.questionList.length != 1) {
//     deletematrix.value.style.cursor = "pointer";
//   }
// }
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
function addsectitle(i) {
  const secques = {
    detail: "请输入次级题目标题",
    value: 0,
    isEdit: false,
  };
  props.quesitem.question.push(secques);
}
//删除次级题目
let deletesec = ref(null);
function deleterd(i) {
  console.log(i);
  if (props.quesitem.question.length != 1) {
    props.quesitem.question.splice(i, 1);
  }
}

//量表
const barArr = new Array(1)
  .fill(0)
  .map((item, index) => new Array(props.quesitem.secscore + 1));

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
  if (item.score < newValue - oldValue) {
    return;
  }

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
  if (
    isNaN(e.target.value) ||
    e.target.value > item.secscore ||
    e.target.value < 0
  ) {
    alert("分数仅限定在次级可支配分数之间");
    return;
  }
  distributeScore(elem, item, e.target.value);
}
//次级可支配数
function judge() {
  if (props.quesitem.secscore > props.quesitem.score) {
    alert("次级分配分数不可大于可支配分数,请重新输入");
    props.quesitem.secscore = 10;
  }
  if (props.quesitem.secscore > 20) {
    alert("次级分配分数不可大于20");
    props.quesitem.secscore = 10;
  }
  if (props.quesitem.secscore < 5) {
    alert("次级分配分数不可小于5");
    props.quesitem.secscore = 10;
  }
}
watch(
  () => props.quesitem.secscore,
  () => {
    console.log(4);
    barArr.splice(0, 1, props.quesitem.secscore + 1);
  },
  { deep: true }
);
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
      svg {
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
      font-style: normal;
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
      width: 400px;
      margin-left: 5px;
    }
    input[type="text"] {
      /* 清除原有input样式 */
      -web-kit-appearance: none;
      -moz-appearance: none;
      outline: 0;
      /* 设置我们要的样式 */
      width: 400px;
      height: 20px;
      opacity: 1;
      text-align: left;
    }
    .scorebox {
      display: flex;
      justify-content: space-between;
      width: 100px;
      .score {
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
      .scoreshow {
        display: block;
        width: 24px;
        height: 24px;
        margin-left: 5px;
        border-radius: 100%;
        background-color: rgba(30, 111, 255, 1);
        text-align: center;
        color: white;
      }
      input[type="number"] {
        /* 清除原有input样式 */
        -web-kit-appearance: none;
        -moz-appearance: none;
        outline: 0;
        -webkit-appearance: none !important;
        margin: 0;
        /* 设置我们要的样式 */
        border: 1px solid rgba(30, 111, 255, 1);
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
    }
  }
  .secquesall {
    // height: 70px;
    // overflow: auto;
    .secques {
      position: relative;
      margin: 10px 40px 35px 35px;
      padding-top: 5px;
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
        width: 600px;
        height: 20px;
        opacity: 1;
        text-align: left;
      }
      .delrditem {
        cursor: pointer;
        font-style: normal;
        position: absolute;
        right: 100px;
        font-size: 25px;
        font-weight: 400;
        color: rgba(30, 111, 255, 1);
      }
      .slide {
        // 400+4（其中的4为末尾一个bar的宽度，所以总宽度为404。
        width: 404px;
        height: 8px;
        background-color: #f5f5f5;
        box-sizing: border-box;
        position: absolute;
        left: 45px;
        top: 55px;
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
        .secnum {
          position: absolute;
          right: -115px;
          bottom: 0px;
          width: 60px;
          height: 24px;
          text-align: center;
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
      }
    }
  }
}
</style>