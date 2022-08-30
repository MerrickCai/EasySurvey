<template>
    <div wrapper>

        <!-- 介绍页 -->
        <div class="wrapper" v-if="Survey.status.begin">
            <h2 class="title">{{  survey.intro.info_title  }}</h2>
            <p class="second-title">问卷介绍：</p>
            <p class="para">{{  survey.intro.info_para  }}</p>
            <el-button type="primary" class="btn" @click="Survey.status.toOngoing()">开始问卷</el-button>
        </div>



        <!-- 问卷内容部分 -->
        <div class="wrapper extrachange" v-if="Survey.status.ongoing">
            <!--问卷题目和介绍-->
            <div class="topbox">
                <h2 class="top_title">{{  survey.intro.info_title  }}</h2>
                <h5 class="top_sectitle">问卷介绍：</h5>
                <div class="para_wrapper">
                    <p class="top_para">{{  survey.intro.info_para  }}</p>
                </div>
            </div>
            <!--问卷题目和介绍-->

            <!-- 进度条 -->
            <div class="zhedang"></div>
            <div class="progress" @click="scrollTo($event)">
                <div>
                    <!-- 进度条分段，使得点击提交按钮后进度条可以分段显示红色背景，多少个题目就分多少段 (外面多个div包裹下面的style的last-child才能生效)-->
                    <div class="progress-part" v-for="item of survey.questionList" :key="item.id"
                        :style="{ height: `${progressPartHeight}px`, backgroundColor: `${item.progressPartbcg}` }">
                    </div>
                </div>
                <div class="outer-thumb" ref="thumb">
                    <div class="bluebcg" ref="bluebcg" :style="{ height: `${bluebcg_height}px` }"></div>
                </div>
                <div class="text" ref="text">0%</div>
            </div>
            <!-- 进度条 -->

            <!--问卷区域-->
            <div class="content" ref="content" @scroll="onScroll($event)">
                <!-- 题目 -->
                <!-- 第一层循环 item, i -->
                <div class="main" v-for="(item, i) of survey.questionList" :key="item.id"
                    :style="{ height: `${37.5 * item.question.length}px` }">
                    <div class="questiontitle" ref="questiontitle"
                        :style="{ border: `${item.titleBorder}px solid red` }">
                        {{  item.questiontitle  }}
                        <p class="scoretips">可支配分数
                            <span class="score">{{  item.score  }}</span>
                        </p>
                    </div>
                    <!-- 第二层循环 elem,index -->
                    <div class="questionList" v-for="(elem, index) of item.question" :key="index">
                        {{  elem.detail  }}
                        <div class="slide" :style="{ backgroundColor: `${item.bcg}` }">
                            <!--400为slide的总宽度，根据分数总数来定每次滑块滑多少-->
                            <div class="Gradient"
                                :style="{ width: `${(elem.value) * (400 / (barArr[i].length - 1))}px` }">
                            </div>
                            <!-- 第三层循环 b,j -->
                            <div v-for="(b, j) of barArr[i]" :key="i" :class="j % 2 === 0 ? 'doublebar' : 'bar'"
                                @click="distributeScore(elem, item, j)">
                                <span class="num" v-if="!(j % 2)">{{  j  }}</span>
                            </div>
                            <img class="thumb" :style="{ left: `${(elem.value) * (400 / (barArr[i].length - 1))}px` }"
                                :src="elem.value === 0 ? item.silderSrc : '/blue.png'">
                            <span class="edit" v-show="!elem.isEdit" @click="editHandle(elem, index)">{{  elem.value 
                                }}<img src="/icon-edit.png"></span>
                            <input class="editinput" type="text" v-show="elem.isEdit"
                                @blur="editHandle2(elem, item, $event)" @keydown.enter="editHandle2(elem, item, $event)"
                                :value="elem.value" ref="myRef">
                        </div>
                    </div>
                </div>
                <el-button type="primary" class="submit" @click="toFinish()">提交问卷</el-button>
            </div>
            <!--问卷区域-->
        </div>

        <!-- 问卷完成部分 -->
        <div class="finish-wrapper" v-if="Survey.status.end">
            <div class="innerbox">
                <div class="finish-title">
                    <h2>您已完成</h2>
                    <h3>{{  survey.intro.info_title  }}</h3>
                    <p>感谢您的答题，本次问卷已全部结束</p>
                </div>
                <el-button type="primary" class="finish-submit"   @click="router.push('/')">完成答题</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref, inject, reactive, computed, nextTick } from 'vue'
