<template>
    <div class="wrapper">
        <!--装饰品-->
        <div class="decoration1" v-show="survey.status.begin || survey.status.end"></div>
        <div class="decoration2" v-show="survey.status.begin || survey.status.end"></div>
        <div class="decoration3" v-show="survey.status.begin || survey.status.end"></div>
        <div class="decoration4" v-show="survey.status.begin || survey.status.end"></div>
        <div class="decoration5"></div>
        <img dog-ear src="/tangible.png" />
        <!--装饰品-->


        <!-- 问卷介绍部分 -->
        <div intro v-if="survey.status.begin">
            <h2 class="title">{{ survey.intro.info_title }}</h2>
            <p class="second-title">问卷介绍：</p>
            <p class="para">{{ survey.intro.info_para }}</p>
            <el-button type="primary" class="btn" @click="survey.status.toOngoing()">开始问卷</el-button>
        </div>

        <!-- 问卷内容部分 -->
        <div class="wrapper extrachange" v-if="survey.status.ongoing">
            <div class="topbox">
                <h2 class="top_title">{{ survey.intro.info_title }}</h2>
                <h5 claecss="top_stitle">问卷介绍：</h5>
                <div class="para_wrapper">
                    <p class="top_para">{{ survey.intro.info_para }}</p>
                </div>
            </div>

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

            <div class="content" ref="content" @scroll="onScroll($event)">
                <!-- 题目 -->
                <!-- 第一层循环 item, i -->
                <div class="main" v-for="(item, i) of survey.questionList" :key="item.id"
                    :style="item.type === 2 ? { height: `${80}px` } : { height: `${37.5 * item.option.length}px` }">
                    <div class="questiontitle" ref="questiontitle"
                        :style="{ border: `${item.titleBorder}px solid red` }">
                        {{ item.questiontitle }}
                    </div>
                    <!-- 第二层循环 elem,index -->
                    <div v-if="item.type === 0">
                        <div class="ques" v-for="(elem, index) of item.option" :key="index">
                            <input type="radio" class="input" :name="item.questionId" :value="elem"
                                @click="seleted(i, index, $event)">
                            <p>{{ elem }}</p>
                        </div>
                    </div>

                    <div v-if="item.type === 1">
                        <div class="ques" v-for="(elem, index) of item.option" :key="index">
                            <input class="input" type="checkbox" :name="item.id" :value="elem"
                                @click="seleted(item, i, $event)" ref="input">
                            <p>{{ elem }}</p>
                        </div>
                    </div>

                    <div v-if="item.type === 2">
                        <textarea clos="30" rows="4" class="ques" placeholder="请输入"
                            @blur="getValue(item, $event)"></textarea>
                    </div>

                </div>
                <div class="submit" @click="toFinish()">提交问卷</div>
            </div>
        </div>


        <!-- 问卷完成部分 -->
        <div class="finish-wrapper" v-if="survey.status.end">
            <div class="innerbox">
                <div class="finish-title">
                    <h2>您已完成</h2>
                    <h3>{{ survey.intro.info_title }}</h3>
                    <p>感谢您的答题，本次问卷已全部结束</p>
                </div>
                <el-button type="primary" class="finish-submit">完成答题</el-button>
            </div>
        </div>


    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'



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
    questionList: [
        {
            // 文本类型
            questionId: 1,
            type: 2,
            questiontitle: '一、我认为我能为团队做出的贡献是：',
            value: 0,
            titleBorder: 0,
            progressPartbcg: '#ccc',
        },
        {
            // 单选类型
            questionId: 2,
            type: 0,
            questiontitle: '二、我认为我能为团队做出的贡献是：',
            value: 0,
            titleBorder: 0,
            progressPartbcg: '#ccc',
            option: ['aaAAAhaha', 'BBB', 'CCC']
        },
        {
            // 文本类型
            questionId: 1,
            type: 2,
            questiontitle: '一、我认为我能为团队做出的贡献是：',
            value: 0,
            titleBorder: 0,
            progressPartbcg: '#ccc',
        },
        {
            // 多选类型
            questionId: 3,
            type: 1,
            questiontitle: '三、我认为我能为团队做出的贡献是：',
            value: [],
            titleBorder: 0,
            progressPartbcg: '#ccc',
            option: ['111', '222', '333']
        },
        {
            // 多选类型
            questionId: 3,
            type: 1,
            questiontitle: '三、我认为我能为团队做出的贡献是：',
            value: [],
            titleBorder: 0,
            progressPartbcg: '#ccc',
            option: ['111', '222', '333']
        },
        {
            // 多选类型
            questionId: 3,
            type: 1,
            questiontitle: '三、我认为我能为团队做出的贡献是：',
            value: [],
            titleBorder: 0,
            progressPartbcg: '#ccc',
            option: ['111', '222', '333']
        },
        {
            // 文本类型
            questionId: 1,
            type: 2,
            questiontitle: '一、我认为我能为团队做出的贡献是：',
            value: 0,
            titleBorder: 0,
            progressPartbcg: '#ccc',
        },
        {
            // 多选类型
            questionId: 4,
            type: 0,
            questiontitle: '四、我认为我能为团队做出的贡献是：',
            value: [],
            titleBorder: 0,
            progressPartbcg: '#ccc',
            option: ['www', 'aa', 'www']
        }
    ]
})



