<template>
    <div wrapper>
        <!-- 介绍页 -->
        <div class="wrapper" v-if="status.begin">
            <h2 class="title">{{ survey.intro.info_title }}</h2>
            <p class="second-title">问卷介绍：</p>
            <p class="para">{{ survey.intro.info_para }}</p>
            <el-button type="primary" class="btn" @click="toContent()">开始问卷</el-button>
        </div>

        <!-- 问卷内容部分 -->
        <div class="wrapper extrachange" v-if="status.ongoing">
            <div class="topbox">
                <h2 class="top_title">{{ survey.intro.info_title }}</h2>
                <h5 class="top_sectitle">问卷介绍：</h5>
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
                    :style="{ height: `${37.5 * item.option.length}px` }">
                    <div class="questiontitle" ref="questiontitle"
                        :style="{ border: `${item.titleBorder}px solid red` }">
                        {{ item.questiontitle }}
                    </div>
                    <!-- 第二层循环 elem,index -->
                    <div class="ques" v-for="(elem, index) of item.option" :key="index">
                        <input class="input" type="checkbox" :name="item.id" :value="elem"
                            @click="seleted(item, i, $event)" ref="input">
                        <p>{{ elem }}</p>
                    </div>
                </div>
                <el-button type="primary" class="submit" @click=" toFinish();">提交问卷</el-button>
            </div>
        </div>


        <!-- 问卷完成部分 -->
        <div class="finish-wrapper" v-if="status.end">
            <div class="innerbox">
                <div class="finish-title">
                    <h2>{{ survey.end.finish }}</h2>
                    <h3>{{ survey.intro.info_title }}</h3>
                    <p>{{ survey.end.para }}</p>
                </div>
                <el-button type="primary" class="finish-submit">{{ survey.end.button }}</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject } from 'vue'
const status = inject('status')
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from '../../PiniaStores/index.js'
const datas = useStore();

const survey = computed(() => {
    return datas.survey.survey4[0];
});

// -----跳转：介绍页==>答题页--------
function toContent() { 
    status.toOngoing();
}


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



// 存储选中的多选按钮的value方法 
const input = ref(null)
function seleted(item, i, e) {
    // 思路是获取每个题目下的input框的dom的数据，然后forEach，如果seleted属性为true就push就item.value保存下来，这个item.value保存的就是用户选了那些。
    // 这里的难点是如果获取每个题目下的全部input框的dom组成的数组
    // console.log(input.value);  这里获取了整个页面的input的dom数组，所以接下来要找出所对应题目的input的dom
    let start = 0;
    for (let j = 0; j < i; j++) {
        start += item.option.length;
    }
    // start变量是用来找到起点的
    // console.log(start,start + item.option.length);
    //这个数组保存的就是目前点击的checkbox对应题目的全部input的dom
    const Oneques_input = input.value.slice(start, start + item.option.length);

    survey.value.questionList[i].value = [];
    Oneques_input.forEach(elem => {
        // input的dom的checked属性保存了是否被选中 
        // console.log(elem.checked);
        if (elem.checked) {
            survey.value.questionList[i].value.push(elem.value);
        }
    })
    console.log(survey.value.questionList[i].value);

}


// ---提交按钮之后相关的变量和方法---
// 获取全部questiontitle
const questiontitle = ref(null);
// 进度条片段的高度
const progressPartHeight = 300 / (survey.value.questionList.length);

// 提交按钮  跳转：答题页==>完成页
function toFinish() {

    let flag = true;
    // 记录未完成的问卷id
    const uncomplete = [];
    // 滚动的蓝色背景失效
    bluebcg.value.style.display = 'none';
    survey.value.questionList.forEach(item => {
        item.titleBorder = 0;
        item.progressPartbcg = '#5a9afa';
        if (item.value.length === 0) {
            flag = false;
            uncomplete.push(item.id);
            item.titleBorder = 1;
            item.progressPartbcg = 'red';
        }
    });
    // console.log(uncomplete); 
    // console.log(questiontitle.value[0].offsetTop); 保存对应未完成题目距离顶部的距离

    let fisrtreturn = uncomplete[0] - 1;
    if (uncomplete.length) {
        content.value.scrollTop = questiontitle.value[fisrtreturn].offsetTop;
    }
    //    console.log(progressPartHeight);

    if (!flag) return
    status.toEnd();
}

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
    font-family: '思源黑体';
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
    position: absolute;
    left: 40px;
    top: 40px;
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
        margin-bottom: 20px;

        .ques {
            display: flex;
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
    }
}




// 对最外层wrapper的微调
div.extrachange {
    width: 1210px;
    z-index: 10;
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
</style>