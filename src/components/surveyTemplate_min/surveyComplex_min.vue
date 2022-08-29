<template>
    <div class="wrapper">
        <!-- 问卷内容 -->
        <div content >
            <!-- 进度条 -->
            <div class="shadow"></div>
            <div class="progress" @click="scrollTo($event)">
                <div class="outer-thumb" ref="thumb">
                    <div class="bluebcg" ref="bluebcg"></div>
                </div>
                <div class="text" ref="text">0 %</div>
            </div>
            <!-- 答题区域 -->
            <main ref="content" @scroll="onScroll">
                <div class="main" v-for="(item, i) of survey.questionList" :key="item.questionId"
                    :style="{ outline: `${item.outlineColor} 1px  solid` }">

                    <template v-if="item.type === 0">
                        <div class="questiontitle" ref="questiontitle">{{  `${i + 1}. ${item.questiontitle}（单选）`  }}</div>
                        <div class="ques" v-for="(elem, index) of item.option" :key="index">
                            <input type="radio" :id="elem" :value="elem"  v-model="item.value" />
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
       </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import axios from "axios"


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
        padding-top:5px;
        overflow: auto;

        >div.main {
            display: flex;
            flex-direction: column;
            width: calc(100% - 140px);
            height: auto;
            margin-bottom: 10px;
            padding:5px;

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