// --- 滚动条部分的变量和方法 ---
const thumb = ref(null);
const text = ref(null);
const content = ref(null);
// 滚动条的蓝色背景的dom
const bluebcg = ref(null);
let bluebcg_height = ref(0);
// 中转变量
let temp;
// 滚动条
const scrollDistence = ref(0);
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
    text.value.innerHTML = `${Math.ceil((content.value.scrollTop / scrollDistence.value) * 100)} %`
    temp = thumb.value.style.top.split("");
    temp.pop();
    temp.pop();
    temp = temp.join("") / 1 + 8;
    bluebcg_height.value = temp;
}



// ---提交按钮之后相关的变量和方法---
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



@a: 1px;

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

.public_wrapper() {
    width: 1190*@a;
    height: 810*@a;
    background-color: #fff;
    position: relative;
    left: -0*@a;
    right: 0;
    top: 0;
    // top:-15*@a;  
    margin: 0 auto;
    box-sizing: border-box;
    // background-color: #bfa;
    padding: 0;
    box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.1);
    z-index: 10;
}



// 介绍页面部分
div[intro] {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-start;

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
        font-family: '思源黑体';
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


}

// 答题内容部分
// 头部的文字解释
.topbox {
    margin: 40px 0 30px 40px;
    display: flex;
    flex-direction: column;

    .top_title {
        .public_title();
        width: 625px;
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



// 问卷题目内容部分
.content {
    width: 100%;
    height: auto;
    padding-left: 30px;
    overflow: auto;
    flex: 1;

    // background-color: black;
    .main {
        background-color: white;
        width: 1065px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 25px;
        // background-color: pink;

        .ques {
            display: flex;
            height: 50%;
            transform: translateY(-30px) translateX(5px);
            // background-color: #bfa;

        }

        textarea.ques {
            transform: translateY(15px);
        }

        .input {
            display: block;
            width: 16px;
            height: 16px;
            margin-right: 5px;
        }
    }

    .questiontitle {
        font-size: 16px;
        font-family: '思源黑体';
        display: flex;
        width: 740px;
        justify-content: space-between;
        position: relative;
        left: 5px;

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
        // 滑块      
    }

    // 问卷内容完成提交按钮
    .submit {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        width: 240px;
        height: 60px;
        margin: 20px auto;
        background-color: rgba(30, 111, 255, 1);
        cursor: pointer;
        border-radius: 10px;
        font-size: 20px;
        color: rgb(255, 255, 255);

        &:hover {
            background-color: #4791ff;
        }

        &:active {
            background-color: #0f52d9;
        }
    }
}




.finish-wrapper {
    width: 100%;
    height: 100%;

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


//  遮挡原来的
.zhedang {
    position: absolute;
    right: 2px;
    background-color: white;
    // background-color: pink;
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
    bottom: 165px;
    right: 155px;
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
</style>