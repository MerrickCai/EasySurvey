<script setup>
import survey1 from "../components/surveyTemplate/survey1.vue"
import survey2 from "../components/surveyTemplate/survey2.vue"
import surveyComplex from '../components/surveyTemplate/surveyComplex.vue'
import { ref, reactive, provide } from "vue"
import axios from "axios"
import { useRoute } from "vue-router"
import { useStore } from "../PiniaStores/index.js"
const route = useRoute()
const datas = useStore()



//------------------- 问卷模板子组件 -----------------------------
//矩阵(survey1)：count 2
//量表(survey2)：count 3
//普通(surveyComplex)：count 5
const surveyTemplateList = [survey1, survey2, surveyComplex]
const currentView = ref()
//------------------- 问卷模板子组件 -----------------------------




//------------------------- 问卷状态和数据对象 ------------------------
const Survey = reactive({
  status: {
    begin: true,
    ongoing: false,
    end: false,
    toOngoing() {
      this.begin = false
      this.ongoing = true
    },
    toEnd() {
      this.ongoing = false
      this.end = true
    }
  },
  surveyObj: null,
})
//------------------------- 问卷状态和数据对象 ------------------------




//--------------------- 网络请求获取问卷类型和数据 -------------------------
axios({
  url: `https://q.denglu1.cn/user/fillQuestionnaire/${route.params.questionnaireId}`,
  method: "get",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  headers: { token: datas.user.token },
})
  .then((response) => {
    switch (response.data.data.questionnaire.count) {
      case 2: // 矩阵
        currentView.value = surveyTemplateList[0]
        Survey.surveyObj = response.data.data
        break
      case 3: // 量表
        currentView.value = surveyTemplateList[1]
        Survey.surveyObj = response.data.data
        break
      case 5: // 普通
        currentView.value = surveyTemplateList[2]
        Survey.surveyObj = {
          intro: {
            info_title: '混合型问卷',
            info_para: '单选 多选 文本'
          },
          questionList: [ // type：单选0 多选1 文本2
            {
              questionId: 1,
              type: 2,
              questiontitle: '我认为我能为团队做出的贡献是：',
              value: '',
              progressPartbcg: '#ccc',
              outlineColor: 'rgba(255,255,255,0)'
            },
            {
              questionId: 2,
              type: 0,
              questiontitle: '我认为我能为团队做出的贡献是：',
              value: 0,
              progressPartbcg: '#ccc',
              outlineColor: 'rgba(255,255,255,0)',
              option: ['aaAAAhaha', 'BBB', 'CCC']
            },
            {
              questionId: 3,
              type: 1,
              questiontitle: '我认为我能为团队做出的贡献是：',
              value: [],
              progressPartbcg: '#ccc',
              outlineColor: 'rgba(255,255,255,0)',
              option: ['111', '222', '333']
            },
            {
              questionId: 4,
              type: 0,
              questiontitle: '我认为我能为团队做出的贡献是：',
              value: 0,
              progressPartbcg: '#ccc',
              outlineColor: 'rgba(255,255,255,0)',
              option: ['aaAAAhaha', 'BBB', 'CCC']
            },
            {
              questionId: 5,
              type: 2,
              questiontitle: '我认为我能为团队做出的贡献是：',
              value: '',
              progressPartbcg: '#ccc',
              outlineColor: 'rgba(255,255,255,0)'
            }
          ]
        }
        break
    }
  })
  .catch((error) => {
    console.log(error)
  })
//--------------------- 网络请求获取问卷类型和数据 -------------------------





//--------------------- provide问卷对象给问卷模板子组件 -------------------------
provide("Survey", Survey)
//--------------------- provide问卷对象给问卷模板子组件 -------------------------
</script>

<template>
  <div wrapper>
    <div class="decoration1" v-show="Survey.status.begin || Survey.status.end"></div>
    <div class="decoration2" v-show="Survey.status.begin || Survey.status.end"></div>
    <div class="decoration3" v-show="Survey.status.begin || Survey.status.end"></div>
    <div class="decoration4" v-show="Survey.status.begin || Survey.status.end"></div>
    <div class="decoration5"></div>
    <img dog-ear src="/tangible.png" />
    <component :is="currentView"></component>
  </div>
</template>

<style lang="less" scoped>
div[wrapper] {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height: calc(100% - 5px);
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  border-radius: 10px;
  box-shadow: 0px 5px 10px 0 rgba(73, 107, 158, 0.1);
  background-color: rgb(255, 255, 255);
  z-index: 0;

  >div.decoration1 {
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

  >div.decoration2 {
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

  >div.decoration3 {
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

  >div.decoration4 {
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

  >div.decoration5 {
    display: block;
    height: calc(108px + 5px);
    width: calc(120px + 7px);
    position: absolute;
    z-index: 1;
    top: -5px;
    right: -7px;
    background-color: rgb(255, 255, 255, 1);
  }

  >img[dog-ear] {
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