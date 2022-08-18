<script setup>
import { ref } from 'vue'


//路由
import { onBeforeRouteUpdate } from 'vue-router'
import { useRoute } from 'vue-router'
const route = useRoute()
onBeforeRouteUpdate((to) => {
  const id = to.params.id
  
  datas.survey.currentSurvey = datas.survey.survey1[id - 1]
})


//数据
import { useStore } from '../PiniaStores/index.js'
const datas = useStore()


//进度条   
const scrollDistence = ref(0)
function scrollTo(e) {
  if (scrollDistence.value === 0) {
    //此为滚动距离scrollTop最大值（e.currentTarget.offsetHeight == e.currentTarget.clientHeight）
    scrollDistence.value = e.currentTarget.nextSibling.scrollHeight - e.currentTarget.nextSibling.offsetHeight
  }
  //转换(e.offsetY是鼠标点击进度条的位置[0,400]，进度条总长400px)
  e.currentTarget.nextSibling.scrollTop = (scrollDistence.value) * (e.offsetY / 400)
  e.currentTarget.lastChild.innerHTML = `${Math.ceil((e.offsetY / 400) * 100)} %`
}
function onScroll(e) {
  if (scrollDistence.value === 0) {
    scrollDistence.value = e.currentTarget.scrollHeight - e.currentTarget.offsetHeight
  }
  //转换
  e.currentTarget.previousSibling.firstChild.setAttribute('style', `top: ${(400) * (e.currentTarget.scrollTop / scrollDistence.value)}px`);
  e.currentTarget.previousSibling.lastChild.innerHTML = `${Math.ceil((e.currentTarget.scrollTop / scrollDistence.value) * 100)} %`
}

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
      <div class="scrollbar_shadow"></div>
      <div class="progress" @click="scrollTo($event)">
        <div class="thumb"></div>
        <div class="text">0 %</div>
      </div>
      <div class="survey_area" @scroll="onScroll($event)">
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
        <div class="submitBtn" @click="datas.survey.currentSurvey.status.toEnd">提交问卷</div>
      </div>
    </div>
  </template>

<!-- 问卷完成部分 -->
<div class="finish-wrapper" v-if="datas.survey.currentSurvey.status.end">
     <div class="innerbox">
        <div class="finish-title">
           <h2>{{datas.survey.currentSurvey.end.ok}}</h2>
           <h3>{{datas.survey.currentSurvey.end.title}}</h3>
           <p>{{datas.survey.currentSurvey.end.detail}}</p>
        </div>
      <el-button type="primary" class="finish-submit">{{datas.survey.currentSurvey.end.button}}</el-button>
     </div>
</div>

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
  position: relative;

  >div.scrollbar_shadow {
    position: absolute;
    height: 500px;
    width: 10px;
    bottom: 0;
    right: 0;
    z-index: 1;
    background-color: rgba(255, 255, 255, 1);
  }

  >div.progress {
    >div.thumb {
      content: '';
      position: absolute;
      z-index: 2;
      height: 12px;
      width: 12px;
      top: 0;
      left: -2px;
      border-radius: 5px;
      background-color: rgba(255, 255, 255, 1);
      cursor: pointer;
    }

    >div.text {
      position: absolute;
      z-index: 1;
      height: 18px;
      width: 50px;
      bottom: -20px;
      left: -22px;
      color: @themeColor;
      text-align: center;
      font-size: 16px;
      line-height: 18px;
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
      background-color: @themeColor;
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
        margin-bottom: 30px;

        >div:nth-child(1) {
          display: block;
          height: auto;
          width: auto;
          position: relative;
          padding-left: 5px;
          margin-bottom: 80px;

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

    >div.submitBtn {
      display: block;
      height: auto;
      width: auto;
      margin: 30px 0;
      padding: 20px 100px;
      background-color: @themeColor;
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

// 完成问卷页面的样式
.finish-wrapper{
    width: 100%;
    height: 100%;
    // background-color: pink;
    .innerbox{
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
      .finish-title{
        width: 365px;
        height: 190px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: center;
         h2{
            font-family: '思源黑体';
            font-size: 36px;
            font-weight: 500;
            letter-spacing: 0px;
            line-height: 44px;
            margin-left: -18px;
            &::after{
                content: '✔';
                color:white;
                font-size: 24px;
                width:36px;
                height:36px;
                background: radial-gradient(104.2% 104.2%, rgba(30, 111, 255, 1) 0%, rgba(170, 203, 255, 1) 100%);
                border-radius: 50%;
                position: absolute;
                margin-left:8px;
                top: 5px;
                text-align: center;
                line-height: 36px;
            }
         }
         h3{
            font-family: '思源黑体';
            font-size: 36px;
            font-weight: 500;
            letter-spacing: 0px;
            line-height: 44px;
            color: rgba(30, 111, 255, 1);
         }
         p{
            font-family: '思源黑体';
            font-size: 20px;
            font-weight: 400;
            letter-spacing: 0px;
            line-height: 28px;
            color: rgba(0, 0, 0, 1);
            text-align: center;
         }
      }
       .finish-submit{
        width: 180px;
        height: 45px;
        background-color: rgba(30, 111, 255, 1);
        margin-top: 40px;
        &:hover{
            background-color: #4791ff;
        }
        &:active{
            background-color: #0f52d9;
        }
       }
    }

}

</style>