import axios from "axios"
import { useStore } from "../../PiniaStores/index.js"
import { useRouter } from "vue-router"
const router = useRouter()
const datas = useStore()



// --------------------------- 获取父组件传入的问卷状态和数据 --------------------
const Survey = inject('Survey')
const surveyObj = ref(Survey.surveyObj)
// --------------------------- 获取父组件传入的问卷状态和数据 --------------------





// --------------------------- 封装一个survey=>用以在模板和存放提交时候的用户数据 ------------------
const survey = reactive({})

// survey的介绍和提交问卷用的信息
survey.intro = {};
survey.effectiveNumber = surveyObj.value.questionnaire.effectiveNumber;
survey.totalNumber = surveyObj.value.questionnaire.totalNumber;
survey.count = surveyObj.value.questionnaire.count;
survey.id = surveyObj.value.questionnaire.id;
survey.intro.info_title = surveyObj.value.questionnaire.title;
survey.intro.info_para = surveyObj.value.questionnaire.message;

// survey的问题列表数据
survey.questionList = [];
let optionDetail = [];  //装每一项option的数据
for (let i in surveyObj.value.optionMap) {
    let t1 = [];
    for (let j = 0; j < surveyObj.value.optionMap[i].length; j++) {
        t1.push({
            detail: surveyObj.value.optionMap[i][j].detail,
            value: 0,
            isEdit: false,
            id: surveyObj.value.optionMap[i][j].id
        });
    }
    optionDetail.push(t1);
}

let start = 0;
// 配置每一道题目
for (let i in surveyObj.value.questionInfoMap) {
    let item = surveyObj.value.questionInfoMap[i];
    i /= 1;
    let obj = {};
    obj.questiontitle = item.info;  //题目
    obj.value = 0;
    obj.titleBorder = 0;
    obj.progressPartbcg = '#ccc';
    obj.question = optionDetail[start];
    obj.questionId = surveyObj.value.optionMap[i][0].questionId;
    obj.silderSrc = '/blue.png';
    obj.score = item.dominate;
    obj.staticScore = obj.score;
    obj.secscore = surveyObj.value.optionMap[i][0].dominate;
    start++;
    survey.questionList.push(obj)
}
console.log('封装好的数据', survey)
// --------------------------- 封装一个survey=>用以在模板和存放提交时候的用户数据 ------------------





//-------------------------------- 提交函数---------------------------------------
function sumbit() {
    // 请求参数里面的问卷信息列表
    const questionAnswerList = [];
    const scoreList = [];
    for (let item of survey.questionList) {
        let obj = {};
        obj.questionId = item.questionId;
        obj.optionList = [];
        for (let elem of item.question) {
            let obj2 = {};
            obj2.id = elem.id;
            obj.optionList.push(obj2);
            scoreList.push(elem.value / 1);
        }
        questionAnswerList.push(obj);
    }
    axios({
        url: `https://q.denglu1.cn/questions/commit`,
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
            "scoreList": scoreList
        }
    }).then((response) => {
        console.log(response);
        if (response.data.code === 200) {
            if (response.data.msg === '问卷已收集齐了') {
                ElMessage({
                    message: '问卷已收集齐了',
                    type: 'warning',
                    duration: 4000,
                    showClose: true,
                    center: true
                })
            } else {
                Survey.status.toEnd()
            }
        } else {
            ElMessage({
                message: '提交失败,请勿重复提交',
                type: 'error',
                duration: 4000,
                showClose: true,
                center: true
            })
        }
    }).catch((error) => {
        console.log(error)
    })
}
//-------------------------------- 提交函数---------------------------------------




// -----------------------------分配分数相关的变量和方法-----------------------------
// 分配分数
function distributeScore(elem, item, num) {
    let newValue = num / 1;
    let oldValue = elem.value / 1;
    const staticScore = survey.questionList[0].score;
    if (item.score <= 0) {
        if (oldValue < newValue) {
            return
        }
    }
    if (item.score < (newValue - oldValue)) return;
    elem.value = num;
    item.score = item.staticScore;
    item.question.forEach(e => {
        item.score -= e.value;
    });
    //   按照分数，如果分配完了背景颜色改变
    if (item.score === 0) {
        item.bcg = '#e5e5e5';
        item.silderSrc = '/disable.png';
    }
    if (item.score > 0) {
        item.bcg = '#f5f5f5';
        item.silderSrc = '/blue.png';
    }
}
// -----------------------------分配分数相关的变量和方法-----------------------------



