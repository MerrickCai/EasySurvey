<script setup>
import { ref, inject } from "vue"



//从父组件中获取当前问卷的状态和数据
const currentSurvey = inject("currentSurvey")



// ----------滚动条-----------
const thumb = ref(null);
const text = ref(null);
const content = ref(null);
// 滚动条蓝色背景
let bluebcg_height = ref(0);
// 滚动条的蓝色背景的dom
const bluebcg = ref(null);
//点击滚动条触发滚动
function scrollTo(e) {
  const scrollDistence = ref(0);
  if (scrollDistence.value === 0) {
    //此为滚动距离scrollTop最大值（e.currentTarget.offsetHeight == e.currentTarget.clientHeight）
    scrollDistence.value =
      content.value.scrollHeight - content.value.offsetHeight;
  }

  //转换(e.offsetY是鼠标点击进度条的位置[0,400]，进度条总长400px)
  content.value.scrollTop = scrollDistence.value * (e.offsetY / 400) - 8;
  text.innerHTML = `${Math.ceil((e.offsetY / 400) * 100)} %`;
}
//监听滚动事件
function onScroll(e) {
  const scrollDistence = ref(0);
  if (scrollDistence.value === 0) {
    scrollDistence.value =
      e.currentTarget.scrollHeight - e.currentTarget.offsetHeight;
  }
  scrollDistence.value =
    e.currentTarget.scrollHeight - e.currentTarget.offsetHeight;
  //转换
  thumb.value.setAttribute(
    "style",
    `top: ${400 * (e.currentTarget.scrollTop / scrollDistence.value)}px`
  );
  text.value.innerHTML = `${Math.ceil(
    ((e.currentTarget.scrollTop - 1) / scrollDistence.value) * 100
  )} %`;
  // 中转变量
  let temp = thumb.value.style.top.split("");
  temp.pop();
  temp.pop();
  temp = temp.join("") / 1;
  bluebcg_height.value = temp;
}



// ------提交按钮之后相关的变量和方法------
// 获取全部questiontitle
const ques = ref(null);
// 进度条片段的高度
const progressPartHeight = 400 / currentSurvey.data.quesList.length;
// 提交按钮  跳转：答题页==>完成页
function toFinish() {
  let flag = true;
  // 记录未完成的问卷id
  const uncomplete = [];
  // 滚动的蓝色背景失效
  bluebcg.value.style.display = "none";
  currentSurvey.data.quesList.forEach((item) => {
    item.titleBorder = 0;
    item.progressPartbcg = "#5a9afa";
    if (item.value === 0) {
      flag = false;
      uncomplete.push(item.id);
      item.titleBorder = 1;
      item.progressPartbcg = "red";
    }
  });
  let fisrtreturn = uncomplete[0] - 1;
  if (uncomplete.length) {
    content.value.scrollTop = ques.value[fisrtreturn].offsetTop;
  }

  if (!flag) return;
  currentSurvey.status.toEnd();
}
const barArr = new Array(currentSurvey.data.quesList.length)
  .fill(0)
  .map((item, index) =>
    new Array(currentSurvey.data.quesList[index].series).fill(0)
  )
</script>

