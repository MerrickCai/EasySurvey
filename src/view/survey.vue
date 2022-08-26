<script setup>
//准备工作
import { provide, ref, computed, reactive } from "vue"
import axios from "axios"
import { useRoute } from "vue-router"
const route = useRoute()
import { useStore } from "../PiniaStores/index.js"
const datas = useStore()



//问卷模板子组件(五套)：矩阵，量表（特殊：贝尔宾），单选，多选，文本。分别对应类型1-5
import survey1 from "../components/surveyTemplate/survey1.vue"
import survey2 from "../components/surveyTemplate/survey2.vue"
import survey3 from "../components/surveyTemplate/survey3.vue"
import survey4 from "../components/surveyTemplate/survey4.vue"
import survey5 from "../components/surveyTemplate/survey5.vue"
const surveyTemplateList = [survey1, survey2, survey3, survey4, survey5]
const viewId = ref(0)
const currentView = computed(() => surveyTemplateList[viewId.value - 1])



//currentSurvey对象
const currentSurvey = reactive({
  status: {
    begin: true,
    ongoing: false,
    end: false,
  },
  toOngoing() {
    this.status.begin = false;
    this.status.ongoing = true;
  },
  toEnd() {
    this.status.ongoing = false;
    this.status.end = true;
  },
  surveyObj: {},  //网络请求获取问卷数据并存入
  getSurvey() {
    axios({
      url: `https://q.denglu1.cn/user/fillQuestionnaire/${route.params.questionnaireId}`,
      method: "get",
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
      headers: { token: datas.user.token },
    })
      .then((response) => {
        //根据问卷类型动态改变视图
        switch (response.data.data.questionnaire.count) {
          case 0://单选
            viewId.value = 3
            break
          case 1: //多选
            viewId.value = 4
            break
          case 2: //矩阵
            viewId.value = 1
            break
          case 3: //量表（特殊：贝尔宾）
            viewId.value = 2
            break
          case 4: //文本
            viewId.value = 5
            break
        }
        this.surveyObj = response.data.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
})


//开始网络请求
currentSurvey.getSurvey()
//provide这个对象给子组件
provide("currentSurvey", currentSurvey);
</script>

<template>
  <div class="wrapper">
    <!--装饰品-->
    <div class="decoration1" v-show="currentSurvey.status.begin || currentSurvey.status.end"></div>
    <div class="decoration2" v-show="currentSurvey.status.begin || currentSurvey.status.end"></div>
    <div class="decoration3" v-show="currentSurvey.status.begin || currentSurvey.status.end"></div>
    <div class="decoration4" v-show="currentSurvey.status.begin || currentSurvey.status.end"></div>
    <div class="decoration5"></div>
    <img dog-ear src="/tangible.png" />
    <!--装饰品-->

    <!--动态组件-->
    <Transition name="fade" mode="out-in">
      <KeepAlive>
        <component :is="currentView" :survey-obj="currentSurvey.surveyObj"></component>
      </KeepAlive>
    </Transition>
  </div>
</template>

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
  border-radius: 10px;
  box-shadow: 0px 5px 10px 0 rgba(73, 107, 158, 0.1);
  background-color: rgb(255, 255, 255);
  z-index: 0;

  div.decoration1 {
    display: block;
    height: 400px;
    width: 400px;
    position: absolute;
    z-index: -1;
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
    z-index: -1;
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
    z-index: -2;
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
    z-index: -3;
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
</style>