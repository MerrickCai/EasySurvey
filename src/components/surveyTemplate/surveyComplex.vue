<template>
    <div class="wrapper">


        <!--问卷介绍 -->
        <div intro v-if="survey.status.begin">
            <div class="titleArea">
                <h2>{{  survey.surveyObj.intro.info_title  }}</h2>
            </div>
            <p class="second-title">问卷介绍：</p>
            <p class="para">{{  survey.surveyObj.intro.info_para  }}</p>
            <div class="btn" @click="survey.status.toOngoing">
                <div>开始问卷</div>
            </div>
        </div>


        <!-- 问卷内容 -->
        <div content v-if="survey.status.ongoing">

            <!-- 进度条 -->
            <div class="shadow"></div>
            <div class="progress" @click="scrollTo($event)">
                <span class="progress-part" v-for="item of survey.surveyObj.questionList" :key="item.questionId"
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
                    <h2>{{  survey.surveyObj.intro.info_title  }}</h2>
                </div>
                <p class="second-title">问卷介绍：</p>
                <p class="para">{{  survey.surveyObj.intro.info_para  }}</p>
            </div>

            <!-- 答题区域 -->
            <main ref="content" @scroll="onScroll">
                <div class="main" v-for="(item, i) of survey.surveyObj.questionList" :key="item.questionId"
                    :style="{ outline: `${item.outlineColor} 1px  solid` }">
                    <template v-if="item.type === 0">
                        <div class="questiontitle" ref="questiontitle">{{  `${i + 1}. ${item.questiontitle}（单选）`  }}</div>
                        <div class="ques" v-for="(elem, index) of item.option" :key="index">
                            <input type="radio" :id="elem" :value="elem" v-model="item.value" />
                            <p><label :for="elem">{{  elem  }}</label></p>
                        </div>
                    </template>
                    <template v-else-if="item.type === 1">
                        <div class="questiontitle" ref="questiontitle">{{  `${i + 1}. ${item.questiontitle}（多选）`  }}</div>
                        <div class="ques" v-for="(elem, index) of item.option" :key="index">
                            <input type="checkbox" :id="elem" :value="elem" v-model="item.value" />
                            <p><label :for="elem">{{  elem  }}</label></p>
                        </div>
                    </template>
                    <template v-else>
                        <div class="questiontitle" ref="questiontitle">{{  `${i + 1}. ${item.questiontitle}（文本）`  }}</div>
                        <div class="ques">
                            <textarea v-model="item.value" placeholder="请输入文本"></textarea>
                        </div>
                    </template>
                </div>
            </main>

            <!-- 问卷提交按钮 -->
            <div class="btn" @click="Finish">
                <div>提交问卷</div>
            </div>

        </div>


        <!-- 问卷完成 -->
        <div finish v-if="survey.status.end">
            <div class="content">
                <h2>您已完成</h2>
                <h3>{{  survey.surveyObj.intro.info_title  }}</h3>
                <p>感谢您的答题，本次问卷已全部结束</p>
            </div>
            <div class="btn">
                <div>完成答题</div>
            </div>
        </div>


    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref, inject } from 'vue'
import axios from "axios"
import { useStore } from "../../PiniaStores/index.js"
const datas = useStore()



// --------------------------- 问卷状态，问卷数据 --------------------
const survey = inject('survey')
// --------------------------- 问卷状态，问卷数据 --------------------

// ---------------------------   进度条 ---------------------------------------
//模板引用
const thumb = ref()
const bluebcg = ref()
const text = ref()
const content = ref()
//点击事件
function scrollTo(e) {
    const scrollMaxDistance = content.value.scrollHeight - content.value.offsetHeight
    content.value.scrollTop = scrollMaxDistance * (e.offsetY / 300);
    text.value.innerHTML = `${Math.floor((e.offsetY / 300) * 100)} %`;
}
//滚动事件
function onScroll() {
    const scrollMaxDistance = content.value.scrollHeight - content.value.offsetHeight
    thumb.value.setAttribute('style', `top: ${300 * (content.value.scrollTop / scrollMaxDistance) - 8}px`);
    text.value.innerHTML = `${Math.ceil((content.value.scrollTop / scrollMaxDistance) * 100)} %`
    bluebcg.value.style.height = `${300 * (content.value.scrollTop / scrollMaxDistance)}px`
}
// ---------------------------   进度条 ---------------------------------------



