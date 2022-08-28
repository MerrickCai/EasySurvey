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
            <div class="btn" @click="survey.status.toOngoing()">
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
                    <div class="bluebcg" ref="bluebcg" :style="{ height: `${bluebcg_height}px` }"></div>
                </div>
                <div class="text" ref="text">0%</div>
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
            <main ref="content" @scroll="onScroll($event)">
                <div class="main" v-for="item of survey.questionList" :key="item.questionId">

                    <div class="questiontitle" ref="questiontitle"> {{ item.questiontitle }}</div>

                    <template v-if="item.type === 0">
                        <div class="ques" v-for="(elem, index) of item.option" :key="index">
                            <input type="radio" :name="item.questionId" :value="elem" />
                            <p>{{ elem }}</p>
                        </div>
                    </template>
                    <template v-else-if="item.type === 1">
                        <div class="ques" v-for="(elem, index) of item.option" :key="index">
                            <input type="checkbox" :name="item.questionId" :value="elem" />
                            <p>{{ elem }}</p>
                        </div>
                    </template>
                    <template v-else>
                        <div class="ques">
                            <textarea placeholder="请输入文本"></textarea>
                        </div>
                    </template>

                </div>
            </main>

            <!-- 问卷提交按钮 -->
            <div class="btn" @click="toFinish()">
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
            questiontitle: '一、我认为我能为团队做出的贡献是：',
            value: 0,
            titleBorder: 0,
            progressPartbcg: '#ccc',
            option: null
        },
        {
            questionId: 2,
            type: 0,
            questiontitle: '二、我认为我能为团队做出的贡献是：',
            value: 0,
            titleBorder: 0,
            progressPartbcg: '#ccc',
            option: ['aaAAAhaha', 'BBB', 'CCC']
        },
        {
            questionId: 3,
            type: 1,
            questiontitle: '三、我认为我能为团队做出的贡献是：',
            value: [],
            titleBorder: 0,
            progressPartbcg: '#ccc',
            option: ['111', '222', '333']
        },
        {
            questionId: 4,
            type: 1,
            questiontitle: '四、我认为我能为团队做出的贡献是：',
            value: [],
            titleBorder: 0,
            progressPartbcg: '#ccc',
            option: ['111', '222', '333']
        },
        {
            questionId: 5,
            type: 1,
            questiontitle: '五、我认为我能为团队做出的贡献是：',
            value: [],
            titleBorder: 0,
            progressPartbcg: '#ccc',
            option: ['111', '222', '333']
        },
        {
            questionId: 6,
            type: 2,
            questiontitle: '六、我认为我能为团队做出的贡献是：',
            value: 0,
            titleBorder: 0,
            progressPartbcg: '#ccc',
            option: null
        },
        {
            questionId: 7,
            type: 0,
            questiontitle: '七、我认为我能为团队做出的贡献是：',
            value: [],
            titleBorder: 0,
            progressPartbcg: '#ccc',
            option: ['www', 'aa', 'www']
        }
    ]
})
// --------------------------- 问卷状态，问卷数据 --------------------



// ---------------------------   进度条 ---------------------------------------
const thumb = ref()
const text = ref()
const content = ref()
const bluebcg = ref()
const bluebcg_height = ref(0)
function scrollTo(e) {
    console.log(e)
    const scrollDistence = ref(0);
    if (scrollDistence.value === 0) {
        //此为滚动距离scrollTop最大值（e.currentTarget.offsetHeight == e.currentTarget.clientHeight）
        scrollDistence.value = content.value.scrollHeight - content.value.offsetHeight;
    }
    // 此页面滚动条为300px
    //转换(e.offsetY是鼠标点击进度条的位置[0,300]，进度条总长300px)
    content.value.scrollTop = (scrollDistence.value) * (e.offsetY / 300) - 8;
    text.value.innerHTML = `${Math.ceil((e.offsetY / 300) * 100)} %`;

}
function onScroll() {
    let temp;
    const scrollDistence = ref(0);
    if (scrollDistence.value === 0) {
        scrollDistence.value = content.value.scrollHeight - content.value.offsetHeight;
    }
    //转换
    thumb.value.setAttribute('style', `top: ${(300) * (content.value.scrollTop / scrollDistence.value) - 8}px`);
    text.value.innerHTML = `${Math.ceil((content.value.scrollTop / scrollDistence.value) * 100)} %`
    temp = thumb.value.style.top.split("");
    temp.pop();
    temp.pop();
    temp = temp.join("") / 1 + 8;
    bluebcg_height.value = temp;
}
const questiontitle = ref()
// ---------------------------   进度条 ---------------------------------------



// ------------------------- 提交问卷前判断完成度然后提交 ------------------------
function toFinish() {
    let flag = true;
    // 记录未完成的问卷id
    const uncomplete = [];
    let queId = 1;
    bluebcg.value.style.display = 'none';      // 进度条滚动的蓝色背景失效
    survey.questionList.forEach(item => {
        item.titleBorder = 0;
        item.progressPartbcg = '#5a9afa';
        if (item.value === 0) {
            flag = false;
            uncomplete.push(queId);
            item.titleBorder = 1;
            item.progressPartbcg = 'red';
        }
        queId++;
    });
    let fisrtreturn = uncomplete[0] - 1;
    if (uncomplete.length) {
        content.value.scrollTop = questiontitle.value[fisrtreturn].offsetTop;
    }
    if (!flag) return
    sumbit();
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
    height: 100%;
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
        right: 80px;
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
                height: 10px;
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
            bottom: -22px;
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