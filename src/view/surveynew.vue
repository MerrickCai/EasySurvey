
<template>
  <div class="wrapper">
    <img dog-ear src="/tangible.png" />
    <div class="decoration5"></div>
    <div class="decoration1"></div>
    <div class="decoration2"></div>
    <div class="decoration3"></div>
    <div class="decoration4"></div>

  <div class="newcon">
    <div class="newword">
      <!-- 新建问卷标题 -->
      <p class="newtitle" v-show="titleshow" @click="changetitleshow">
        {{ filetitle.info_title }}
      </p>
      <input
        type="text"
        ref="titlein"
        class="titlein"
        v-show="!titleshow"
        v-model="filetitle.info_title"
        @keyup.enter="titleshow = true"
        @blur="titleshow = true"
      />
      <!-- 新建问卷介绍 -->
      <p class="newintro">
        <span class="newintro_title">问卷介绍:</span>
        <p class="newintro_con" v-show="introshow" @click="changeintroshow">
          {{ filetitle.info_para }}
        </p>

        <textarea
          cols="30"
          rows="2"
          ref="introin"
          class="introin"
          v-show="!introshow"
          v-model="filetitle.info_para"
          @keyup.enter="introshow = true"
          @blur="introshow = true"
        ></textarea>
      </p>
    </div>
    <div class="quearea">
      <div class="questype">
        <span class="typetitle">请选择问卷类型:</span>
        <span class="typeall">
        <span :class="{typeclick:type==1}" @click="type=1">单选</span>
        <span :class="{typeclick:type==2}" @click="type=2">多选</span>
        <span :class="{typeclick:type==3}" @click="type=3">矩阵</span>
        <span :class="{typeclick:type==4}" @click="type=4">量表</span>
        <span :class="{typeclick:type==5}" @click="type=5">文本</span>
        </span>
      </div>
      <!-- 题目列表 -->
      <ul>
        <keep-alive>
        <component :is="typeview" :fileword="fileword" :receive="receive" :deleteques="deleteques" :scalefile="scalefile" :sreceive="sreceive" :sdeleteques="sdeleteques" :radiofile="radiofile" :rreceive="rreceive" :rdeleteques="rdeleteques" :checkboxfile="checkboxfile" :creceive="creceive" :cdeleteques="cdeleteques" :textfile="textfile" :treceive="treceive" :tdeleteques="tdeleteques"></component>               
        </keep-alive>
      </ul>
    </div>
    <button class="push" @click="pushfile($event)">发布问卷</button>
    <div class="mask" :style="{display:show}">
    <div class="sharefile">
      <span class="shareword">分享问卷</span>
      <span class="close" @click="disappear($event)">×</span>
      <span class="sharequick">快分享以上二维码或点击复制<a>链接</a>填答问卷吧！</span>
    </div>
    </div>
  </div>
    </div>
</template>

<script setup>
import {
  nextTick,
  onMounted,
  reactive,
  ref,
  provide,
  watch,
  computed,
} from "vue";
import { nanoid } from "nanoid";
import radiolist from "../components/surveynew/radiolist.vue";
import checkboxlist from "../components/surveynew/checkboxlist.vue";
import matrixlist from "../components/surveynew/matrixlist.vue";
import scalelist from "../components/surveynew/scalelist.vue";
import textlist from "../components/surveynew/textlist.vue";
import { useStore } from "../PiniaStores/index.js";
//数据
const datas = useStore();
//动态组件视图
let type = ref(1);
let typelist = [radiolist, checkboxlist, matrixlist, scalelist, textlist];
let typeview = computed(() => typelist[type.value - 1]);
//添加题目滚轮滑到最下方
let scroll = ref(0);
function updatescroll() {
  scroll.value = scroll.value + 1;
}
provide("changescroll", {
  scroll,
  updatescroll,
});
watch(scroll, () => {
  let div = document.getElementsByClassName("quearea");
  nextTick(() => {
    div[0].scrollTop = div[0].scrollHeight;
  });
});
//问卷标题介绍
let filetitle = reactive({
  info_title: "请输入问卷标题",
  info_para:
    "为了使问卷调查结果更加清晰，准确，请输入关于问卷的简短介绍以及注意事项，方便填写问卷的人更清晰的认识问卷，字数少于500字",
});
//存储矩阵问卷信息内容
let fileword = reactive({
  status: {
    intro: true,
    survey: false,
    end: false,
    toSurvey() {
      this.intro = false;
      this.end = false;
      this.survey = true;
    },
  },
  quesList: [
    {
      id: nanoid(),
      ques: "请输入题目标题",
      value: 0,
      series: 5,
      font: [],
    },
  ],
});

