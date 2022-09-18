<template>
  <div class="wrapper">


    <!--问卷介绍 -->
    <div intro v-if="Survey.status.begin">
      <div class="titleArea">
        <h2>{{ survey.intro.title }}</h2>
      </div>
      <p class="second-title">问卷介绍：</p>
      <p class="para" v-html="survey.intro.intro_content"></p>
      <div class="btn" @click="Survey.status.toOngoing()">
        <div>开始问卷</div>
      </div>
    </div>



    <!-- 问卷填写 -->
    <div content v-if="Survey.status.ongoing">

      <!-- 进度条 -->
      <div class="shadow"></div>
      <div class="progress" @click="scrollTo($event)">
        <span class="progress-part" v-for="item of survey.quesList" :key="item.questionId"
          :style="{ backgroundColor: `${item.progressPartbcg}` }">
        </span>
        <div class="outer-thumb" ref="thumb">
          <div class="bluebcg" ref="bluebcg"></div>
        </div>
        <div class="text" ref="text">0 %</div>
      </div>

      <!-- 介绍区域 -->
      <div class="intro">
        <div class="titleArea">
          <h2>{{ survey.intro.title }}</h2>
        </div>
      </div>

      <!-- 答题区域 -->
      <main ref="content" @scroll="onScroll">
        <p class="second-title">问卷介绍：</p>
        <p class="para" v-html="survey.intro.intro_content"></p>


        <div class="main" v-for="(item, index) of survey.quesList" ref="ques"
          :style="{ border: `${item.titleBorder}px solid red` }">

          <div class="questiontitle">{{ `${index + 1}. ${item.ques}` }}</div>

          <!-- 总宽度为600-->
          <div class="ques"
            :style="{ backgroundColor: `${item.value === 0 ? 'rgba(245, 245, 245, 1)' : 'rgb(229,229,229)'}`, }">
            <!-- bar -->
            <div v-for="(b, i) of barArr[index]" class="bar"
              @click="item.value = i + 1; item.seleted = item.optionId[i]; ">
              <div class="font">
                {{ survey.quesList[index].font[i] }}
              </div>
            </div>
            <div class="thumb"
              :style="{ left: `${item.value === 0 ? -12 : -12 + ((item.value - 1) * 600) / (barArr[index].length - 1)}px`, }">
            </div>
          </div>

        </div>


      </main>


      <!-- 问卷提交按钮 -->
      <div class="btn" @click="Finish">
        <div>提交问卷</div>
      </div>

    </div>


    <!-- 问卷完成 -->
    <div finish v-if="Survey.status.end">
      <div class="content">
        <h2>您已完成</h2>
        <h3>{{ survey.intro.title }}</h3>
        <p>感谢您的答题，本次问卷已全部结束</p>
      </div>
      <div class="btn" @click="router.push('/')">
        <div>完成答题</div>
      </div>
    </div>


  </div>
</template>

<script setup>
import { ref, reactive, inject } from 'vue'
import { ElMessage } from 'element-plus'
import axios from "axios"
import { useStore } from "../../Stores/index.js"
import { useRouter } from "vue-router"
const router = useRouter()
const datas = useStore()



// --------------------------- 获取父组件传入的问卷状态和数据 --------------------
const Survey = inject('Survey')
// 从父组件拿到数据
const surveyObj = ref(Survey.surveyObj)
console.log('父组件网络请求的数据', surveyObj)
// --------------------------- 获取父组件传入的问卷状态和数据 --------------------




// 封装一个survey---------------用以在模板和存放提交时候的用户数据------------------
const survey = reactive({})
// survey的介绍和提交问卷用的信息
survey.intro = {}
survey.effectiveNumber = surveyObj.value.questionnaire.effectiveNumber
survey.totalNumber = surveyObj.value.questionnaire.totalNumber
survey.count = surveyObj.value.questionnaire.count
survey.id = surveyObj.value.questionnaire.id
survey.intro.title = surveyObj.value.questionnaire.title
survey.intro.intro_content = surveyObj.value.questionnaire.message