<template>
  <div wrapper>


    <!--问卷介绍-->
    <template v-if="currentSurvey.status.begin">
      <div class="survey_intro">
        <p title>{{ currentSurvey.data.intro.title }}</p>
        <p intro>
          <span intro_title>问卷介绍：</span>
          <span v-html="currentSurvey.data.intro.intro_content" intro_content></span>
        </p>
        <p button @click="currentSurvey.status.toOngoing();">开始问卷 </p>
      </div>
    </template>


    <!--问卷填写-->
    <template v-if="currentSurvey.status.ongoing">
      <div class="survey">
        <p title>{{ currentSurvey.data.intro.title }}</p>
        <div class="scrollbar_shadow"></div>
        <!-- 进度条 -->
        <div class="progress" @click="scrollTo($event)">
          <div>
            <!-- 进度条分段，使得点击提交按钮后进度条可以分段显示红色背景，多少个题目就分多少段 (外面多个div包裹下面的style的last-child才能生效)-->
            <div class="progress-part" v-for="(item, index) of currentSurvey.data.quesList" :key="item.id" :style="{
              height: `${progressPartHeight}px`,
              backgroundColor: `${item.progressPartbcg}`,
            }"></div>
          </div>
          <div class="thumb" ref="thumb">
            <div class="bluebcg" ref="bluebcg" :style="{ height: `${bluebcg_height}px` }"></div>
          </div>
          <div class="text" ref="text">0%</div>
        </div>
        <div class="survey_area" @scroll="onScroll($event)" ref="content">
          <p intro>
            <span intro_title>问卷介绍：</span>
            <span v-html="currentSurvey.data.intro.intro_content" intro_content></span>
          </p>
          <div class="ques">
            <div v-for="(item, index) of currentSurvey.data.quesList" ref="ques"
              :style="{ border: `${item.titleBorder}px solid red` }">
              <div>
                <span>{{ index + 1 }}.</span><span>{{ item.ques }}</span>
              </div>
              <!-- 总宽度为600-->
              <div :style="{
                backgroundColor: `${item.value === 0
                  ? 'rgba(245, 245, 245, 1)'
                  : 'rgb(229,229,229)'
                  }`,
              }">
                <!-- bar -->
                <div v-for="(b, i) of barArr[index]" class="bar" @click="item.value = i + 1">
                  <div class="font">
                    {{ currentSurvey.data.quesList[index].font[i] }}
                  </div>
                </div>
                <div class="thumb" :style="{
                  left: `${item.value === 0
                    ? -12
                    : -12 +
                    ((item.value - 1) * 600) / (barArr[index].length - 1)
                    }px`,
                }"></div>
                <div class="thumb" :style="{
                  left: `${item.value === 0
                    ? -12
                    : -12 +
                    ((item.value - 1) * 600) / (barArr[index].length - 1)
                    }px`,
                }"></div>
              </div>
            </div>
          </div>
          <div class="submitBtn" @click="toFinish">提交问卷</div>
        </div>
      </div>
    </template>


    <!-- 问卷完成部分 -->
    <div class="finish-wrapper" v-if="currentSurvey.status.end">
      <div class="innerbox">
        <div class="finish-title">
          <h2>您已完成</h2>
          <h3>{{ currentSurvey.data.intro.title }}</h3>
          <p>感谢您的答题，本次问卷已全部结束</p>
        </div>
        <el-button type="primary" class="finish-submit">完成答题</el-button>
      </div>
    </div>


  </div>
</template>

<style lang="less" scoped>
div[wrapper] {
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
  z-index: -1;
}

