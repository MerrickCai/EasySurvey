<template>
    <div class="wrapper">

        <!--问卷介绍 -->
        <div intro v-if="Survey.status.begin">
            <div class="titleArea">
                <h2>{{ survey.intro.info_title }}</h2>
            </div>
            <p class="second-title">问卷介绍：</p>
            <p class="para">{{ survey.intro.info_para }}</p>
            <div class="btn" @click="Survey.status.toOngoing()">
                <div>开始问卷</div>
            </div>
        </div>



        <!-- 问卷填写 -->
        <div content v-if="Survey.status.ongoing">


            <!-- 进度条 -->
            <div class="shadow"></div>
            <div class="progress" @click="scrollTo($event)">
                <span class="progress-part" v-for="item of survey.questionList" :key="item.questionId"
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

                <!-- 第一层循环 item, i -->
                <div class="main" v-for="(item, i) of survey.questionList" :key="item.id"
                    :style="{ height: `${37.5 * item.question.length}px` }" ref="questiontitle">
                    <div class="questiontitle" :style="{ border: `${item.titleBorder}px solid red` }">
                        {{ item.questiontitle }}
                        <p class="scoretips">可支配分数
                            <span class="score">{{ item.score }}</span>
                        </p>
                    </div>
                    <!-- 第二层循环 elem,index -->
                    <div class="questionList" v-for="(elem, index) of item.question" :key="index">
                        {{ elem.detail }}
                        <div class="slide" :style="{ backgroundColor: `${item.bcg}` }">
                            <!--400为slide的总宽度，根据分数总数来定每次滑块滑多少-->
                            <div class="Gradient"
                                :style="{ width: `${(elem.value) * (400 / (barArr[i].length - 1))}px` }">
                            </div>
                            <!-- 第三层循环 b,j -->
                            <div v-for="(b, j) of barArr[i]" :key="i" :class="j % 2 === 0 ? 'doublebar' : 'bar'"
                                @click="distributeScore(elem, item, j)">
                                <span class="num" v-if="!(j % 2)">{{ j }}</span>
                            </div>
                            <img class="thumb" :style="{ left: `${(elem.value) * (400 / (barArr[i].length - 1))}px` }"
                                v-lazy="elem.value === 0 ? item.silderSrc : '/assets/blue.png'">
                            <span class="edit" v-show="!elem.isEdit" @click="editHandle(elem, index)">{{ elem.value
                            }}<img v-lazy="'/assets/icon-edit.png'"></span>
                            <input class="editinput" type="text" v-show="elem.isEdit"
                                @blur="editHandle2(elem, item, $event)" @keydown.enter="editHandle2(elem, item, $event)"
                                :value="elem.value" ref="myRef">
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
                <h3>{{ survey.intro.info_title }}</h3>
                <p>感谢您的答题，本次问卷已全部结束</p>
            </div>
            <div class="btn" @click="router.push('/')">
                <div>完成答题</div>
            </div>
        </div>



    </div>
</template>

<script setup>
import { ref, reactive, inject, nextTick } from 'vue'
import axios from "axios"
import { useStore } from "../../Stores/pinia.js"
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
    obj.silderSrc = '/assets/blue.png';
    obj.score = item.dominate;
    obj.staticScore = obj.score;
    obj.secscore = surveyObj.value.optionMap[i][0].dominate;
    start++;
    survey.questionList.push(obj)
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
async function sumbit() {
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
        url: `https://q.denglu1.cn/api/questions/commit`,
        method: 'post',
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            token: await datas.getToken()
        },
        data: {
            "questionnaire_id": survey.id,
            "totalNumber": survey.totalNumber,
            "count": survey.count,
            "effectiveNumber": survey.effectiveNumber,
            questionAnswerList,
            "scoreList": scoreList
        }
    }).then((response) => {
        console.log('提交完成返回的response', response);
        if (response.data.code === 200) {
            if (response.data.msg.includes('提交成功')) {
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
const questiontitle = ref()
//判断函数
function Finish() {
    let flag = true
    const uncomplete = []
    let queId = 0
    bluebcg.value.style.display = 'none'
    survey.questionList.forEach(item => {
        item.titleBorder = 0
        item.progressPartbcg = "#5a9afa"
        if (item.score !== 0) {
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
        content.value.scrollTop = questiontitle.value[fisrtreturn].offsetTop - 2
    }
    if (!flag) {
        return false
    }
    else {
        sumbit()
    }
}
// ------------------------- 提交问卷前判断完成度 ------------------------




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
        item.silderSrc = '/assets/disable.png';
    }
    if (item.score > 0) {
        item.bcg = '#f5f5f5';
        item.silderSrc = '/assets/blue.png';
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




//----------------- 用来给上面的模板计算每次thumb应该移动多少的---------------------
const barArr = new Array(survey.questionList.length).fill(0).map(
    (item, index) => new Array(survey.questionList[index].secscore + 1)
)
//----------------- 用来给上面的模板计算每次thumb应该移动多少的---------------------
</script>


<style scoped lang='less'>
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

            @media (max-width:@breakpoint) {
                font-size: 20px;
            }

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

        @media (max-width:@breakpoint) {
            width: 80%;
            font-size: 18px;
        }
    }

    >p.para {
        display: block;
        height: auto;
        width: 70%;
        font-size: 18px;
        color: rgba(0, 0, 0, 1);

        @media (max-width:@breakpoint) {
            width: 80%;
            font-size: 16px;
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

            @media (max-width:@breakpoint) {
                width: 200px;
                height: 50px;
                font-size: 18px;
            }
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

        @media (max-width:@breakpoint) {
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

        @media (max-width:@breakpoint) {
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

        @media (max-width:@breakpoint) {
            width: 90%;
            padding: 0;
            margin: 20px auto;
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

                @media (max-width:@breakpoint) {
                    font-size: 20px;
                }

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

        @media (max-width:@breakpoint) {
            padding: 0 10px;
        }

        >div.main {
            display: flex;
            flex-direction: column;
            width: calc(100% - 140px);
            height: auto;
            margin-bottom: 10px;
            padding: 5px;

            @media (max-width:@breakpoint) {
                width: 100%;
            }

            >div.questiontitle {
                display: block;
                height: auto;
                width: auto;
                font-size: 16px;
                position: relative;
                padding-left: 10px;

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

            .questionList {
                font-size: 14px;
                position: relative;
                margin-top: 10px;

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

            @media (max-width:@breakpoint) {
                width: 160px;
                height: 40px;
            }
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

            @media (max-width:@breakpoint) {
                font-size: 26px;
            }

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

            @media (max-width:@breakpoint) {
                font-size: 26px;
            }
        }

        >p {
            display: block;
            height: auto;
            width: auto;
            font-size: 20px;
            color: rgba(0, 0, 0, 1);

            @media (max-width:@breakpoint) {
                font-size: 18px;
            }
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

            @media (max-width:@breakpoint) {
                width: 200px;
                height: 50px;
            }
        }
    }
}
</style>
