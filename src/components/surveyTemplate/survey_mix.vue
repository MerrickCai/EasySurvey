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
                    <h2>{{ survey.intro.info_title }}</h2>
                </div>
            </div>

            <!-- 答题区域 -->
            <main ref="content" @scroll="onScroll">

                <div class="main" v-for="(item, i) of survey.questionList" :key="item.questionId"
                    :style="{ outline: `${item.outlineColor} 1px  solid` }" ref="questionBlock">
                    <template v-if="item.type === 0">
                        <div class="questiontitle">{{ `${i + 1}. ${item.questiontitle}（单选）` }}</div>
                        <div class="ques" v-for="(elem, index) of item.option" :key="index">
                            <input type="radio" :id="elem.id" :value="elem.detail" v-model="item.value" />
                            <p><label :for="elem.id">{{ elem.detail }}</label></p>
                        </div>
                    </template>
                    <template v-else-if="item.type === 1">
                        <div class="questiontitle">{{ `${i + 1}. ${item.questiontitle}（多选）` }}</div>
                        <div class="ques" v-for="(elem, index) of item.option" :key="index">
                            <input type="checkbox" :id="elem.id" :value="elem.detail" v-model="item.value" />
                            <p><label :for="elem.id">{{ elem.detail }}</label></p>
                        </div>
                    </template>
                    <template v-else>
                        <div class="questiontitle">{{ `${i + 1}. ${item.questiontitle}（文本）` }}</div>
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
import { ref, reactive, inject } from 'vue'
import axios from "axios"
import { useStore } from "../../Stores/pinia.js"
import { useRouter } from "vue-router"
const router = useRouter()
const datas = useStore()



// --------------------------- 获取父组件传入的问卷状态和数据 --------------------
const Survey = inject('Survey')
console.log('父组件网络请求的数据', Survey.surveyObj)
// --------------------------- 获取父组件传入的问卷状态和数据 --------------------




// 封装一个survey---------------用以在模板和存放提交时候的用户数据------------------
const survey = reactive({});
// survey的介绍和提交问卷用的信息
survey.intro = {};
survey.intro.info_title = Survey.surveyObj.questionnaire.title;
survey.intro.info_para = Survey.surveyObj.questionnaire.message;
survey.effectiveNumber = Survey.surveyObj.questionnaire.effectiveNumber;
survey.totalNumber = Survey.surveyObj.questionnaire.totalNumber;
survey.count = Survey.surveyObj.questionnaire.count;
survey.id = Survey.surveyObj.questionnaire.id;
survey.questionList = [];
for (let i in Survey.surveyObj.questionInfoMap) {
    let obj = {};
    obj.questionId = i;
    obj.type = Survey.surveyObj.questionInfoMap[i].type;
    obj.questiontitle = Survey.surveyObj.questionInfoMap[i].info;
    switch (obj.type) {
        case 0: obj.value = 0; break;
        case 1: obj.value = []; break;
        case 2: obj.value = ""; break;
    }
    obj.progressPartbcg = '#ccc'; //灰
    obj.outlineColor = 'rgba(255,255,255,0)'; //白透明
    if (obj.type === 2) {
        survey.questionList.push(obj);
        continue;
    }
    obj.option = [];
    for (let j in Survey.surveyObj.optionMap[i]) {
        let obj2 = {};
        obj2.id = Survey.surveyObj.optionMap[i][j].id;
        obj2.detail = Survey.surveyObj.optionMap[i][j].detail;
        obj.option.push(obj2);
    }
    survey.questionList.push(obj);
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



// ------------------------- 提交问卷前判断完成度 ------------------------
//模板引用
const questionBlock = ref()
//判断函数
function Finish() {
    let flag = true
    const uncomplete = []
    let queId = 0
    bluebcg.value.style.display = 'none'
    survey.questionList.forEach(item => {
        item.progressPartbcg = '#5a9afa' //蓝色
        item.outlineColor = 'rgba(255,255,255,0)' //白透明
        if (item.value === 0 || item.value.length === 0 || item.value === '') {
            flag = false
            item.progressPartbcg = 'rgba(255, 71, 71, 1)' //红色
            item.outlineColor = 'rgba(240,0,0,1)' //红色
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
        content.value.scrollTop = questionBlock.value[fisrtreturn].offsetTop - 2
    }
    if (!flag) {
        return false
    }
    else {
        Submit()
    }
}
// ------------------------- 提交问卷前判断完成度 ------------------------



//-------------------------------- 提交函数---------------------------------------
async function Submit() {
    const questionAnswerList = [];
    survey.questionList.forEach(item => {
        let questionAnswer = {
            questionId: item.questionId,
            type: item.type,
        };
        if (item.type === 2) {//文本

            questionAnswer.text = item.value

        } else if (item.type === 0) { //单选

            let detail = item.value
            let id
            for (let i = 0; i < item.option.length; i++) {
                if (item.option[i].detail === detail) {
                    id = item.option[i].id
                    break
                }
            }
            questionAnswer.optionList = [{ detail, id }]

        } else { //多选 item.type===1

            questionAnswer.optionList = []
            item.value.forEach(e => {
                let id
                for (let i = 0; i < item.option.length; i++) {
                    if (item.option[i].detail === e) {
                        id = item.option[i].id
                        break
                    }
                }
                questionAnswer.optionList.push({
                    detail: e,
                    id
                })
            })

        }
        questionAnswerList.push(questionAnswer)
    })

    console.log('用于提交的questionAnswerList', questionAnswerList)
    axios({
        url: `https://q.denglu1.cn/api/questions/commit`,
        method: 'post',
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            token: await datas.getToken()
        },
        data: {
            questionnaire_id: survey.id,
            totalNumber: survey.totalNumber,
            count: survey.count,           //问卷类型：混合（单选，多选，文本）
            effectiveNumber: survey.effectiveNumber,
            questionAnswerList
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
            padding: 0;
        }

        >div.main {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
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
                width: 100%;
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
                justify-content: center;
                align-items: center;
                height: auto;
                width: 100%;

                >input {
                    display: block;
                    width: 16px;
                    height: 16px;
                    margin: 0 10px;
                }

                >p {
                    flex:1;
                    display: block;
                    height: auto;
                    width: auto;
                    font-size: 16px;
                    color: rgb(0, 0, 0);
                }

                >textarea {
                    display: block;
                    height: 100px;
                    width: 70%;
                    font-size: 16px;
                    color: rgb(0, 0, 0);
                    padding: 5px;
                    outline: none;
                    resize: none;
                    border: 2px solid rgba(30, 111, 255, 1);
                    border-radius: 10px;
                    @media (max-width:@breakpoint){
                        width: 100%;
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