// survey的问题列表数据
survey.quesList = []
let optionDetail = []  //装全部的选项的文字描述（如比较符合....这些）
let optionId = []   //装全部选项对应的ID
for (let i in surveyObj.value.optionMap) {
  let t1 = []
  let t2 = []
  for (let j = 0; j < surveyObj.value.optionMap[i].length; j++) {
    t1.push(surveyObj.value.optionMap[i][j].detail)
    t2.push(surveyObj.value.optionMap[i][j].id)
  }
  optionDetail.push(t1)
  optionId.push(t2)
}
//  因为optionDetail和optionId是数组，是以0开始的，所以在赋值给每一项的时候索引要从0开始
let start = 0
// 配置每一道题目
for (let i in surveyObj.value.questionInfoMap) {
  let item = surveyObj.value.questionInfoMap[i]
  i /= 1
  let obj = {}
  obj.ques = item.info  //题目
  obj.type = item.type
  obj.value = 0
  obj.titleBorder = 0
  obj.progressPartbcg = '#ccc'
  obj.series = optionDetail[start].length
  obj.font = optionDetail[start]
  obj.questionId = surveyObj.value.optionMap[i][0].questionId
  obj.optionId = optionId[start]
  obj.seleted = 0
  start++
  survey.quesList.push(obj)
}
console.log('封装好的数据', survey)
// 封装一个survey---------------用以在模板和存放提交时候的用户数据------------------





// ---------------------------   进度条 ---------------------------------------
//模板引用
const thumb = ref()
const bluebcg = ref()
const text = ref()
const content = ref()
//点击事件
function scrollTo(e) {
  const scrollMaxDistance = content.value.scrollHeight - content.value.offsetHeight
  content.value.scrollTop = scrollMaxDistance * (e.offsetY / 250);
  text.value.innerHTML = `${Math.floor((e.offsetY / 250) * 100)} %`;
}
//滚动事件
function onScroll() {
  const scrollMaxDistance = content.value.scrollHeight - content.value.offsetHeight
  thumb.value.setAttribute('style', `top: ${250 * (content.value.scrollTop / scrollMaxDistance) - 8}px`);
  text.value.innerHTML = `${Math.floor((content.value.scrollTop / scrollMaxDistance) * 100)} %`
  bluebcg.value.style.height = `${250 * (content.value.scrollTop / scrollMaxDistance)}px`
}
// ---------------------------   进度条 ---------------------------------------



//-------------------------------- 提交函数---------------------------------------
function sumbit() {
  // 请求参数里面的问卷信息列表
  const questionAnswerList = []
  for (let item of survey.quesList) {
    let obj = {}
    obj.questionId = item.questionId
    obj.type = item.type
    obj.optionList = [{
      id: item.seleted,
      detail: item.font[item.value - 1]
    }]
    questionAnswerList.push(obj)
  }
  axios({
    url: `https://q.denglu1.cn/api/questions/commit`,
    method: 'post',
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
    headers: { 'token': datas.user.token },
    data: {
      "questionnaire_id": survey.id,
      "totalNumber": survey.totalNumber,
      "count": survey.count,
      "effectiveNumber": survey.effectiveNumber,
      "questionAnswerList": questionAnswerList,
    }
  }).then((response) => {
    console.log('提交完成返回的response', response);
    if (response.data.code === 200) {
      if (response.data.msg === '提交成功！') {
        ElMessage({
          message: '提交成功',
          type: 'success',
          duration: 3000,
          showClose: true,
          center: true
        })
        Survey.status.toEnd()
      } else {
        ElMessage({
          message: '问卷已收集齐了',
          type: 'warning',
          duration: 3000,
          showClose: true,
          center: true
        })
      }
    } else {
      ElMessage({
        message: '请勿重复提交',
        type: 'error',
        duration: 3000,
        showClose: true,
        center: true
      })
    }
  }).catch((error) => {
    ElMessage({
      message: '由于网络问题提交出错',
      type: 'error',
      duration: 3000,
      showClose: true,
      center: true
    })
    console.log('提交出错', error)
  })
}
//-------------------------------- 提交函数---------------------------------------