//--------------------------   次级标题编辑相关的变量和方法  --------------------------------
// 切换编辑的input框
const myRef = ref(null);
// 切换至编辑
function editHandle(elem, index) {
    elem.isEdit = true;
    // 默认获取焦点
    nextTick(() => {
        myRef.value[index].focus()
    });

}
// 编辑状态保存分数
function editHandle2(elem, item, e) {
    elem.isEdit = false;
    let newValue = e.target.value;
    if (isNaN(newValue) || newValue < 0 || newValue > item.secscore) {
        alert('分数超出了可选范围');
        return
    }
    distributeScore(elem, item, newValue)
}
//--------------------------   次级标题编辑相关的变量和方法  --------------------------------





// ---------------------------   进度条 ---------------------------------------
const thumb = ref(null);
const text = ref(null);
const content = ref(null);
// 滚动条的蓝色背景的dom
const bluebcg = ref(null);
let bluebcg_height = ref(0);
// 中转变量
let temp;
// 滚动条
const scrollDistence = ref(0)
function scrollTo(e) {
    if (scrollDistence.value === 0) {
        //此为滚动距离scrollTop最大值（e.currentTarget.offsetHeight == e.currentTarget.clientHeight）
        scrollDistence.value = content.value.scrollHeight - content.value.offsetHeight;
    }
    // 此页面滚动条为300px
    //转换(e.offsetY是鼠标点击进度条的位置[0,300]，进度条总长300px)
    content.value.scrollTop = (scrollDistence.value) * (e.offsetY / 300) - 8;
    text.value.innerHTML = `${Math.ceil((e.offsetY / 300) * 100)} %`;

}
function onScroll(e) {
    if (scrollDistence.value === 0) {
        scrollDistence.value = content.value.scrollHeight - content.value.offsetHeight;
    }
    //转换
    thumb.value.setAttribute('style', `top: ${(300) * (content.value.scrollTop / scrollDistence.value) - 8}px`);
    text.value.innerHTML = `${Math.ceil((content.value.scrollTop / scrollDistence.value) * 100) > 100 ? 100 : Math.ceil((content.value.scrollTop / scrollDistence.value) * 100)} %`
    temp = thumb.value.style.top.split("");
    temp.pop();
    temp.pop();
    temp = temp.join("") / 1 + 8;
    bluebcg_height.value = temp;
}
// ---------------------------   进度条 ---------------------------------------





// ------------------------- 提交问卷前判断完成度 ------------------------
// 获取全部questiontitle
const questiontitle = ref(null);
// 进度条片段的高度
const progressPartHeight = 300 / (survey.questionList.length);
// 提交按钮  跳转：答题页==>完成页
function toFinish() {
    let flag = true;
    // 记录未完成的问卷id
    const uncomplete = [];
    let queId = 1;
    bluebcg.value.style.display = 'none';      // 进度条滚动的蓝色背景失效
    survey.questionList.forEach(item => {
        item.titleBorder = 0;
        item.progressPartbcg = '#5a9afa';
        if (item.score !== 0) {
            flag = false;
            uncomplete.push(queId);
            item.titleBorder = 1;
            item.progressPartbcg = 'red';
        }
        queId++;
    });
    // console.log(uncomplete); 
    // console.log(questiontitle.value[0].offsetTop); 保存对应未完成题目距离顶部的距离

    let fisrtreturn = uncomplete[0] - 1;
    if (uncomplete.length) {
        content.value.scrollTop = questiontitle.value[fisrtreturn].offsetTop;
    }
    //    console.log(progressPartHeight);
    if (!flag) return
    sumbit();
}
// ------------------------- 提交问卷前判断完成度 ------------------------




//----------------- 用来给上面的模板计算每次thumb应该移动多少的---------------------
const barArr = new Array(survey.questionList.length).fill(0).map(
    (item, index) => new Array(survey.questionList[index].secscore + 1)
)
//----------------- 用来给上面的模板计算每次thumb应该移动多少的---------------------
</script>


<style scoped lang='less'>
@a: 1px;

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

