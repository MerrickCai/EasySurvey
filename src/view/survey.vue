<script setup>
//路由信息=>改用survey的哪套信息
import { useRoute } from "vue-router";
const route = useRoute();
const id = 1;

//获取此套问卷信息数据
import { useStore } from "../PiniaStores/index.js";
const datas = useStore();
datas.survey.currentSurvey = datas.survey.survey1[id - 1];
</script>

<template>
  <div id="wrapper">
    <div class="tag_wrapper">
      <router-link :to="{ path: '/survey/survey1/1' }" active-class="active">
        <span>威廉斯创造力倾向表A</span>
      </router-link>
      <router-link :to="{ path: '/survey/survey1/2' }" active-class="active">
        <span>威廉斯创造力倾向表B</span>
      </router-link>
      <router-link :to="{ path: '/survey/survey2/1' }" active-class="active">
        <span>贝尔宾团队理论测试</span>
      </router-link>
      <router-link :to="{ path: '/survey/surveynew' }" active-class="active">
        <span>点击创建新问卷</span>
      </router-link>
    </div>
    <div class="container">
      <!--折角（一直都在）-->
      <img dog-ear src="/tangible.png" />
      <div class="decoration5"></div>
      <!--填问卷时隐藏-->
      <template
        v-if="
          datas.survey.currentSurvey.status.intro ||
          datas.survey.currentSurvey.status.end
        "
      >
        <div class="decoration1"></div>
        <!--左上-->
        <div class="decoration2"></div>
        <!--右下-->
        <div class="decoration3"></div>
        <div class="decoration4"></div>
      </template>
      <!--子路由容器-->
      <router-view></router-view>
      <!--子路由容器-->
    </div>
  </div>
</template>

<style lang="less" scoped>
@tag_wrapperHeight: 40px;
@themeColor1: rgba(30, 111, 255, 1);
@themeColor2: rgba(235, 245, 255, 1);
@themeColor: rgba(30, 111, 255, 1);

div#wrapper {
  display: block;
  height: 100%;
  width: calc(100% - 14px);
  margin: 0 7px;

  > div.tag_wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    height: @tag_wrapperHeight;
    width: 100%;
    padding-left: 10px;

    > a {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: auto;
      margin-right: 5px;
      padding: 5px 30px 5px 30px;
      position: relative;
      background-color: @themeColor2;
      clip-path: polygon(
        83.5% 1%,
        84% 2%,
        84.5% 3%,
        84.5% 4%,
        85% 4%,
        100% 100%,
        0 100%,
        0 0,
        83% 0
      );
      border-radius: 4px 0 0 0;

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 10px;
        height: 12px;
        width: 12px;
        transform: translate(0, -50%);
        border: solid 1px rgba(0, 0, 0, 1);
        border-radius: 50%;
      }

      span {
        font-size: 1.2rem;
        color: rgba(67, 67, 67, 1);
      }

      &:hover {
        cursor: pointer;
      }

      &.active {
        background-color: @themeColor1;

        &::before {
          border: solid 1px rgba(255, 255, 255, 1);
        }

        span {
          color: rgb(255, 255, 255);
        }
      }
    }
  }

  > div.container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    height: calc(100% - @tag_wrapperHeight - 10px);
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
  }
}
</style>