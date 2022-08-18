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
        <span class="newintro_con" v-show="introshow" @click="changeintroshow">
          {{ fileword.intro.intro_content }}
        </span>

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
      <ul>
        <quesList></quesList>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <button class="push">发布问卷</button>
  </div>
</template>

<script setup>
import quesList from "../components/quesList.vue";
import { nextTick, reactive, ref } from "vue";
//存储问卷信息内容
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
  quesList: [],
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
    transform: translate(-50%, -50%);
    font-size: 36px;
    font-weight: 500;
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
      width: 840px;
      overflow: auto;
      margin: 12px;
    }
    textarea {
      width: 780px;
      border: 1px dashed rgba(30, 111, 255, 1);
      outline: none;
      resize: none;
    }
  }
  .quearea {
    margin-top: 30px;
    height: 300px;
    overflow: auto;
    > ul > li {
      height: 50px;
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