// ------------------------- 提交问卷前判断完成度 ------------------------
//模板引用
const questiontitle = ref()
//判断函数
function Finish() {
    let flag = true
    const uncomplete = []
    let queId = 0
    bluebcg.value.style.display = 'none'
    survey.surveyObj.questionList.forEach(item => {
        item.progressPartbcg = '#5a9afa'
        if (item.value === 0 || item.value.length === 0 || item.value === '') {
            flag = false
            item.progressPartbcg = 'rgba(255, 71, 71, 1)'
            item.outlineColor = 'rgba(240,0,0,1)'
            uncomplete.push(queId)
        }
        queId++
    })
    let fisrtreturn = uncomplete[0]
    if (uncomplete.length !== 0) {
        content.value.scrollTop = questiontitle.value[fisrtreturn].offsetTop
    }
    if (!flag) {
        return false
    }
    else {
        Submit()
        survey.status.toEnd()
    }
}
// ------------------------- 提交问卷前判断完成度 ------------------------



//-------------------------------- 提交函数---------------------------------------
// 选项数据已经用v-model动态绑定到对应的value了
function Submit() {
    const questionAnswerList = []
    survey.surveyObj.questionList.forEach(item => {
        let questionAnswer = {
            questionId: item.questionId,
            type: item.type,
            text: item.questiontitle,
            optionList: item.value //这里要修改一下
        }
        questionAnswerList.push(questionAnswer)
    })
    axios({
        url: `https://q.denglu1.cn/questions/commit`,
        method: 'post',
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
        headers: { 'token': datas.user.token },
        data: {
            questionnaire_id: 5000,
            totalNumber: 100,
            count: 5,           //问卷类型：混合
            effectiveNumber: 0,
            questionAnswerList
        }
    }).then((response) => {
        ElMessage({
            message: '提交问卷成功',
            type: 'success',
            duration: 5000,
            showClose: true,
            center: true
        })
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
}
//-------------------------------- 提交函数---------------------------------------
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
        width: auto;

        >h2 {
            display: block;
            height: auto;
            width: auto;
            font-size: 36px;
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
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        height: auto;
        width: 70%;
        font-size: 20px;
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

// 问卷内容
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
        height: calc(100% - 120px);
        width: 10px;
        background-color: white;
        z-index: 10;
    }

    >div.progress {
        position: absolute;
        z-index: 1;
        display: flex;
        flex-direction: column;
        height: 300px;
        width: 8px;
        bottom: 50%;
        transform: translateY(50%);
        right: 100px;
        border-radius: 5px;
        background-color: rgba(204, 204, 204, 1);
        cursor: pointer;

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

        >p.second-title {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-end;
            height: auto;
            width: 70%;
            margin: 5px 0;
            font-size: 20px;
            color: rgba(30, 111, 255, 1);
        }

        >p.para {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-start;
            height: auto;
            width: 70%;
            font-size: 20px;
            color: rgba(0, 0, 0, 1);
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

        >div.main {
            display: flex;
            flex-direction: column;
            width: calc(100% - 140px);
            height: auto;
            margin-bottom: 10px;
            padding: 5px;

            >div.questiontitle {
                display: block;
                height: auto;
                width: auto;
                font-size: 16px;
                position: relative;
                padding-left: 10px;
                margin-bottom: 10px;

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
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                height: auto;
                width: 100%;
                padding-left: 10px;

                >p {
                    font-size: 16px;
                    color: rgb(0, 0, 0);
                }

                >input {
                    display: block;
                    width: 16px;
                    height: 16px;
                    margin-right: 10px;
                }

                >textarea {
                    display: block;
                    height: 100px;
                    width: 80%;
                    font-size: 16px;
                    color: rgb(0, 0, 0);
                    padding: 5px;
                    outline: none;
                    resize: none;
                    border: 2px solid rgba(30, 111, 255, 1);
                    border-radius: 10px;
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