div.survey {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  padding: 20px 0 0 15px;
  position: relative;

  >div.scrollbar_shadow {
    position: absolute;
    height: 620px;
    width: 10px;
    bottom: 0px;
    right: 0;
    z-index: 1;
    background-color: rgba(255, 255, 255, 1);
  }

  >div.progress {
    >div.thumb {
      content: "";
      position: absolute;
      z-index: 2;
      height: 12px;
      width: 12px;
      top: 0;
      left: -2px;
      border-radius: 5px;
      transform: translateY(-10px);
      background-color: rgba(255, 255, 255, 1);
      cursor: pointer;

      &::before {
        content: "";
        width: 100%;
        height: 100%;
        border-radius: 5px;
        position: absolute;
        background-color: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
      }
    }

    // 进度条分段
    .progress-part {
      width: 8px;
      pointer-events: none;

      //    border-radius: 5px;
      &:first-child {
        border-radius: 5px 5px 0 0;
      }

      &:last-child {
        border-radius: 0 0 5px 5px;
      }
    }

    >div.text {
      position: absolute;
      z-index: 1;
      height: 18px;
      width: 50px;
      bottom: -20px;
      left: -22px;
      color: rgba(30, 111, 255, 1);
      text-align: center;
      font-size: 16px;
      line-height: 18px;
    }

    .bluebcg {
      background-color: #4791ff;
      width: 8px;
      position: absolute;
      bottom: 8px;
      height: 200px;
      left: 2px;
      z-index: -9;
      border-radius: 5px;
      pointer-events: none;
    }

    position: absolute;
    z-index: 1;
    height: 400px;
    width: 8px;
    bottom: 35px;
    left: calc(615px + 270px);
    border-radius: 5px;
    background-color: rgba(204, 204, 204, 1);
    cursor: pointer;
  }

  >p[title] {
    display: block;
    height: auto;
    width: auto;
    position: relative;
    font-size: 3rem;
    color: rgba(0, 0, 0, 1);

    &::after {
      content: "";
      display: block;
      position: absolute;
      bottom: -1px;
      left: 0;
      height: 3px;
      width: 100%;
      background-color: rgba(30, 111, 255, 1);
      border-radius: 2px;
    }
  }

  >div.survey_area {
    flex: 1;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    height: auto;
    width: 100%;
    overflow: auto;
    position: relative;
    background-color: white;

    >p[intro] {
      display: block;
      height: auto;
      width: calc(600px + 250px);
      margin-top: 15px;

      >span[intro_title] {
        display: block;
        height: auto;
        width: auto;
        margin-bottom: 2px;
        font-size: 1.6rem;
        color: rgba(30, 111, 255, 1);
      }

      >span[intro_content] {
        display: block;
        height: auto;
        width: auto;
        margin-bottom: 5px;
        font-size: 1.4rem;
        color: rgba(0, 0, 0, 1);
        white-space: pre-wrap;
      }

      >span[warn_title] {
        display: block;
        height: auto;
        width: auto;
        margin-bottom: 2px;
        font-size: 1.6rem;
        color: rgba(0, 0, 0, 1);
        font-weight: bold;
      }

      >span[warn_content] {
        display: block;
        height: auto;
        width: auto;
        font-size: 1.4rem;
        color: rgba(0, 0, 0, 1);
      }
    }

    >div.ques {
      display: block;
      height: auto;
      width: 750px;
      margin-top: 35px;

      >div {
        display: block;
        height: auto;
        width: 100%;
        margin-bottom: 30px;

        >div:nth-child(1) {
          display: block;
          height: auto;
          width: auto;
          position: relative;
          padding-left: 5px;
          margin-bottom: 50px;

          &::before {
            content: "";
            position: absolute;
            z-index: 0;
            height: 100%;
            width: 3px;
            top: 0;
            left: 0;
            background-color: rgba(30, 111, 255, 1);
          }

          >span:nth-child(1) {
            font-size: 2rem;
            color: rgb(0, 0, 0);
            margin-right: 15px;
          }

          >span:nth-child(2) {
            font-size: 2rem;
            color: rgb(0, 0, 0);
          }
        }

        >div:nth-child(2) {
          @Height: 20px;
          @Width: 605px;
          @barWidth: 5px;
          @barHeight: 30px;
          @thumbSize: @Height+4px;

          display: block;
          height: @Height;
          width: @Width;
          margin-left: 15px;
          background-color: rgba(245, 245, 245, 1);
          position: relative;
          display: flex;
          justify-content: space-between;
          transform: translateX(45px);

          >div.bar {
            height: @barHeight;
            width: @barWidth;
            background-color: rgba(204, 204, 204, 1);
            cursor: pointer;
            transform: translateX(-2px) translateY(-9px);
          }

          .font {
            font-family: "思源黑体";
            text-align: center;
            width: 60px;
            font-size: 12;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 36px;
            font-size: 12px;
            font-weight: 400;
            letter-spacing: 0px;
            color: rgba(0, 0, 0, 1);
            vertical-align: top;
          }

          >div.thumb {
            position: absolute;
            z-index: 2;
            bottom: -2px;
            left: calc(0px - @thumbSize / 2); //thumbSize=24px
            height: @thumbSize;
            width: @thumbSize;
            background-color: rgba(30, 111, 255, 1);
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
        }
      }
    }

    >div.submitBtn {
      display: block;
      height: auto;
      width: auto;
      margin: 30px 0;
      padding: 20px 100px;
      background-color: rgba(30, 111, 255, 1);
      color: rgb(255, 255, 255);
      font-size: 1.8rem;
      border-radius: 5px;
      align-self: center;
      cursor: pointer;
    }
  }
}

div.survey_intro {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height: auto;
  width: 100%;

  >p[title] {
    display: block;
    height: auto;
    width: auto;
    margin-bottom: 30px;
    position: relative;
    font-size: 3.6rem;
    color: rgba(0, 0, 0, 1);

    &::after {
      content: "";
      display: block;
      position: absolute;
      bottom: -2px;
      left: 0;
      height: 4px;
      width: 100%;
      background-color: rgba(30, 111, 255, 1);
      border-radius: 2px;
    }
  }

  >p[intro] {
    display: block;
    height: auto;
    width: 70%;
    margin-bottom: 80px;

    >span[intro_title] {
      display: block;
      height: auto;
      width: auto;
      margin-bottom: 10px;
      font-size: 1.6rem;
      color: rgba(30, 111, 255, 1);
    }

    >span[intro_content] {
      display: block;
      height: auto;
      width: auto;
      margin-bottom: 5px;
      font-size: 1.4rem;
      color: rgba(0, 0, 0, 1);
      white-space: pre-wrap;
    }

    >span[warn_title] {
      display: block;
      height: auto;
      width: auto;
      margin-bottom: 10px;
      font-size: 1.6rem;
      color: rgba(0, 0, 0, 1);
    }

    >span[warn_content] {
      display: block;
      height: auto;
      width: auto;
      font-size: 1.4rem;
      color: rgba(0, 0, 0, 1);
    }
  }

  >p[button] {
    display: block;
    height: auto;
    width: auto;
    padding: 20px 100px;
    background-color: rgba(30, 111, 255, 1);
    color: rgb(255, 255, 255);
    font-size: 1.8rem;
    border-radius: 5px;

    &:hover {
      cursor: pointer;
    }
  }
}

.finish-wrapper {
  width: 100%;
  height: 100%;

  // background-color: pink;
  .innerbox {
    width: 400px;
    height: 380px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .finish-title {
      width: 365px;
      height: 190px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;

      h2 {
        font-family: "思源黑体";
        font-size: 36px;
        font-weight: 500;
        letter-spacing: 0px;
        line-height: 44px;
        margin-left: -18px;

        &::after {
          content: "✔";
          color: white;
          font-size: 24px;
          width: 36px;
          height: 36px;
          background: radial-gradient(104.2% 104.2%,
              rgba(30, 111, 255, 1) 0%,
              rgba(170, 203, 255, 1) 100%);
          border-radius: 50%;
          position: absolute;
          margin-left: 8px;
          top: 5px;
          text-align: center;
          line-height: 36px;
        }
      }

      h3 {
        font-family: "思源黑体";
        font-size: 36px;
        font-weight: 500;
        letter-spacing: 0px;
        line-height: 44px;
        color: rgba(30, 111, 255, 1);
      }

      p {
        font-family: "思源黑体";
        font-size: 20px;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 28px;
        color: rgba(0, 0, 0, 1);
        text-align: center;
      }
    }

    .finish-submit {
      width: 180px;
      height: 45px;
      background-color: rgba(30, 111, 255, 1);
      margin-top: 40px;

      &:hover {
        background-color: #4791ff;
      }

      &:active {
        background-color: #0f52d9;
      }
    }
  }
}
</style>