<script setup>
import { reactive } from "vue";
//问卷信息
const intro = reactive({
  title: "威廉斯创造力倾向表A",
  intro_title: "问卷介绍：",
  intro_content:
    "威廉斯创造力倾向表通过测验个人的一些性格特点包括冒险性、好奇性、想象力和挑战性，来测量个人的创造性倾向。这是一份帮助你了解自己创造力的练习。在下列的句子中，共有三种情形，“完全符合”、“部分符合”、“完全不符合”，选择最符合你自身情况的选项。切记，凭你自己的真实的感觉作答，选择最符合你自身情况的选项。",
  warn_title: "注意：",
  warn_content:
    "每一题都要做，不要花太多的时间去想。所有的题目都没有“正确答案”，凭你读每一句子后的第一印象作答。 虽然没有时间限制，但应尽可能地争取以较快的速度完成，愈快愈好。",
  button: "开始答题",
});
//问卷填写
const quesList = reactive([
  {
    ques: "在学校里，我喜欢试着对事情或问题作猜测，即使不一定都猜对也无所谓。",
    value: 0,
  },
  {
    ques: "我喜欢仔细观察我没有看过的东西，以了解详细的情形。",
    value: 0,
  },
  {
    ques: "我喜欢听变化多端和富有想象力的故事。",
    value: 0,
  },
  {
    ques: "画图时我喜欢临摹别人的作品。",
    value: 0,
  },
  {
    ques: "我喜欢利用旧报纸、旧日历及旧罐头等废物来做成各种好玩的东西。",
    value: 0,
  },
  {
    ques: "我喜欢幻想一些我想知道或想做的事。",
    value: 0,
  },
]);
//问卷状态
const status = reactive({
  intro: true,
  survey: false,
  end: false,
  toSurvey() {
    this.intro = false;
    this.end = false;
    this.survey = true;
  },
});
</script>

<template>
  <!--折角（一直都在）-->
  <img dog-ear src="/tangible.png" />
  <div class="decoration5"></div>

  <!--填问卷时隐藏-->
  <template v-if="status.intro || status.end">
    <div class="decoration1"></div>
    <!--左上-->
    <div class="decoration2"></div>
    <!--右下-->
    <div class="decoration3"></div>
    <div class="decoration4"></div>
  </template>

  <!--问卷介绍-->
  <template v-if="status.intro">
    <div class="survey_intro">
      <p title>{{ intro.title }}</p>
      <p intro>
        <span intro_title>{{ intro.intro_title }}</span>
        <span intro_content>{{ intro.intro_content }}</span>
        <span warn_title>{{ intro.warn_title }}</span>
        <span warn_content>{{ intro.warn_content }}</span>
      </p>
      <p button @click="status.toSurvey">{{ intro.button }}</p>
    </div>
  </template>

  <!--问卷填写-->
  <template v-if="status.survey">
    <div class="survey">
      <p title>{{ intro.title }}</p>
      <div class="survey_area">
        <p intro>
          <span intro_title>{{ intro.intro_title }}</span>
          <span intro_content>{{ intro.intro_content }}</span>
          <span warn_title>{{ intro.warn_title }}</span>
          <span warn_content>{{ intro.warn_content }}</span>
        </p>
        <div class="ques">
          <div v-for="(item, index) of quesList">
            <div>
              <span>{{ index + 1 }}.</span><span>{{ item.ques }}</span>
            </div>
            <div
              :style="{
                backgroundColor: `${
                  item.value === 0
                    ? 'rgba(245, 245, 245, 1)'
                    : 'rgb(229,229,229)'
                }`,
              }"
            >
              <div class="bar1" @click="item.value = 1"></div>
              <div class="bar2" @click="item.value = 2"></div>
              <div class="bar3" @click="item.value = 3"></div>
              <div class="bar4" @click="item.value = 4"></div>
              <div class="bar5" @click="item.value = 5"></div>
              <div
                class="thumb"
                :style="{
                  left: `${
                    item.value === 0 ? -12 : -12 + (item.value - 1) * 150
                  }px`,
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<style lang="less" scoped>
@themeColor: rgba(30, 111, 255, 1);

