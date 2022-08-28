<template>
    <div class="wrapper">
        <!-- 装饰品 -->
        <div class="decoration1" v-show="survey.status.begin || survey.status.end"></div>
        <div class="decoration2" v-show="survey.status.begin || survey.status.end"></div>
        <div class="decoration3" v-show="survey.status.begin || survey.status.end"></div>
        <div class="decoration4" v-show="survey.status.begin || survey.status.end"></div>
        <div class="decoration5"></div>
        <img dog-ear src="/tangible.png" />
        <!-- 装饰品 -->



        <!--问卷介绍 -->
        <div intro v-if="survey.status.begin">
            <div class="titleArea">
                <h2>{{ survey.intro.info_title }}</h2>
            </div>
            <p class="second-title">问卷介绍：</p>
            <p class="para">{{ survey.intro.info_para }}</p>
            <div class="btn" @click="survey.status.toOngoing">
                <div>开始问卷</div>
            </div>
        </div>



        <!-- 问卷内容 -->
        <div content v-if="survey.status.ongoing">

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
                    <h2>{{ survey.intro.info_title }}</h2>
                </div>
                <p class="second-title">问卷介绍：</p>
                <p class="para">{{ survey.intro.info_para }}</p>
            </div>

            <!-- 答题区域 -->
            <main ref="content" @scroll="onScroll">
                <div class="main" v-for="(item, i) of survey.questionList" :key="item.questionId">

                    <template v-if="item.type === 0">
                        <div class="questiontitle" ref="questiontitle">{{ `${i + 1}. ${item.questiontitle}（单选）` }}</div>
                        <div class="ques" v-for="(elem, index) of item.option" :key="index">
                            <input type="radio" :id="elem" :value="elem" v-model="item.value" />
                            <p><label :for="elem">{{ elem }}</label></p>
                        </div>
                    </template>

                    <template v-else-if="item.type === 1">
                        <div class="questiontitle" ref="questiontitle">{{ `${i + 1}. ${item.questiontitle}（多选）` }}</div>
                        <div class="ques" v-for="(elem, index) of item.option" :key="index">
                            <input type="checkbox" :id="elem" :value="elem" v-model="item.value" />
                            <p><label :for="elem">{{ elem }}</label></p>
                        </div>
                    </template>

                    <template v-else>
                        <div class="questiontitle" ref="questiontitle">{{ `${i + 1}. ${item.questiontitle}（文本）` }}</div>
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
                <h3>{{ survey.intro.info_title }}</h3>
                <p>感谢您的答题，本次问卷已全部结束</p>
            </div>
            <div class="btn">
                <div>完成答题</div>
            </div>
        </div>



    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import axios from "axios"
import { useStore } from "../../PiniaStores/index.js"
const datas = useStore()

// --------------------------- 问卷状态，问卷数据 --------------------
const survey = reactive({
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
    intro: {
        info_title: '混合型问卷',
        info_para: '单选 多选 文本'
    },
    questionList: [ //type：单选0 多选1 文本2
        {
            questionId: 1,
            type: 2,
            questiontitle: '我认为我能为团队做出的贡献是：',
            value: '',
            progressPartbcg: '#ccc',
        },
        {
            questionId: 2,
            type: 0,
            questiontitle: '我认为我能为团队做出的贡献是：',
            value: 0,
            progressPartbcg: '#ccc',
            option: ['aaAAAhaha', 'BBB', 'CCC']
        },
        {
            questionId: 3,
            type: 1,
            questiontitle: '我认为我能为团队做出的贡献是：',
            value: [],
            progressPartbcg: '#ccc',
            option: ['111', '222', '333']
        },
        {
            questionId: 4,
            type: 0,
            questiontitle: '我认为我能为团队做出的贡献是：',
            value: 0,
            progressPartbcg: '#ccc',
            option: ['aaAAAhaha', 'BBB', 'CCC']
        },
        {
            questionId: 5,
            type: 2,
            questiontitle: '我认为我能为团队做出的贡献是：',
            value: '',
            progressPartbcg: '#ccc',
        }
    ]
})
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



// ------------------------- 提交问卷前判断完成度然后提交 ------------------------
//模板引用
const questiontitle = ref()
//判断函数
function Finish() {
    let flag = true
    const uncomplete = []
    let queId = 0
    bluebcg.value.style.display = 'none'
    survey.questionList.forEach(item => {
        item.progressPartbcg = '#5a9afa'
        if (item.value === 0 || item.value.length === 0 || item.value === '') {
            flag = false
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
//提交函数(选项数据已经用v-model动态绑定到对应的value了)
function Submit() {
    const questionAnswerList = []
    survey.questionList.forEach(item => {
        let questionAnswer = {
            questionId: item.questionId,
            type: item.type,
            text: item.questiontitle,
            optionList: item.value
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
            count: 5,           //问卷类型：混合（单选，多选，文本）
            effectiveNumber: 0,
            questionAnswerList
        }
    }).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error)
    })
}
// ------------------------- 提交问卷前判断完成度然后提交 ------------------------
</script>


<style scoped lang='less'>
div.wrapper {
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
        overflow: auto;

        >div.main {
            display: flex;
            flex-direction: column;
            width: calc(100% - 140px);
            height: auto;
            margin-bottom: 10px;

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