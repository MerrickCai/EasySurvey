<script setup>
//路由
import { onBeforeRouteUpdate } from 'vue-router'
import { useRoute } from 'vue-router'
const route = useRoute()

//数据
import { useStore } from '../PiniaStores/index.js'
const datas = useStore()


onBeforeRouteUpdate((to) => {
  const id = to.params.id
  datas.survey.currentSurvey = datas.survey.survey1[id - 1]
  console.log(to)
})

</script>

<template>
  <!--问卷介绍-->
  <template v-if="datas.survey.currentSurvey.status.intro">
    <div class="survey_intro">
      <p title>{{ datas.survey.currentSurvey.intro.title }}</p>
      <p intro>
        <span intro_title>{{ datas.survey.currentSurvey.intro.intro_title }}</span>
        <span intro_content>{{ datas.survey.currentSurvey.intro.intro_content }}</span>
        <span warn_title>{{ datas.survey.currentSurvey.intro.warn_title }}</span>
        <span warn_content>{{ datas.survey.currentSurvey.intro.warn_content }}</span>
      </p>
      <p button @click="datas.survey.currentSurvey.status.toSurvey">{{ datas.survey.currentSurvey.intro.button }}</p>
    </div>
  </template>

  <!--问卷填写-->
  <template v-if="datas.survey.currentSurvey.status.survey">
    <div class="survey">
      <p title>{{ datas.survey.currentSurvey.intro.title }}</p>
      <div class="survey_area">
        <p intro>
          <span intro_title>{{ datas.survey.currentSurvey.intro.intro_title }}</span>
          <span intro_content>{{ datas.survey.currentSurvey.intro.intro_content }}</span>
          <span warn_title>{{ datas.survey.currentSurvey.intro.warn_title }}</span>
          <span warn_content>{{ datas.survey.currentSurvey.intro.warn_content }}</span>
        </p>
        <div class="ques">
          <div v-for="(item, index) of datas.survey.currentSurvey.quesList">
            <div>
              <span>{{ index + 1 }}.</span><span>{{ item.ques }}</span>
            </div>
            <div :style="{ backgroundColor: `${item.value === 0 ? 'rgba(245, 245, 245, 1)' : 'rgb(229,229,229)'}` }">
              <div class="bar1" @click="item.value = 1"></div>
              <div class="bar2" @click="item.value = 2"></div>
              <div class="bar3" @click="item.value = 3"></div>
              <div class="bar4" @click="item.value = 4"></div>
              <div class="bar5" @click="item.value = 5"></div>
              <div class="thumb" :style="{ left: `${item.value === 0 ? -12 : -12 + (item.value - 1) * 150}px` }"></div>
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
      background-color: @themeColor;
      border-radius: 2px;
    }
  }

  >div.survey_area {
    flex: 1;
    display: block;
    height: auto;
    width: 100%;
    overflow: auto;

    >p[intro] {
      display: block;
      height: auto;
      width: calc(100% - 150px);
      margin-top: 15px;

      >span[intro_title] {
        display: block;
        height: auto;
        width: auto;
        margin-bottom: 2px;
        font-size: 1.6rem;
        color: @themeColor;
      }

      >span[intro_content] {
        display: block;
        height: auto;
        width: auto;
        margin-bottom: 5px;
        font-size: 1.4rem;
        color: rgba(0, 0, 0, 1);
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
      width: 100%;
      margin-top: 50px;

      >div {
        display: block;
        height: auto;
        width: 100%;
        margin-bottom: 20px;

        >div:nth-child(1) {
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

          >div.bar1 {
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
              top: -2rem;
              left: 0;
              height: 5rem;
              width: 8rem;
              color: rgb(0, 0, 0);
              font-size: 1.6rem;
              line-height: 1.6rem;
            }
          }

          >div.bar2 {
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
              top: -2rem;
              left: -3rem;
              height: 5rem;
              width: 6.4rem;
              color: rgb(0, 0, 0);
              font-size: 1.6rem;
              line-height: 1.6rem;
            }
          }

          >div.bar3 {
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
              top: -2rem;
              left: -3rem;
              height: 5rem;
              width: 6.4rem;
              color: rgb(0, 0, 0);
              font-size: 1.6rem;
              line-height: 1.6rem;
            }
          }

          >div.bar4 {
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
              top: -2rem;
              left: -3rem;
              height: 5rem;
              width: 6.4rem;
              color: rgb(0, 0, 0);
              font-size: 1.6rem;
              line-height: 1.6rem;
            }
          }

          >div.bar5 {
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
              top: -2rem;
              right: 0;
              height: 5rem;
              width: 6.4rem;
              color: rgb(0, 0, 0);
              font-size: 1.6rem;
              line-height: 1.6rem;
            }
          }

          >div.thumb {
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
      background-color: @themeColor;
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
      color: @themeColor;
    }

    >span[intro_content] {
      display: block;
      height: auto;
      width: auto;
      margin-bottom: 20px;
      font-size: 1.4rem;
      color: rgba(0, 0, 0, 1);
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
    background-color: @themeColor;
    color: rgb(255, 255, 255);
    font-size: 1.8rem;
    border-radius: 5px;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>