// ------------------------- 提交问卷前判断完成度 ------------------------
//模板引用
const ques = ref()
//判断函数
function Finish() {
  let flag = true
  const uncomplete = []
  let queId = 0
  bluebcg.value.style.display = 'none'
  survey.quesList.forEach(item => {
    item.titleBorder = 0
    item.progressPartbcg = "#5a9afa"
    if (item.value === 0) {
      flag = false
      item.titleBorder = 1
      item.progressPartbcg = "red"
      uncomplete.push(queId)
    }
    queId++
  })
  let fisrtreturn = uncomplete[0]
  if (uncomplete.length !== 0) {
    ElMessage({
      message: '请完成整张问卷',
      type: 'warning',
      duration: 3000,
      showClose: true,
      center: true
    })
    content.value.scrollTop = ques.value[fisrtreturn].offsetTop - 2
  }
  if (!flag) {
    return false
  }
  else {
    sumbit()
  }
}
// ------------------------- 提交问卷前判断完成度 ------------------------





// ---------------------------用来判断滑块每次该滑动多远的距离------------------------------
const barArr = new Array(survey.quesList.length)
  .fill(0)
  .map((item, index) =>
    new Array(survey.quesList[index].series).fill(0)
  )
  // ---------------------------用来判断滑块每次该滑动多远的距离------------------------------
</script>

<style lang="less" scoped>
div.wrapper {
  display: block;
  height: 100%;
  width: 100%;
}

// 问卷介绍
div[intro] {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;

  >div.titleArea {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    height: 30%;
    width: 80%;

    >h2 {
      display: block;
      height: auto;
      width: auto;
      font-size: 30px;
      font-weight: bold;
      position: relative;

      &::after {
        content: '';
        display: block;
        height: 4px;
        width: 100%;
        position: absolute;
        bottom: -4px;
        left: 0;
        background-color: #1e6fff;
        border-radius: 10px;
      }
    }
  }

  >p.second-title {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
    height: auto;
    width: 70%;
    margin: 20px 0;
    font-size: 20px;
    color: rgba(30, 111, 255, 1);
  }

  >p.para {
    display: block;
    height: auto;
    width: 70%;
    font-size: 18px;
    color: rgba(0, 0, 0, 1);
  }

  >div.btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 30%;
    width: auto;

    >div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 240px;
      height: 64px;
      font-size: 20px;
      color: rgba(255, 255, 255, 1);
      background-color: rgba(30, 111, 255, 1);
      border-radius: 10px;
      cursor: pointer;
    }
  }
}