//问卷标题修改
let titleshow = ref(true);
let titlein = ref(null);
function changetitleshow() {
  titleshow.value = false;
  nextTick(() => {
    titlein.value.focus();
  });
}
//问卷介绍修改
let introshow = ref(true);
let introin = ref(null);
function changeintroshow() {
  introshow.value = false;
  nextTick(() => {
    introin.value.focus();
  });
}
//矩阵问卷新增问题
function receive(quesobj) {
  fileword.quesList.push(quesobj);
}
//矩阵问卷删除问题
function deleteques(id) {
  if (confirm("确定删除吗")) {
    fileword.quesList = fileword.quesList.filter((quesitem) => {
      return quesitem.id != id;
    });
  }
}

//存储量表问卷信息内容
let scalefile = reactive({
  questionIntro: {
    title: "",
    sec_title: "问卷介绍：",
    para: "",
  },
  questionList: [
    {
      id: nanoid(),
      questiontitle: "请输入题目标题",
      score: 60,
      //分配分数的时候要用到staticScore
      staticScore: 60,
      // slider的背景颜色
      bcg: "#f5f5f5",
      //滑块的样式
      silderSrc: "/blue.png",
      titleBorder: 0,
      progressPartbcg: "#ccc",
      secscore: 20,
      question: [
        {
          detail: "请输入次级题目标题",
          value: 0,
          isEdit: false,
        },
      ],
    },
  ],
});
//量表问卷新增问题
function sreceive(quesobj) {
  scalefile.questionList.push(quesobj);
}
//量表问卷删除问题
function sdeleteques(id) {
  if (confirm("确定删除吗")) {
    scalefile.questionList = scalefile.questionList.filter((quesitem) => {
      return quesitem.id != id;
    });
  }
}

//存储单选问卷信息内容
let radiofile = reactive({
  questionList: [
    {
      id: nanoid(),
      questiontitle: "请输入题目标题",
      option: ["选项", "选项"],
    },
  ],
});
//单选问卷新增问题
function rreceive(quesobj) {
  radiofile.questionList.push(quesobj);
}
//单选问卷删除问题
function rdeleteques(id) {
  if (confirm("确定删除吗")) {
    radiofile.questionList = radiofile.questionList.filter((quesitem) => {
      return quesitem.id != id;
    });
  }
}

//存储多选问卷信息内容
let checkboxfile = reactive({
  questionList: [
    {
      id: nanoid(),
      questiontitle: "请输入题目标题",
      option: ["选项", "选项"],
    },
  ],
});
//多选问卷新增问题
function creceive(quesobj) {
  checkboxfile.questionList.push(quesobj);
}
//多选问卷删除问题
function cdeleteques(id) {
  if (confirm("确定删除吗")) {
    checkboxfile.questionList = checkboxfile.questionList.filter((quesitem) => {
      return quesitem.id != id;
    });
  }
}

//存储文本问卷信息内容
let textfile = reactive({
  questionList: [
    {
      id: nanoid(),
      questiontitle: "请输入题目标题",
    },
  ],
});
//文本问卷新增问题
function treceive(quesobj) {
  textfile.questionList.push(quesobj);
}
//文本问卷删除问题
function tdeleteques(id) {
  if (confirm("确定删除吗")) {
    textfile.questionList = textfile.questionList.filter((quesitem) => {
      return quesitem.id != id;
    });
  }
}
//发布问卷
let show = ref("none");
function pushfile() {
  if (type.value == 1) {
    radiofile["intro"] = filetitle;
    console.log(radiofile);
    datas.survey.survey3.push(radiofile);
    console.log(datas.survey.survey3);
    radiofile = {
      questionList: [
        {
          id: nanoid(),
          questiontitle: "请输入题目标题",
          option: ["选项", "选项"],
        },
      ],
    };
  }
  if (type.value == 2) {
    checkboxfile["intro"] = filetitle;
    datas.survey.survey4.push(checkboxfile);
  }
  if (type.value == 3) {
    fileword["intro"] = filetitle;
    datas.survey.survey1.push(fileword);
  }
  if (type.value == 4) {
    scalefile["intro"] = filetitle;
    datas.survey.survey2.push(scalefile);
  }
  if (type.value == 5) {
    textfile["intro"] = filetitle;
    datas.survey.survey5.push(textfile);
  }
  show.value = "block";
}
//遮罩
function disappear() {
  show.value = "none";
}
</script>