div.survey {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  padding: 20px 0 0 15px;

  > p[title] {
    display: block;
    height: auto;
    width: auto;
    position: relative;
    font-size: 1.5rem;
    color: rgba(0, 0, 0, 1);

    &::after {
      content: "";
      display: block;
      position: absolute;
      bottom: -1px;
      left: 0;
      height: 3px;
      width: 100%;
      background-color: @themeColor;
      border-radius: 2px;
    }
  }

  > div.survey_area {
    flex: 1;
    display: block;
    height: auto;
    width: 100%;
    overflow: auto;

    > p[intro] {
      display: block;
      height: auto;
      width: calc(100% - 150px);
      margin-top: 15px;

      > span[intro_title] {
        display: block;
        height: auto;
        width: auto;
        margin-bottom: 2px;
        font-size: 0.8rem;
        color: @themeColor;
      }

      > span[intro_content] {
        display: block;
        height: auto;
        width: auto;
        margin-bottom: 5px;
        font-size: 0.7rem;
        color: rgba(0, 0, 0, 1);
      }

      > span[warn_title] {
        display: block;
        height: auto;
        width: auto;
        margin-bottom: 2px;
        font-size: 0.8rem;
        color: rgba(0, 0, 0, 1);
        font-weight: bold;
      }

      > span[warn_content] {
        display: block;
        height: auto;
        width: auto;
        font-size: 0.7rem;
        color: rgba(0, 0, 0, 1);
      }
    }

    > div.ques {
      display: block;
      height: auto;
      width: 100%;
      margin-top: 50px;

      > div {
        display: block;
        height: auto;
        width: 100%;
        margin-bottom: 20px;

        > div:nth-child(1) {
          display: block;
          height: auto;
          width: auto;
          position: relative;
          padding-left: 5px;
          margin-bottom: 60px;

          &::before {
            content: "";
            position: absolute;
            z-index: 0;
            height: 100%;
            width: 3px;
            top: 0;
            left: 0;
            background-color: @themeColor;
          }

          > span:nth-child(1) {
            font-size: 1rem;
            color: rgb(0, 0, 0);
            margin-right: 15px;
          }

          > span:nth-child(2) {
            font-size: 1rem;
            color: rgb(0, 0, 0);
          }
        }

        > div:nth-child(2) {
          @Height: 20px;
          @Width: 600px;
          @barWidth: 5px;
          @barHeight: 30px;
          @thumbSize: @Height+4px;

          display: block;
          height: @Height;
          width: @Width;
          margin-left: 15px;
          background-color: rgba(245, 245, 245, 1);
          position: relative;

          > div.bar1 {
            position: absolute;
            z-index: 1;
            bottom: 0;
            left: -2px;
            height: @barHeight;
            width: @barWidth;
            background-color: rgba(204, 204, 204, 1);
            cursor: pointer;

            &::before {
              content: "完全不符合";
              position: absolute;
              top: -1rem;
              left: 0;
              height: 2.5rem;
              width: 4rem;
              color: rgb(0, 0, 0);
              font-size: 0.8rem;
              line-height: 0.8rem;
            }
          }

          > div.bar2 {
            position: absolute;
            z-index: 1;
            bottom: 0;
            left: calc(-2px + (@Width / 4) * 1);
            height: @barHeight;
            width: @barWidth;
            background-color: rgba(204, 204, 204, 1);
            cursor: pointer;

            &::before {
              content: "不太符合";
              position: absolute;
              top: -1rem;
              left: -1.5rem;
              height: 2.5rem;
              width: 3.2rem;
              color: rgb(0, 0, 0);
              font-size: 0.8rem;
              line-height: 0.8rem;
            }
          }

          > div.bar3 {
            position: absolute;
            z-index: 1;
            bottom: 0;
            left: calc(-2px + (@Width / 4) * 2);
            height: @barHeight;
            width: @barWidth;
            background-color: rgba(204, 204, 204, 1);
            cursor: pointer;

            &::before {
              content: "部分符合";
              position: absolute;
              top: -1rem;
              left: -1.5rem;
              height: 2.5rem;
              width: 3.2rem;
              color: rgb(0, 0, 0);
              font-size: 0.8rem;
              line-height: 0.8rem;
            }
          }

          > div.bar4 {
            position: absolute;
            z-index: 1;
            bottom: 0;
            left: calc(-2px + (@Width / 4) * 3);
            height: @barHeight;
            width: @barWidth;
            background-color: rgba(204, 204, 204, 1);
            cursor: pointer;

            &::before {
              content: "比较符合";
              position: absolute;
              top: -1rem;
              left: -1.5rem;
              height: 2.5rem;
              width: 3.2rem;
              color: rgb(0, 0, 0);
              font-size: 0.8rem;
              line-height: 0.8rem;
            }
          }

          > div.bar5 {
            position: absolute;
            z-index: 1;
            bottom: 0;
            left: calc(-2px + (@Width / 4) * 4);
            height: @barHeight;
            width: @barWidth;
            background-color: rgba(204, 204, 204, 1);
            cursor: pointer;

            &::before {
              content: "完全符合";
              position: absolute;
              top: -1rem;
              right: 0;
              height: 2.5rem;
              width: 3.2rem;
              color: rgb(0, 0, 0);
              font-size: 0.8rem;
              line-height: 0.8rem;
            }
          }

          > div.thumb {
            position: absolute;
            z-index: 2;
            bottom: -2px;
            left: calc(0px - @thumbSize / 2); //thumbSize=24px
            height: @thumbSize;
            width: @thumbSize;
            background-color: @themeColor;
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

  > p[title] {
    display: block;
    height: auto;
    width: auto;
    margin-bottom: 30px;
    position: relative;
    font-size: 1.8rem;
    color: rgba(0, 0, 0, 1);

    &::after {
      content: "";
      display: block;
      position: absolute;
      bottom: -2px;
      left: 0;
      height: 4px;
      width: 100%;
      background-color: @themeColor;
      border-radius: 2px;
    }
  }

  > p[intro] {
    display: block;
    height: auto;
    width: 70%;
    margin-bottom: 80px;

    > span[intro_title] {
      display: block;
      height: auto;
      width: auto;
      margin-bottom: 10px;
      font-size: 0.8rem;
      color: @themeColor;
    }

    > span[intro_content] {
      display: block;
      height: auto;
      width: auto;
      margin-bottom: 20px;
      font-size: 0.7rem;
      color: rgba(0, 0, 0, 1);
    }

    > span[warn_title] {
      display: block;
      height: auto;
      width: auto;
      margin-bottom: 10px;
      font-size: 0.8rem;
      color: rgba(0, 0, 0, 1);
    }

    > span[warn_content] {
      display: block;
      height: auto;
      width: auto;
      font-size: 0.7rem;
      color: rgba(0, 0, 0, 1);
    }
  }

  > p[button] {
    display: block;
    height: auto;
    width: auto;
    padding: 20px 100px;
    background-color: @themeColor;
    color: rgb(255, 255, 255);
    font-size: 0.9rem;
    border-radius: 5px;

    &:hover {
      cursor: pointer;
    }
  }
}

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
  z-index: -10;
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
  z-index: -11;
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
  z-index: -12;
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
</style>