// 供调用
.public_title() {
    display: block;
    font-size: 36*@a;
    font-weight: 500;
    letter-spacing: 0*@a;
    line-height: 44*@a;
    vertical-align: middle;
    position: relative;

    &::after {
        content: '';
        width: 100%;
        height: 3px;
        background-color: #1e6fff;
        position: absolute;
        bottom: -2px;
        left: 0;
    }
}

// 供调用
.public_sectitle() {
    font-family: '思源黑体';
    font-size: 20*@a;
    font-weight: 500;
    letter-spacing: 0*@a;
    line-height: 24*@a;
    color: rgba(30, 111, 255, 1);
    text-align: left;
    vertical-align: middle;
}

// 介绍页面部分
.wrapper {
    width: 100%;
    height: 100%;
    position: relative;

    .title {
        .public_title();
        text-align: center;
        position: absolute;
        top: 70*@a;
        left: 0;
        right: 0;
        margin: auto;
        width: 350px;
        white-space: pre-wrap;
    }

    .second-title {
        .public_sectitle();
        position: absolute;
        // t304
        top: 220*@a;
        left: 203*@a;
    }

    .para {
        width: 800px;
        font-size: 16*@a;
        font-weight: 400;
        letter-spacing: 0*@a;
        line-height: 22*@a;
        color: rgba(0, 0, 0, 1);
        text-align: left;
        vertical-align: middle;
        position: absolute;
        top: 260*@a;
        left: 203*@a;
        white-space: pre-wrap;
    }

    .btn {
        width: 240*@a;
        height: 64*@a;
        position: absolute;
        left: 450*@a;
        top: 440*@a;
        background-color: rgba(30, 111, 255, 1);
        font-size: 20*@a;
        font-weight: 500;
        letter-spacing: 0*@a;
        line-height: 28*@a;
        color: rgba(255, 255, 255, 1);
        text-align: left;
        vertical-align: top;
        border-radius: 6*@a;
    }

    .circle1 {
        width: 170*@a;
        height: 170*@a;
        border-radius: 50%;
        background-color: rgba(235, 245, 255, 1);
        position: absolute;
        bottom: -20*@a;
        right: 94*@a;
    }

    .circle2 {
        width: 150*@a;
        height: 150*@a;
        border-radius: 50%;
        background-color: rgba(71, 145, 255, 1);
        position: absolute;
        bottom: 40*@a;
        right: 44*@a;
        z-index: 2;
    }

    .circle3 {
        width: 100*@a;
        height: 100*@a;
        border-radius: 50%;
        background-color: rgba(30, 111, 255, 1);
        position: absolute;
        bottom: 80*@a;
        right: -25.4px;
    }
}


// 答题内容部分
// 头部的文字解释
.topbox {
    position: absolute;
    left: 40px;
    top: 40px;
    display: flex;
    flex-direction: column;

    .top_title {
        .public_title();
        width: 655px;
    }

    .top_sectitle {
        .public_sectitle();
        font-size: 18px;
        margin-top: 12px;
    }

    .para_wrapper {
        width: 1050px;

        .top_para {
            font-family: '思源黑体';
            font-size: 12.4px;
            line-height: 22px;
            font-weight: 400;
        }
    }
}

//  遮挡原来的
.zhedang {
    position: absolute;
    right: 7px;
    background-color: white;
    width: 10px;
    height: 500px;
    z-index: 10;
    bottom: 0;
}

