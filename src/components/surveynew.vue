<template>
  <div class="newcon">
    <div class="newword">
      <!-- 新建问卷标题 -->
      <p class="newtitle" v-show="titleshow" @click="changetitleshow">
        {{ fileword.intro.title }}
      </p>
      <input
        type="text"
        ref="titlein"
        class="titlein"
        v-show="!titleshow"
        v-model="fileword.intro.title"
        @keyup.enter="titleshow = true"
        @blur="titleshow = true"
      />
      <!-- 新建问卷介绍 -->
      <p class="newintro">
        <span class="newintro_title">{{ fileword.intro.intro_title }}</span>
        <p class="newintro_con" v-show="introshow" @click="changeintroshow">
          {{ fileword.intro.intro_content }}
        </p>

        <textarea
          cols="30"
          rows="2"
          ref="introin"
          class="introin"
          v-show="!introshow"
          v-model="fileword.intro.intro_content"
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
        <component :is="typeview" :fileword="fileword" :receive="receive" :deleteques="deleteques" :scalefile="scalefile" :sreceive="sreceive" :sdeleteques="sdeleteques" :radiofile="radiofile" :rreceive="rreceive" :rdeleteques="rdeleteques"></component>               
        </keep-alive>
      </ul>
    </div>
    <button class="push">发布问卷</button>
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
import radiolist from "./radiolist.vue";
import checkboxlist from "./checkboxlist.vue";
import matrixlist from "./matrixlist.vue";
import scalelist from "./scalelist.vue";
import textlist from "./textlist.vue";
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
  intro: {
    title: "请输入问卷标题",
    intro_title: "问卷介绍：",
    intro_content:
      "为了使问卷调查结果更加清晰,准确,请输入关于问卷的简短介绍以及注意事项,方便填写问卷的人更清晰的认识问卷,字数少于500字",
    warn_title: "注意：",
    warn_content:
      "每一题都要做，不要花太多的时间去想。所有的题目都没有“正确答案”，凭你读每一句子后的第一印象作答。 虽然没有时间限制，但应尽可能地争取以较快的速度完成，愈快愈好。",
    button: "开始答题",
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
  intro: {
    info_title: "",
    info_para: "",
  },
  questionIntro: {
    title: "",
    sec_title: "问卷介绍：",
    para: "",
  },
  questionList: [
    {
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
</script>

<style lang="less" scoped>
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
</style>