<style lang="less" scoped>
div.wrapper {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  border-radius: 5px;
  box-shadow: 0px 5px 10px 0 rgba(73, 107, 158, 0.1);
  z-index: 0;

  div.decoration1 {
    display: block;
    height: 400px;
    width: 400px;
    position: absolute;
    z-index: -10;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background-color: rgba(235, 245, 255, 1);
    clip-path: polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%);
  }

  div.decoration2 {
    display: block;
    height: 150px;
    width: 150px;
    position: absolute;
    z-index: -3;
    bottom: 40px;
    right: 50px;
    border-radius: 50%;
    background-color: rgba(71, 145, 255, 1);
  }

  div.decoration3 {
    display: block;
    height: 100px;
    width: 100px;
    position: absolute;
    z-index: -4;
    bottom: 80px;
    right: -20px;
    border-radius: 50%;
    background-color: rgba(30, 111, 255, 1);
  }

  div.decoration4 {
    display: block;
    height: 170px;
    width: 170px;
    position: absolute;
    z-index: -4;
    bottom: -20px;
    right: 100px;
    border-radius: 50%;
    background-color: rgba(235, 245, 255, 1);
  }

  div.decoration5 {
    display: block;
    height: calc(108px + 5px);
    width: calc(120px + 7px);
    position: absolute;
    z-index: 1;
    top: -5px;
    right: -7px;
    background-color: rgb(255, 255, 255, 1);
  }

  img[dog-ear] {
    display: block;
    height: 108px;
    width: 120px;
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    object-fit: contain;
    transform: scale(1.07);
  }
  .newcon {
    position: relative;
    top: 50px;
    width: 840px;
    height: 570px;

    .newtitle {
      position: relative;
      left: 50%;
      top: 50%;
      width: 400px;
      height: 50px;
      transform: translate(-50%, -50%);
      word-wrap: break-word;
      font-family: "思源黑体";
      font-size: 36px;
      font-weight: 600;
      vertical-align: middle;
      width: fit-content;
      text-align: center;
      &::after {
        content: "";
        display: block;
        position: absolute;
        bottom: -2px;
        left: 0;
        height: 4px;
        width: 100%;
        background-color: #1e6fff;
        border-radius: 2px;
      }
    }
    .titlein {
      position: relative;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .newintro {
      .newintro_title {
        display: block;
        font-size: 16px;
        font-weight: 500;
        color: rgba(30, 111, 255, 1);
        text-align: left;
        margin-bottom: 12px;
      }
      .newintro_con {
        word-wrap: break-word; //超出页面自动换行
        width: 840px;
        height: 50px;
        overflow: auto;
      }
      textarea {
        width: 780px;
        border: 1px dashed rgba(30, 111, 255, 1);
        outline: none;
        resize: none;
      }
    }
    .quearea {
      margin-top: 20px;
      height: 300px;
      overflow: auto;
      .questype {
        display: flex;
        .typetitle {
          position: relative;
          font-size: 16px;
          font-weight: 500;
          color: rgba(0, 0, 0, 1);
          text-align: left;
          &::after {
            content: "";
            display: block;
            position: absolute;
            bottom: -2px;
            left: 0;
            height: 4px;
            width: 100%;
            background-color: #1e6fff;
            border-radius: 2px;
          }
        }
        .typeall {
          margin-left: 6px;
          display: flex;
          > span {
            display: block;
            cursor: pointer;
            width: 60px;
            height: 24px;
            margin-right: 12px;
            text-align: center;
            line-height: 24px;
            color: rgba(30, 111, 255, 1);
            font-size: 12px;
            font-weight: 400;
            opacity: 1;
            box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.1);
          }
          .typeclick {
            background: rgba(235, 245, 255, 1);
          }
        }
      }
      > ul {
        margin-top: 14px;
      }
    }
    .push {
      cursor: pointer;
      position: absolute;
      left: 50%;
      bottom: 10%;
      transform: translate(-50%);
      width: 200px;
      height: 50px;
      background: rgba(30, 111, 255, 1);
      border-color: rgba(30, 111, 255, 1);
      font-size: 20px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      border-radius: 2px;
    }
  }
  .mask {
    display: none;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 3;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .sharefile {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 3;
    transform: translate(-50%, -50%);
    width: 440px;
    height: 380px;
    opacity: 1;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.1);
    .shareword {
      position: absolute;
      left: 40px;
      top: 40px;
      width: 82px;
      height: 32px;
      opacity: 1;
      /** 文本1 */
      font-size: 20px;
      font-weight: 500;
      letter-spacing: 0px;
      line-height: 28px;
      color: rgba(0, 0, 0, 1);
      text-align: left;
      vertical-align: top;
    }
    .close {
      cursor: pointer;
      position: absolute;
      right: 49px;
      top: 35px;
      width: 10px;
      height: 10px;
      opacity: 1;
      color: rgba(30, 111, 255, 1);
      font-size: 25px;
    }
    .sharequick {
      position: absolute;
      left: 83px;
      bottom: 54px;
      width: 300px;
      height: 24px;
      opacity: 1;
      /** 文本1 */
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 0px;
      line-height: 22px;
      color: rgba(0, 0, 0, 1);
      /** 文本2 */
      font-size: 14px;
      font-weight: 400;
    }
  }

  input[type="text"] {
    /* 清除原有input样式 */
    -web-kit-appearance: none;
    -moz-appearance: none;
    outline: 0;
    /* 设置我们要的样式 */
    border: 1px dashed rgba(30, 111, 255, 1);
    width: fit-content;
    height: auto;
    font-size: 36px;
    font-weight: 500;
  }
}
</style>