//   滚动条
.progress {
    position: absolute;
    z-index: 1;
    height: 300px;
    width: 8px;
    bottom: 65px;
    right: 35px;
    border-radius: 5px;
    background-color: rgba(204, 204, 204, 1);
    cursor: pointer;

    .outer-thumb {
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

        // 为了使白色按钮盖过蓝色背景   
        &::before {
            content: '';
            width: 100%;
            height: 100%;
            border-radius: 5px;
            position: absolute;
            background-color: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
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
    }

    .text {
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
}

// 问卷题目内容部分
.content {
    position: absolute;
    top: 220px;
    left: 50px;
    width: 1155px;
    height: 350px;
    overflow: auto;

    .main {
        background-color: white;
        height: 300px;
        width: 1065px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 38px;
        // background-color: #bfa;
    }

    .questiontitle {
        font-size: 16px;
        font-family: '思源黑体';
        display: flex;
        width: 740px;
        justify-content: space-between;
        position: relative;
        left: 5px;

        .score {
            display: inline-block;
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background-color: #447eff;
            color: white;
            text-align: center;
            line-height: 24px;
            font-size: 12px;
            padding-right: 1px;
            position: absolute;
            top: 0px;
            margin-left: 3px;
        }

        .scoretips {
            font-family: '思源黑体';
            text-align: center;
            // transform: translateY(5px);
            height: 26px;
            line-height: 26px;
            transform: translateX(-35px);
            // background-color: black;
        }

        &::before {
            content: '';
            background-color: #1e6fff;
            width: 3px;
            height: 24px;
            position: absolute;
            left: -5px;
            top: 0;
            z-index: 9999;
        }
    }

    .questionList {
        margin-left: 45px;
        font-size: 14px;
        font-family: '思源黑体';
        position: relative;
        margin-top: 12px;
        // background-color: pink;

        // 滑块
        .slide {
            // 400+4（其中的4为末尾一个bar的宽度，所以总宽度为404。
            width: 404px;
            height: 8px;
            background-color: #f5f5f5;
            box-sizing: border-box;
            position: absolute;
            right: 30px;
            bottom: 6px;
            display: flex;
            justify-content: space-between;
            @Width: 400px;

            .barStyle() {
                width: 4px;
                height: 11px;
                border-radius: 2px;
                background-color: rgba(204, 204, 204, 1);
                transform: translateY(-3px);
                cursor: pointer;
            }

            .bar {
                .barStyle();
            }

            .num {
                position: absolute;
                top: -15px;
                right: -5px;
                height: 15px;
                width: 15px;
                color: #cccccc;
                font-size: 8px;
                text-align: center;
                display: block;
            }

            .doublebar {
                .barStyle();
                transform: translateY(-7px);
                height: 15px;
            }

            .Gradient {
                width: 0px;
                height: 8px;
                background: linear-gradient(90deg, rgba(194, 225, 254, 1) 0%, #78a5f1 100%);
                position: absolute;
                left: 0;
                z-index: 9;
                pointer-events: none;
                transition: all 0.2s linear;
            }

            @thumbSize: 14px;
            @themeColor: #1e6fff;

            img.thumb {
                position: absolute;
                // z-index: 2;
                bottom: -2px;
                // left: calc(0px - @thumbSize/2); //thumbSize=24px
                height: @thumbSize;
                width: @thumbSize;
                object-fit: cover;
                transform: translateX(-5px);
                // border-radius: 5px;
                transition: all 0.2s linear;
                z-index: 10;
            }

            .edit {
                display: inline-block;
                width: 24px;
                height: 14px;
                position: absolute;
                right: -40px;
                bottom: 0px;
                cursor: pointer;
                font-size: 10px;
                color: rgba(140, 140, 140, 1);
                display: flex;
                text-align: left;
                justify-content: space-between;

                img {
                    width: 16px;
                    height: 16px;
                }
            }

            .editinput {
                width: 24px;
                height: 16px;
                outline: none;
                border: #4791ff 1px solid;
                text-align: center;
                color: rgba(140, 140, 140, 1);
                ;
                position: absolute;
                right: -42px;
                bottom: 0px;
            }
        }

    }

    // 问卷内容完成提交按钮
    .submit {
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 180px;
        height: 40px;
        background-color: rgba(30, 111, 255, 1);
        margin-top: 40px;

        &:hover {
            background-color: #4791ff;
        }

        &:active {
            background-color: #0f52d9;
        }

        // &:focus
        // &:active{
        //     background-color: green;
        // }
        // &.is-active{
        //     background-color: #bfa;
        // }
    }
}


// 对最外层wrapper的微调
div.extrachange {
    width: 1210px;
}



// 完成问卷页面的样式
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
                font-family: '思源黑体';
                font-size: 36px;
                font-weight: 500;
                letter-spacing: 0px;
                line-height: 44px;
                margin-left: -18px;

                &::after {
                    content: '✔';
                    color: white;
                    font-size: 24px;
                    width: 36px;
                    height: 36px;
                    background: radial-gradient(104.2% 104.2%, rgba(30, 111, 255, 1) 0%, rgba(170, 203, 255, 1) 100%);
                    border-radius: 50%;
                    position: absolute;
                    margin-left: 8px;
                    top: 5px;
                    text-align: center;
                    line-height: 36px;
                }
            }

            h3 {
                font-family: '思源黑体';
                font-size: 36px;
                font-weight: 500;
                letter-spacing: 0px;
                line-height: 44px;
                color: rgba(30, 111, 255, 1);
            }

            p {
                font-family: '思源黑体';
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