// 问卷填写
div[content] {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  position: relative;

  >div.shadow {
    position: absolute;
    bottom: 0;
    right: 0;
    height: calc(100% - 80px);
    width: 20px;
    background-color: white;
    z-index: 1;

    @media (max-width:800px) {
      display: none;
    }
  }

  >div.progress {
    position: absolute;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 250px;
    width: 8px;
    bottom: 50%;
    transform: translateY(50%);
    right: 100px;
    border-radius: 5px;
    background-color: rgba(204, 204, 204, 1);
    cursor: pointer;

    @media (max-width:800px) {
      display: none;
    }

    >span.progress-part {
      flex: 1 1 0;
      display: block;
      height: auto;
      width: 8px;
      pointer-events: none;

      &:nth-of-type(1) {
        border-radius: 5px 5px 0 0;
      }

      &:nth-last-of-type(1) {
        border-radius: 0 0 5px 5px;
      }
    }

    >div.outer-thumb {
      content: '';
      position: absolute;
      z-index: 2;
      height: 12px;
      width: 12px;
      top: 0;
      left: -2px;
      border-radius: 5px;
      background-color: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
      cursor: pointer;

      &::before {
        content: '';
        width: 100%;
        height: 100%;
        border-radius: 5px;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
      }

      .bluebcg {
        position: absolute;
        left: 2px;
        bottom: 8px;
        height: 0px;
        width: 8px;
        z-index: -9;
        border-radius: 5px;
        background-color: rgb(71, 145, 255);
        pointer-events: none;
      }
    }

    >div.text {
      position: absolute;
      z-index: 1;
      height: 18px;
      width: 50px;
      bottom: -30px;
      left: -22px;
      color: rgba(30, 111, 255, 1);
      text-align: center;
      font-size: 16px;
      line-height: 16px;
    }
  }

  >div.intro {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: flex-start;
    width: calc(100% - 140px);
    height: auto;
    padding: 10px 0 10px 20px;

    @media (max-width:800px) {
      width: 100%;
      padding: 10px;
      align-items: center;
    }

    >div.titleArea {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      height: auto;
      width: auto;

      >h2 {
        display: block;
        height: auto;
        width: auto;
        font-size: 28px;
        font-weight: bold;
        position: relative;

        &::after {
          content: '';
          display: block;
          height: 4px;
          width: 100%;
          position: absolute;
          bottom: -4px;
          left: 0;
          background-color: #1e6fff;
          border-radius: 10px;
        }
      }
    }
  }

  >main {
    flex: 1;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: auto;
    padding-left: 20px;
    padding-top: 5px;
    overflow: auto;
    scrollbar-width: none;
    position: relative;

    @media (max-width:800px) {
      padding: 0 10px;
    }

    >p.second-title {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-end;
      height: auto;
      width: calc(100% - 140px);
      font-size: 20px;
      color: rgba(30, 111, 255, 1);

      @media (max-width:800px) {
        width: 100%;
      }
    }

    >p.para {
      display: block;
      height: auto;
      width: calc(100% - 140px);
      margin: 5px 0;
      font-size: 18px;
      color: rgba(0, 0, 0, 1);

      @media (max-width:800px) {
        width: 100%;
      }
    }

    >div.main {
      display: flex;
      flex-direction: column;
      width: calc(100% - 140px);
      height: auto;
      margin-bottom: 10px;
      padding: 5px;

      @media (max-width:800px) {
        width: 100%;
      }

      >div.questiontitle {
        display: block;
        height: auto;
        width: auto;
        font-size: 16px;
        position: relative;
        padding-left: 10px;
        margin-bottom: 50px;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 3px;
          z-index: 1;
          width: 4px;
          height: 100%;
          background-color: #1e6fff;
        }
      }

      >div.ques {
        @Height: 20px;
        @Width: 605px;
        @barWidth: 5px;
        @barHeight: 30px;
        @thumbSize: @Height+4px;



        margin-left: 15px;
        position: relative;
        display: flex;
        height: @Height;
        width: @Width;
        justify-content: space-between;


        >div.bar {
          height: @barHeight;
          width: @barWidth;
          background-color: rgba(204, 204, 204, 1);
          cursor: pointer;
          transform: translateX(-2px) translateY(-9px);
        }

        .font {
          text-align: center;
          width: 70px;
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

  >div.btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: auto;
    width: 100%;
    margin: 10px 0;

    >div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 220px;
      height: 54px;
      font-size: 20px;
      color: rgba(255, 255, 255, 1);
      background-color: rgba(30, 111, 255, 1);
      border-radius: 10px;
      cursor: pointer;
    }
  }
}

// 问卷完成
div[finish] {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;

  >div.content {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 50%;

    >h2 {
      display: block;
      height: auto;
      width: auto;
      font-size: 36px;
      color: rgba(0, 0, 0, 1);
      position: relative;
      transform: translateX(-25px);

      &::after {
        content: '✔';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: -50px;
        width: 36px;
        height: 36px;
        color: white;
        font-size: 24px;
        text-align: center;
        line-height: 36px;
        background-image: radial-gradient(104.2% 104.2%, rgba(30, 111, 255, 1) 0%, rgba(170, 203, 255, 1) 100%);
        border-radius: 50%;
      }
    }

    >h3 {
      display: block;
      height: auto;
      width: auto;
      font-size: 36px;
      font-weight: bold;
      color: rgba(30, 111, 255, 1);
      margin: 10px 0;
    }

    >p {
      display: block;
      height: auto;
      width: auto;
      font-size: 20px;
      color: rgba(0, 0, 0, 1);
    }
  }

  >div.btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 30%;
    width: auto;

    >div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 240px;
      height: 64px;
      font-size: 20px;
      color: rgba(255, 255, 255, 1);
      background-color: rgba(30, 111, 255, 1);
      border-radius: 10px;
      cursor: pointer;
    }
  }
}
</style>